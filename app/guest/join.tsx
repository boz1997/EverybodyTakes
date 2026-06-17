import { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator,
  Modal, StatusBar, Dimensions, FlatList, Linking,
  NativeScrollEvent, NativeSyntheticEvent,
} from 'react-native';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import * as MediaLibrary from 'expo-media-library/legacy';
import { useVideoPlayer, VideoView } from 'expo-video';
import { format } from 'date-fns';
import { EventService, Event, Photo, LimitError } from '@features/events/services/eventService';
import { useEventPhotos } from '@features/gallery/hooks/useEventPhotos';
import { savePhotosToLibrary, savePhotoToLibrary } from '@features/gallery/downloadPhotos';
import { createEventZip } from '@features/events/services/exportService';
import { AuthService } from '@features/auth/services/authService';
import { useAuthStore } from '@store/authStore';
import { useEventStore, EventType } from '@store/eventStore';
import { addJoinedEvent, removeJoinedEvent, getJoinedEvents, getSavedNickname, saveNickname } from '@store/guestEvents';
import { scheduleLocalAt, registerPushTokenForUser } from '@shared/notifications';
import { logError } from '@shared/errorLog';
import { PrimaryButton } from '@shared/components/PrimaryButton';
import { InputField } from '@shared/components/InputField';
import { Icon, EVENT_TYPE_ICON } from '@shared/components/Icon';
import { Skeleton } from '@shared/components/Skeleton';
import { colors, typography, spacing, radius, fonts, gradients } from '@constants/theme';

const { width } = Dimensions.get('window');
const GAP = spacing.xs;
// 2-column album grid — portrait cells for a real photo-album feel.
const CELL_RATIO = 13 / 9;   // height / width (tweak for taller/shorter cells)
const PHOTO_W = (width - spacing.lg * 2 - GAP) / 2;
const PHOTO_H = Math.round(PHOTO_W * CELL_RATIO);

// next_day → start of the day after the event (surprise reveal).
function revealAtMs(e: Event): number {
  if (e.revealTiming !== 'next_day') return 0;
  const base = e.date ? new Date(e.date) : new Date();
  base.setHours(0, 0, 0, 0);
  base.setDate(base.getDate() + 1);
  return base.getTime();
}
const isRevealed = (e: Event) => e.revealTiming !== 'next_day' || Date.now() >= revealAtMs(e);

// Reminder fires at noon the day before the event date.
function reminderAtMs(e: Event): number {
  if (!e.date) return 0;
  const d = new Date(e.date);
  d.setDate(d.getDate() - 1);
  d.setHours(12, 0, 0, 0);
  return d.getTime();
}

// Day-of nudge fires at 10:00 on the event date itself.
function reminderTodayAtMs(e: Event): number {
  if (!e.date) return 0;
  const d = new Date(e.date);
  d.setHours(10, 0, 0, 0);
  return d.getTime();
}

export default function EventHubScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { code } = useLocalSearchParams<{ code: string }>();
  const { user, setUser } = useAuthStore();
  const { setGuestEventId, setShotsRemaining, shotsRemaining } = useEventStore();
  const [joined, setJoined] = useState(false);

  const [event, setEvent] = useState<Event | null>(null);
  const { photos: allPhotos, loaded: photosLoaded, hasMore, loadMore } = useEventPhotos(event?.id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [nickname, setNicknameState] = useState('');
  const [uid, setUid] = useState<string | null>(user?.uid ?? null);
  const [filter, setFilter] = useState<'all' | 'mine'>('all');
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [selecting, setSelecting] = useState(false);
  const [selSet, setSelSet] = useState<Set<string>>(new Set());
  const [dlProgress, setDlProgress] = useState<{ done: number; total: number } | null>(null);
  const [zipping, setZipping] = useState(false);
  const flatRef = useRef<FlatList<Photo>>(null);

  const handleZip = async () => {
    if (!event || zipping) return;
    try {
      setZipping(true);
      const { url } = await createEventZip(event.id);
      await Linking.openURL(url);
    } catch (e) {
      logError('guest_zip', e);
      Alert.alert(t('common.error'), t('host.zipFailed'));
    } finally {
      setZipping(false);
    }
  };

  const toggleSel = (id: string) => setSelSet((prev) => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const exitSelect = () => { setSelecting(false); setSelSet(new Set()); };

  // Land → auto-join (anonymous) → load shots. Photos stream via useEventPhotos.
  useEffect(() => {
    if (!code) return;
    (async () => {
      try {
        // Sign in FIRST: every Firestore read requires auth, and guests reach
        // this screen without an account (the welcome "Guest" tap doesn't sign
        // in). Reading the event before this threw permission-denied for fresh
        // installs — the "unexpected error" guests hit when joining.
        let u = user;
        if (!u) { u = await AuthService.signInAnonymous(); setUser(u); }
        setUid(u.uid);

        const ev = await EventService.getByShortCode(code);
        if (!ev) {
          // Event was deleted — drop it from "My events" so it stops listing.
          const joined = await getJoinedEvents();
          const stale = joined.find((e) => e.code === code);
          if (stale) await removeJoinedEvent(stale.id);
          setError(t('errors.eventNotFound'));
          return;
        }
        setEvent(ev);

        const saved = await getSavedNickname();
        setNicknameState(saved);

        if (ev.isActive) {
          try {
            const shots = await EventService.joinEvent(ev.id, u.uid, saved || null);
            setGuestEventId(ev.id);
            setShotsRemaining(shots);
            setJoined(true);
            await addJoinedEvent({ id: ev.id, code: ev.shortCode, name: ev.name, coverImageUrl: ev.coverImageUrl, type: ev.type, joinedAt: Date.now() });
            // Register this guest's push token so server notifications (new
            // photos, likes, low shots, reminders) can reach them.
            registerPushTokenForUser(u.uid);
            if (ev.revealTiming === 'next_day') {
              scheduleLocalAt(`reveal_${ev.id}`, revealAtMs(ev), t('guest.revealReadyTitle'), t('guest.revealReadyBody', { name: ev.name }));
            }
            if (ev.reminderBefore === '1d' && reminderAtMs(ev) > Date.now()) {
              scheduleLocalAt(`reminder_${ev.id}`, reminderAtMs(ev), t('guest.reminderTitle', { name: ev.name }), t('guest.reminderBody'));
            }
            if (reminderTodayAtMs(ev) > Date.now()) {
              scheduleLocalAt(`reminder_today_${ev.id}`, reminderTodayAtMs(ev), t('guest.reminderTodayTitle', { name: ev.name }), t('guest.reminderTodayBody'));
            }
          } catch (e) {
            if (e instanceof LimitError && e.code === 'event_full') setError(t('errors.maxGuestsReached'));
            else { setError(t('errors.unknownError')); logError('guest_join', e, { code, step: 'joinEvent' }); }
          }
        }
      } catch (e) {
        setError(t('errors.unknownError'));
        logError('guest_join', e, { code, step: 'load' });
      } finally {
        setLoading(false);
      }
    })();
  }, [code]);

  const onNicknameChange = (v: string) => { setNicknameState(v); saveNickname(v); };

  // The hub is always the *guest* experience. When reveal is private, everyone
  // here (the host included) sees only their own shots — the host's full gallery
  // lives in the event management screen.
  const hostOnly = event?.revealTiming === 'private';
  const revealed = event ? isRevealed(event) : false;
  const visiblePhotos = allPhotos.filter((p) => {
    if (p.isVisible === false || p.flagged) return false;   // hidden / pending review
    if (hostOnly || filter === 'mine') return p.uploadedBy === uid;
    return true;
  });

  const current = viewerIndex != null ? visiblePhotos[viewerIndex] ?? null : null;

  const reportCurrent = () => {
    if (!current) return;
    const id = current.id;
    Alert.alert(t('moderation.reportTitle'), t('moderation.reportBody'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('moderation.report'), style: 'destructive',
        onPress: async () => {
          await EventService.reportPhoto(event!.id, id, uid ?? 'anon').catch(() => {});
          setViewerIndex(null);
          Alert.alert(t('moderation.reported'));
        },
      },
    ]);
  };

  // Guests can remove their own photo — nothing else.
  const deleteCurrent = () => {
    if (!current) return;
    const id = current.id;
    Alert.alert(t('host.deletePhoto'), t('host.deletePhotoConfirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'), style: 'destructive',
        onPress: async () => {
          setViewerIndex(null);
          // Firestore latency compensation drops it from the live feed instantly.
          await EventService.deletePhoto(event!.id, id).catch(() => {});
        },
      },
    ]);
  };

  const likeCount = current ? (current.likedBy?.length ?? 0) : 0;
  const liked = !!current && !!uid && (current.likedBy ?? []).includes(uid);
  const toggleLike = () => {
    if (!current || !uid) return;
    const id = current.id;
    Haptics.selectionAsync();
    // The like write reflects instantly via the realtime feed (latency comp).
    EventService.toggleLike(event!.id, id, uid, liked).catch(() => {});
  };

  // Lightbox: native horizontal paging. Arrows and swipe both move the index.
  const navigate = (dir: -1 | 1) => {
    if (viewerIndex == null) return;
    const next = viewerIndex + dir;
    if (next >= 0 && next < visiblePhotos.length) {
      flatRef.current?.scrollToIndex({ index: next, animated: true });
      setViewerIndex(next);
      Haptics.selectionAsync();
    }
  };
  const onViewerScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / width);
    if (idx !== viewerIndex && idx >= 0 && idx < visiblePhotos.length) setViewerIndex(idx);
  };

  // Lightbox video playback (expo-video) — only the focused page gets a player.
  const currentIsVideo = current?.mediaType === 'video';
  const player = useVideoPlayer(currentIsVideo ? current!.imageUrl : null, (p) => { p.loop = true; p.play(); });

  const saveToLibrary = async (photo: Photo) => {
    try {
      setSaving(true);
      const perm = await MediaLibrary.requestPermissionsAsync();
      if (!perm.granted) { Alert.alert(t('errors.cameraPermission')); return; }
      await savePhotoToLibrary(photo);
      Alert.alert(t('host.photoSaved'));
    } catch (e: any) {
      Alert.alert(t('common.error'), String(e?.message ?? e));
    } finally {
      setSaving(false);
    }
  };

  const downloadList = async (list: Photo[]) => {
    if (list.length === 0 || saving) return;
    try {
      setSaving(true);
      const perm = await MediaLibrary.requestPermissionsAsync();
      if (!perm.granted) { Alert.alert(t('errors.cameraPermission')); return; }
      setDlProgress({ done: 0, total: list.length });
      const { saved, lastError } = await savePhotosToLibrary(list, (done, total) => setDlProgress({ done, total }));
      if (saved === 0 && lastError) Alert.alert(t('common.error'), String((lastError as { message?: string })?.message ?? lastError));
      else Alert.alert(t('host.downloadAllDone', { count: saved }));
      exitSelect();
    } finally {
      setSaving(false);
      setDlProgress(null);
    }
  };

  if (loading) {
    return (
      <LinearGradient colors={gradients.page} style={styles.container}>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={colors.brand.DEFAULT} />
          <Text style={styles.loadingText}>{t('guest.joiningEvent')}</Text>
        </View>
      </LinearGradient>
    );
  }

  if (error || !event) {
    return (
      <LinearGradient colors={gradients.page} style={styles.container}>
        <View style={styles.centerContent}>
          <View style={styles.errorIconWrap}>
            <Icon name="alert" size={36} color={colors.error} strokeWidth={1.8} />
          </View>
          <Text style={styles.errorTitle}>{error}</Text>
          <PrimaryButton label={t('common.back')} onPress={() => router.back()} variant="ghost" />
        </View>
      </LinearGradient>
    );
  }

  const showGrid = revealed && visiblePhotos.length > 0;

  // The non-grid gallery states (locked reveal / loading skeleton / empty) all
  // surface through ListEmptyComponent so the list owns the whole scroll.
  const galleryEmpty = !revealed ? (
    <View style={styles.locked}>
      <Icon name="film" size={32} color={colors.brand.DEFAULT} strokeWidth={1.6} />
      <Text style={styles.lockedText}>{t('guest.developing')}</Text>
      <Text style={styles.opensText}>{t('guest.opensAt', { time: format(new Date(revealAtMs(event)), 'd MMM HH:mm') })}</Text>
    </View>
  ) : !photosLoaded && (event.photoCount ?? 0) > 0 ? (
    <View style={[styles.grid, styles.gridPad]}>
      {Array.from({ length: Math.min(event.photoCount, 8) }).map((_, i) => (
        <Skeleton key={i} style={styles.cell} />
      ))}
    </View>
  ) : (
    <View style={styles.emptyGal}>
      <Icon name="camera" size={28} color={colors.brand.light} strokeWidth={1.6} />
      <Text style={styles.emptyGalText}>{t('gallery.empty')}</Text>
    </View>
  );

  const listHeader = (
    <>
      {/* Cover */}
      <View style={styles.coverWrap}>
        {event.coverImageUrl ? (
          <Image source={event.coverImageUrl} style={styles.coverImage} contentFit="cover" transition={150} />
        ) : (
          <LinearGradient colors={['rgba(190,106,46,0.14)', 'rgba(190,106,46,0.05)']} style={styles.coverEmpty}>
            <Icon name={EVENT_TYPE_ICON[event.type as EventType] ?? 'party'} size={56} color={colors.brand.light} strokeWidth={1.4} />
          </LinearGradient>
        )}
        <TouchableOpacity onPress={() => router.back()} style={[styles.backBtn, { top: insets.top + spacing.sm }]}>
          <Icon name="arrowLeft" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <Text style={styles.eventName}>{event.name}</Text>
        {event.date ? <Text style={styles.eventDate}>{format(new Date(event.date), 'd MMMM yyyy')}</Text> : null}

        <View style={styles.stats}>
          <View style={styles.statChip}>
            <Icon name="camera" size={14} color={colors.text.secondary} />
            <Text style={styles.statText}>
              {joined && event.isActive
                ? t('guest.shotsLeftOf', { left: shotsRemaining, total: event.shotsPerGuest })
                : t('guest.shotsShort', { count: event.shotsPerGuest })}
            </Text>
          </View>
          {event.disposableMode && <View style={styles.statChip}><Icon name="film" size={14} color={colors.text.secondary} /><Text style={styles.statText}>Disposable</Text></View>}
        </View>

        {/* Nickname (remembered) */}
        <View style={styles.nick}>
          <InputField label={t('guest.nickname')} placeholder={t('guest.nicknamePlaceholder')} value={nickname} onChangeText={onNicknameChange} maxLength={30} />
        </View>

        {/* Camera CTA */}
        {!event.isActive ? (
          <View style={styles.endedPill}><Icon name="lock" size={16} color={colors.text.muted} /><Text style={styles.endedText}>{t('host.eventEnded')}</Text></View>
        ) : joined && shotsRemaining === 0 ? (
          <View style={styles.usedPill}>
            <Icon name="check" size={16} color={colors.brand.dark} />
            <Text style={styles.usedText}>{t('guest.allShotsUsed')}</Text>
          </View>
        ) : (
          <PrimaryButton label={t('guest.enterCamera')} icon="camera" onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); router.push({ pathname: '/guest/camera', params: { id: event.id } }); }} />
        )}

        {/* Gallery */}
        <View style={styles.galleryHead}>
          <Text style={styles.galleryTitle}>
            {selecting ? t('gallery.selected', { count: selSet.size }) : t('gallery.title')}
          </Text>
          {!hostOnly && revealed && !selecting && (
            <View style={styles.tabs}>
              {(['all', 'mine'] as const).map((f) => (
                <TouchableOpacity key={f} onPress={() => setFilter(f)} style={[styles.tab, filter === f && styles.tabActive]}>
                  <Text style={[styles.tabText, filter === f && styles.tabTextActive]}>{f === 'all' ? t('gallery.allPhotos') : t('gallery.myPhotos')}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Gallery actions */}
        {showGrid && (
          <View style={styles.galActions}>
            {selecting ? (
              <TouchableOpacity onPress={exitSelect} style={styles.galActionBtn}><Text style={styles.galActionText}>{t('common.cancel')}</Text></TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity onPress={() => setSelecting(true)} style={styles.galActionBtn} activeOpacity={0.7}>
                  <Icon name="check" size={15} color={colors.brand.DEFAULT} /><Text style={styles.galActionText}>{t('gallery.select')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => downloadList(visiblePhotos)} style={styles.galActionBtn} disabled={saving} activeOpacity={0.7}>
                  <Icon name="download" size={15} color={colors.brand.DEFAULT} />
                  <Text style={styles.galActionText}>{dlProgress ? t('host.downloadAllProgress', { done: dlProgress.done, total: dlProgress.total }) : t('host.downloadAll')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleZip} style={styles.galActionBtn} disabled={zipping} activeOpacity={0.7}>
                  <Icon name="film" size={15} color={colors.brand.DEFAULT} />
                  <Text style={styles.galActionText}>{zipping ? t('host.zipPreparing') : 'ZIP'}</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      </View>
    </>
  );

  const renderCell = ({ item: p, index: idx }: { item: Photo; index: number }) => {
    const isSel = selSet.has(p.id);
    const likes = p.likedBy?.length ?? 0;
    return (
      <TouchableOpacity
        style={styles.cell}
        onPress={() => { if (selecting) { toggleSel(p.id); } else { setViewerIndex(idx); } Haptics.selectionAsync(); }}
        onLongPress={() => { if (!selecting) { setSelecting(true); toggleSel(p.id); } }}
        activeOpacity={0.85}
      >
        <Image source={p.thumbnailUrl || p.imageUrl} style={styles.cellImg} contentFit="cover" transition={120} recyclingKey={p.id} />
        {p.mediaType === 'video' && (
          <View style={styles.playBadge}><Icon name="play" size={14} color="#fff" /></View>
        )}
        {/* "Yours" marker — a small dot, deliberately NOT a checkmark
            so it isn't mistaken for a selection state. */}
        {!selecting && p.uploadedBy === uid && <View style={styles.mine} />}
        {!selecting && likes > 0 && (
          <View style={styles.likeBadge}>
            <Icon name="heart" size={11} color="#fff" fill="#fff" />
            <Text style={styles.likeBadgeText}>{likes}</Text>
          </View>
        )}
        {selecting && (
          <View style={[styles.selOverlay, isSel && styles.selOverlayOn]}>
            <View style={[styles.selCheck, isSel && styles.selCheckOn]}>
              {isSel && <Icon name="check" size={14} color="#fff" strokeWidth={3} />}
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient colors={gradients.page} style={styles.container}>
      <FlatList
        data={showGrid ? visiblePhotos : []}
        keyExtractor={(p) => p.id}
        renderItem={renderCell}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={galleryEmpty}
        ListFooterComponent={hasMore && showGrid ? <ActivityIndicator color={colors.brand.DEFAULT} style={{ paddingVertical: spacing.lg }} /> : null}
        onEndReached={loadMore}
        onEndReachedThreshold={0.6}
        contentContainerStyle={{ paddingBottom: insets.bottom + 110 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Selection action bar */}
      {selecting && selSet.size > 0 && (
        <View style={[styles.selBar, { paddingBottom: insets.bottom + spacing.md }]}>
          <TouchableOpacity
            onPress={() => downloadList(visiblePhotos.filter((p) => selSet.has(p.id)))}
            disabled={saving}
            style={styles.selBarBtn}
            activeOpacity={0.85}
          >
            <LinearGradient colors={gradients.amber} style={styles.selBarGradient}>
              <Icon name="download" size={18} color="#fff" />
              <Text style={styles.selBarText}>
                {dlProgress ? t('host.downloadAllProgress', { done: dlProgress.done, total: dlProgress.total }) : `${t('common.download')} (${selSet.size})`}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}

      {/* Lightbox — swipe horizontally between photos (iOS Photos style) */}
      <Modal visible={!!current} transparent animationType="fade" onRequestClose={() => setViewerIndex(null)} statusBarTranslucent>
        <View style={styles.lightbox}>
          <StatusBar barStyle="light-content" />
          {current && (
            <FlatList
              ref={flatRef}
              data={visiblePhotos}
              keyExtractor={(p) => p.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              initialScrollIndex={viewerIndex ?? 0}
              getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
              onMomentumScrollEnd={onViewerScroll}
              style={StyleSheet.absoluteFill}
              renderItem={({ item, index }) => (
                <View style={styles.page}>
                  {item.mediaType === 'video'
                    ? (index === viewerIndex
                        ? <VideoView player={player} style={StyleSheet.absoluteFill} contentFit="contain" nativeControls />
                        : <Image source={item.thumbnailUrl || item.imageUrl} style={StyleSheet.absoluteFill} contentFit="contain" />)
                    : <Image source={item.imageUrl} placeholder={item.thumbnailUrl ? { uri: item.thumbnailUrl } : undefined} style={StyleSheet.absoluteFill} contentFit="contain" transition={150} />}
                </View>
              )}
            />
          )}

          <TouchableOpacity onPress={() => setViewerIndex(null)} style={[styles.lbClose, { top: insets.top + spacing.sm }]}>
            <Icon name="close" size={22} color="#fff" />
          </TouchableOpacity>

          {/* Prev / next */}
          {viewerIndex != null && viewerIndex > 0 && (
            <TouchableOpacity onPress={() => navigate(-1)} style={[styles.lbNav, styles.lbNavLeft]} hitSlop={12}>
              <Icon name="arrowLeft" size={26} color="#fff" />
            </TouchableOpacity>
          )}
          {viewerIndex != null && viewerIndex < visiblePhotos.length - 1 && (
            <TouchableOpacity onPress={() => navigate(1)} style={[styles.lbNav, styles.lbNavRight]} hitSlop={12}>
              <Icon name="arrowRight" size={26} color="#fff" />
            </TouchableOpacity>
          )}

          {/* Caption — who took it */}
          {current && (
            <View style={[styles.lbCaption, { bottom: insets.bottom + 92 }]} pointerEvents="none">
              <Text style={styles.lbBy}>{t('gallery.by')} <Text style={styles.lbByName}>{current.uploaderName?.trim() || t('common.anonymous')}</Text></Text>
              {viewerIndex != null && <Text style={styles.lbCount}>{viewerIndex + 1} / {visiblePhotos.length}</Text>}
            </View>
          )}

          <View style={[styles.lbBar, { paddingBottom: insets.bottom + spacing.lg }]}>
            <TouchableOpacity onPress={() => current && saveToLibrary(current)} style={styles.lbAction} disabled={saving}>
              <Icon name="download" size={24} color="#fff" />
              <Text style={styles.lbActionText}>{saving ? t('common.loading') : t('common.download')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleLike} style={styles.lbAction}>
              <Icon name="heart" size={24} color={liked ? colors.brand.DEFAULT : '#fff'} fill={liked ? colors.brand.DEFAULT : 'none'} />
              <Text style={styles.lbActionText}>{likeCount > 0 ? t('gallery.likes', { count: likeCount }) : t('gallery.like')}</Text>
            </TouchableOpacity>
            {current?.uploadedBy === uid ? (
              <TouchableOpacity onPress={deleteCurrent} style={styles.lbAction}>
                <Icon name="trash" size={24} color="#fff" />
                <Text style={styles.lbActionText}>{t('common.delete')}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={reportCurrent} style={styles.lbAction}>
                <Icon name="alert" size={24} color="#fff" />
                <Text style={styles.lbActionText}>{t('moderation.report')}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centerContent: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.lg, paddingHorizontal: spacing.lg },
  loadingText: { fontSize: typography.sizes.lg, fontFamily: fonts.body, color: colors.text.secondary },
  errorIconWrap: { width: 88, height: 88, borderRadius: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(239,68,68,0.1)', borderWidth: 1, borderColor: 'rgba(239,68,68,0.3)' },
  errorTitle: { fontSize: typography.sizes.lg, fontFamily: fonts.displayBold, color: colors.text.primary, textAlign: 'center' },
  coverWrap: { height: 200 },
  coverImage: { width: '100%', height: '100%' },
  coverEmpty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  backBtn: { position: 'absolute', left: spacing.lg, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' },
  body: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, gap: spacing.md },
  eventName: { fontSize: typography.sizes['2xl'], fontFamily: fonts.displayBold, color: colors.text.primary },
  eventDate: { fontSize: typography.sizes.sm, fontFamily: fonts.body, color: colors.text.muted, marginTop: -spacing.xs },
  stats: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  statChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.bg.card, borderRadius: radius.full, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: colors.border.DEFAULT },
  statText: { fontSize: typography.sizes.sm, fontFamily: fonts.body, color: colors.text.secondary },
  nick: {},
  endedPill: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border.DEFAULT, backgroundColor: colors.bg.card },
  endedText: { fontSize: typography.sizes.sm, fontFamily: fonts.bodyMedium, color: colors.text.muted },
  usedPill: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 56, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.brand.DEFAULT, backgroundColor: colors.brand.glow },
  usedText: { fontSize: typography.sizes.base, fontFamily: fonts.bodySemibold, color: colors.brand.dark },
  galleryHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.sm },
  galleryTitle: { fontSize: typography.sizes.lg, fontFamily: fonts.displayBold, color: colors.text.primary },
  tabs: { flexDirection: 'row', gap: spacing.xs, backgroundColor: colors.bg.card, borderRadius: radius.full, padding: 3, borderWidth: 1, borderColor: colors.border.DEFAULT },
  tab: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: radius.full },
  tabActive: { backgroundColor: colors.brand.DEFAULT },
  tabText: { fontSize: typography.sizes.xs, fontFamily: fonts.bodySemibold, color: colors.text.muted },
  tabTextActive: { color: colors.text.inverse },
  locked: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing['2xl'] },
  lockedText: { fontSize: typography.sizes.base, fontFamily: fonts.displayBold, color: colors.text.primary },
  opensText: { fontSize: typography.sizes.sm, fontFamily: fonts.bodySemibold, color: colors.brand.dark },
  emptyGal: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing['2xl'] },
  emptyGalText: { fontSize: typography.sizes.sm, fontFamily: fonts.body, color: colors.text.muted },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: GAP },
  gridPad: { paddingHorizontal: spacing.lg },
  gridRow: { gap: GAP, paddingHorizontal: spacing.lg, marginBottom: GAP },
  cell: { width: PHOTO_W, height: PHOTO_H, borderRadius: radius.md, overflow: 'hidden' },
  cellImg: { width: '100%', height: '100%', backgroundColor: colors.border.subtle },
  mine: { position: 'absolute', top: 6, right: 6, width: 9, height: 9, borderRadius: 5, backgroundColor: colors.brand.DEFAULT, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.9)' },
  playBadge: { position: 'absolute', top: 5, left: 5, width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.55)', alignItems: 'center', justifyContent: 'center' },
  likeBadge: { position: 'absolute', bottom: 5, left: 5, flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: 'rgba(0,0,0,0.55)', borderRadius: radius.full, paddingHorizontal: 6, paddingVertical: 3 },
  likeBadgeText: { color: '#fff', fontSize: 11, fontFamily: fonts.bodySemibold },
  galActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: spacing.md, marginTop: -spacing.xs, marginBottom: spacing.xs },
  galActionBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  galActionText: { fontSize: typography.sizes.sm, fontFamily: fonts.bodySemibold, color: colors.brand.DEFAULT },
  selOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'flex-end', justifyContent: 'flex-start', padding: 7 },
  selOverlayOn: { borderWidth: 3, borderColor: colors.brand.DEFAULT, borderRadius: radius.md, backgroundColor: 'rgba(190,106,46,0.18)' },
  selCheck: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#fff', backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center' },
  selCheckOn: { backgroundColor: colors.brand.DEFAULT, borderColor: '#fff' },
  selBar: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: spacing.lg, paddingTop: spacing.md, backgroundColor: 'transparent' },
  selBarBtn: { borderRadius: radius.xl, overflow: 'hidden', height: 54 },
  selBarGradient: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  selBarText: { color: '#fff', fontSize: typography.sizes.base, fontFamily: fonts.bodySemibold },
  lightbox: { flex: 1, backgroundColor: 'rgba(0,0,0,0.97)' },
  page: { width, height: '100%' },
  lbClose: { position: 'absolute', right: spacing.lg, width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  lbNav: { position: 'absolute', top: '46%', width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  lbNavLeft: { left: spacing.md },
  lbNavRight: { right: spacing.md },
  lbCaption: { position: 'absolute', left: 0, right: 0, alignItems: 'center', gap: 3 },
  lbBy: { color: 'rgba(255,255,255,0.7)', fontSize: typography.sizes.sm, fontFamily: fonts.body },
  lbByName: { color: '#fff', fontFamily: fonts.bodySemibold },
  lbCount: { color: 'rgba(255,255,255,0.5)', fontSize: typography.sizes.xs, fontFamily: fonts.body },
  lbBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing['2xl'], paddingTop: spacing.lg },
  lbAction: { alignItems: 'center', gap: 6 },
  lbActionText: { color: '#fff', fontSize: typography.sizes.sm, fontFamily: fonts.bodyMedium },
});
