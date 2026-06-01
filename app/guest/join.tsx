import { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator,
  ScrollView, Modal, StatusBar, Dimensions,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import * as MediaLibrary from 'expo-media-library/legacy';
import * as FileSystem from 'expo-file-system/legacy';
import { format } from 'date-fns';
import { EventService, Event, Photo, LimitError } from '@features/events/services/eventService';
import { AuthService } from '@features/auth/services/authService';
import { useAuthStore } from '@store/authStore';
import { useEventStore, EventType } from '@store/eventStore';
import { addJoinedEvent, getSavedNickname, saveNickname } from '@store/guestEvents';
import { scheduleLocalAt } from '@shared/notifications';
import { PrimaryButton } from '@shared/components/PrimaryButton';
import { InputField } from '@shared/components/InputField';
import { Icon, EVENT_TYPE_ICON } from '@shared/components/Icon';
import { colors, typography, spacing, radius, fonts, gradients } from '@constants/theme';

const { width } = Dimensions.get('window');
const GAP = spacing.xs;
const PHOTO = (width - spacing.lg * 2 - GAP * 2) / 3;

// next_day → start of the day after the event (surprise reveal).
function revealAtMs(e: Event): number {
  if (e.revealTiming !== 'next_day') return 0;
  const base = e.date ? new Date(e.date) : new Date();
  base.setHours(0, 0, 0, 0);
  base.setDate(base.getDate() + 1);
  return base.getTime();
}
const isRevealed = (e: Event) => e.revealTiming !== 'next_day' || Date.now() >= revealAtMs(e);

export default function EventHubScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { code } = useLocalSearchParams<{ code: string }>();
  const { user, setUser } = useAuthStore();
  const { setGuestEventId, setShotsRemaining } = useEventStore();

  const [event, setEvent] = useState<Event | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [nickname, setNicknameState] = useState('');
  const [uid, setUid] = useState<string | null>(user?.uid ?? null);
  const [filter, setFilter] = useState<'all' | 'mine'>('all');
  const [selected, setSelected] = useState<Photo | null>(null);
  const [saving, setSaving] = useState(false);

  // Land → auto-join (anonymous) → load shots + subscribe to photos.
  useEffect(() => {
    if (!code) return;
    let unsub: (() => void) | undefined;
    (async () => {
      try {
        const ev = await EventService.getByShortCode(code);
        if (!ev) { setError(t('errors.eventNotFound')); return; }
        setEvent(ev);

        const saved = await getSavedNickname();
        setNicknameState(saved);

        let u = user;
        if (!u) { u = await AuthService.signInAnonymous(); setUser(u); }
        setUid(u.uid);

        if (ev.isActive) {
          try {
            const shots = await EventService.joinEvent(ev.id, u.uid, saved || null);
            setGuestEventId(ev.id);
            setShotsRemaining(shots);
            await addJoinedEvent({ id: ev.id, code: ev.shortCode, name: ev.name, coverImageUrl: ev.coverImageUrl, type: ev.type, joinedAt: Date.now() });
            if (ev.revealTiming === 'next_day') {
              scheduleLocalAt(`reveal_${ev.id}`, revealAtMs(ev), t('guest.revealReadyTitle'), t('guest.revealReadyBody', { name: ev.name }));
            }
          } catch (e) {
            if (e instanceof LimitError && e.code === 'event_full') setError(t('errors.maxGuestsReached'));
          }
        }
        unsub = EventService.subscribeToPhotos(ev.id, setPhotos);
      } catch {
        setError(t('errors.unknownError'));
      } finally {
        setLoading(false);
      }
    })();
    return () => unsub?.();
  }, [code]);

  const onNicknameChange = (v: string) => { setNicknameState(v); saveNickname(v); };

  const hostOnly = event?.revealTiming === 'private' && uid !== event?.hostId;
  const revealed = event ? isRevealed(event) : false;
  const visiblePhotos = (hostOnly || filter === 'mine')
    ? photos.filter((p) => p.uploadedBy === uid)
    : photos;

  const saveToLibrary = async (photo: Photo) => {
    try {
      setSaving(true);
      const perm = await MediaLibrary.requestPermissionsAsync();
      if (!perm.granted) { Alert.alert(t('errors.cameraPermission')); return; }
      const target = FileSystem.cacheDirectory + `${photo.id}.jpg`;
      const { uri } = await FileSystem.downloadAsync(photo.imageUrl, target);
      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert(t('host.photoSaved'));
    } catch (e: any) {
      Alert.alert(t('common.error'), String(e?.message ?? e));
    } finally {
      setSaving(false);
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

  return (
    <LinearGradient colors={gradients.page} style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 110 }} showsVerticalScrollIndicator={false}>
        {/* Cover */}
        <View style={styles.coverWrap}>
          {event.coverImageUrl ? (
            <Image source={{ uri: event.coverImageUrl }} style={styles.coverImage} />
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
            <View style={styles.statChip}><Icon name="camera" size={14} color={colors.text.secondary} /><Text style={styles.statText}>{event.shotsPerGuest} çekim</Text></View>
            {event.disposableMode && <View style={styles.statChip}><Icon name="film" size={14} color={colors.text.secondary} /><Text style={styles.statText}>Disposable</Text></View>}
            {hostOnly && <View style={styles.statChip}><Icon name="lock" size={14} color={colors.text.secondary} /><Text style={styles.statText}>{t('guest.onlyYours')}</Text></View>}
          </View>

          {/* Nickname (remembered) */}
          <View style={styles.nick}>
            <InputField label={t('guest.nickname')} placeholder={t('guest.nicknamePlaceholder')} value={nickname} onChangeText={onNicknameChange} maxLength={30} />
          </View>

          {/* Camera CTA */}
          {event.isActive ? (
            <PrimaryButton label={t('guest.enterCamera')} onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); router.push({ pathname: '/guest/camera', params: { id: event.id } }); }} />
          ) : (
            <View style={styles.endedPill}><Icon name="lock" size={16} color={colors.text.muted} /><Text style={styles.endedText}>{t('host.eventEnded')}</Text></View>
          )}

          {/* Gallery */}
          <View style={styles.galleryHead}>
            <Text style={styles.galleryTitle}>{t('gallery.title')}</Text>
            {!hostOnly && revealed && (
              <View style={styles.tabs}>
                {(['all', 'mine'] as const).map((f) => (
                  <TouchableOpacity key={f} onPress={() => setFilter(f)} style={[styles.tab, filter === f && styles.tabActive]}>
                    <Text style={[styles.tabText, filter === f && styles.tabTextActive]}>{f === 'all' ? t('gallery.allPhotos') : t('gallery.myPhotos')}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {!revealed ? (
            <View style={styles.locked}>
              <Icon name="film" size={32} color={colors.brand.DEFAULT} strokeWidth={1.6} />
              <Text style={styles.lockedText}>{t('guest.developing')}</Text>
              <Text style={styles.opensText}>{t('guest.opensAt', { time: format(new Date(revealAtMs(event)), 'd MMM HH:mm') })}</Text>
            </View>
          ) : visiblePhotos.length === 0 ? (
            <View style={styles.emptyGal}>
              <Icon name="camera" size={28} color={colors.brand.light} strokeWidth={1.6} />
              <Text style={styles.emptyGalText}>{t('gallery.empty')}</Text>
            </View>
          ) : (
            <View style={styles.grid}>
              {visiblePhotos.map((p) => (
                <TouchableOpacity key={p.id} style={styles.cell} onPress={() => { setSelected(p); Haptics.selectionAsync(); }} activeOpacity={0.85}>
                  <Image source={{ uri: p.imageUrl }} style={styles.cellImg} />
                  {p.uploadedBy === uid && <View style={styles.mine}><Icon name="check" size={10} color="#fff" strokeWidth={3} /></View>}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Lightbox */}
      <Modal visible={!!selected} transparent animationType="fade" onRequestClose={() => setSelected(null)} statusBarTranslucent>
        <View style={styles.lightbox}>
          <StatusBar barStyle="light-content" />
          {selected && <Image source={{ uri: selected.imageUrl }} style={StyleSheet.absoluteFill} resizeMode="contain" />}
          <TouchableOpacity onPress={() => setSelected(null)} style={[styles.lbClose, { top: insets.top + spacing.sm }]}>
            <Icon name="close" size={22} color="#fff" />
          </TouchableOpacity>
          <View style={[styles.lbBar, { paddingBottom: insets.bottom + spacing.lg }]}>
            <TouchableOpacity onPress={() => selected && saveToLibrary(selected)} style={styles.lbAction} disabled={saving}>
              <Icon name="download" size={24} color="#fff" />
              <Text style={styles.lbActionText}>{saving ? t('common.loading') : t('common.download')}</Text>
            </TouchableOpacity>
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
  cell: { width: PHOTO, height: PHOTO, borderRadius: radius.md, overflow: 'hidden' },
  cellImg: { width: '100%', height: '100%' },
  mine: { position: 'absolute', top: 5, right: 5, width: 18, height: 18, borderRadius: 9, backgroundColor: colors.brand.DEFAULT, alignItems: 'center', justifyContent: 'center' },
  lightbox: { flex: 1, backgroundColor: 'rgba(0,0,0,0.97)' },
  lbClose: { position: 'absolute', right: spacing.lg, width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  lbBar: { position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center', paddingTop: spacing.lg },
  lbAction: { alignItems: 'center', gap: 6 },
  lbActionText: { color: '#fff', fontSize: typography.sizes.sm, fontFamily: fonts.bodyMedium },
});
