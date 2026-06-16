import { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList, Image,
  Alert, Dimensions, Modal, StatusBar,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import * as MediaLibrary from 'expo-media-library/legacy';
import * as FileSystem from 'expo-file-system/legacy';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Linking } from 'react-native';
import { EventService, Event, Photo } from '@features/events/services/eventService';
import { createEventZip } from '@features/events/services/exportService';
import { getPlan, PAID_PLANS_ENABLED } from '@constants/plans';
import { Icon } from '@shared/components/Icon';
import { Skeleton } from '@shared/components/Skeleton';
import { colors, typography, spacing, radius, fonts, gradients } from '@constants/theme';

const { width } = Dimensions.get('window');
// 2-column album grid — portrait cells for a real photo-album feel.
const CELL_RATIO = 13 / 9;   // height / width (tweak for taller/shorter cells)
const PHOTO_W = (width - spacing.lg * 2 - spacing.xs * 2) / 2;
const PHOTO_H = Math.round(PHOTO_W * CELL_RATIO);

const REMINDERS: { key: '1d' | null; labelKey: string }[] = [
  { key: null, labelKey: 'host.noReminder' },
  { key: '1d', labelKey: 'host.reminderDayBefore' },
];


export default function EventManage() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [event, setEvent] = useState<Event | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photosLoaded, setPhotosLoaded] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selecting, setSelecting] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);
  const [dlProgress, setDlProgress] = useState<{ done: number; total: number } | null>(null);

  useEffect(() => {
    if (!id) return;
    EventService.getById(id).then(setEvent);
    const unsub = EventService.subscribeToPhotos(id, (ps) => { setPhotos(ps); setPhotosLoaded(true); });
    return unsub;
  }, [id]);

  // Host-editable settings — optimistic local update + persist.
  const patchSettings = (patch: Partial<Event>) => {
    if (!event) return;
    setEvent({ ...event, ...patch });
    EventService.updateSettings(event.id, patch as any).catch(() => setEvent(event));
  };

  const renderSettings = () => {
    if (!event) return null;
    return (
      <View style={styles.settingsCard}>
        <Text style={styles.settingsTitle}>{t('host.eventSettings')}</Text>

        {/* Capture mode — one choice: disposable (no preview) OR open gallery
            (guests can pick from their roll and preview before sharing). */}
        <Text style={styles.settingSub}>{t('host.captureMode')}</Text>
        {([
          { disposable: true, icon: 'film' as const, title: t('host.disposableMode'), desc: t('host.disposableModeDesc') },
          { disposable: false, icon: 'image' as const, title: t('host.modeOpenTitle'), desc: t('host.modeOpenDesc') },
        ]).map((m) => {
          const active = event.disposableMode === m.disposable;
          return (
            <TouchableOpacity
              key={String(m.disposable)}
              style={styles.settingRow}
              onPress={() => patchSettings(m.disposable
                ? { disposableMode: true, allowGalleryUpload: false }
                : { disposableMode: false, allowGalleryUpload: true })}
              activeOpacity={0.8}
            >
              <Icon name={m.icon} size={20} color={active ? colors.brand.DEFAULT : colors.text.muted} />
              <View style={{ flex: 1 }}>
                <Text style={styles.settingLabel}>{m.title}</Text>
                <Text style={styles.settingDesc}>{m.desc}</Text>
              </View>
              <View style={[styles.modeRadio, active && styles.modeRadioActive]}>
                {active && <View style={styles.modeRadioDot} />}
              </View>
            </TouchableOpacity>
          );
        })}

        <Text style={styles.settingSub}>{t('host.reminderBefore')}</Text>
        <View style={styles.reminderRow}>
          {REMINDERS.map((r) => {
            const active = event.reminderBefore === r.key;
            return (
              <TouchableOpacity
                key={String(r.key)}
                style={[styles.reminderChip, active && styles.reminderChipActive]}
                onPress={() => patchSettings({ reminderBefore: r.key })}
                activeOpacity={0.7}
              >
                <Text style={[styles.reminderText, active && styles.reminderTextActive]}>{t(r.labelKey)}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Plan + upgrade (sales surface) — hidden on the top plan */}
        {PAID_PLANS_ENABLED && getPlan(event.plan).id !== 'unlimited' && (
          <TouchableOpacity
            style={styles.upgradeRow}
            onPress={() => router.push({ pathname: '/host/paywall', params: { upgradeId: event.id, current: event.plan } })}
            activeOpacity={0.85}
          >
            <Icon name="crown" size={20} color={colors.gold.DEFAULT} />
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>{t(`paywall.planNames.${getPlan(event.plan).id}`)} · {event.video ? t('paywall.videoOn') : t('paywall.videoOff')}</Text>
              <Text style={styles.settingDesc}>{event.video ? t('host.upgradeHintGuests') : t('host.upgradeHint')}</Text>
            </View>
            <Icon name="arrowRight" size={16} color={colors.text.muted} />
          </TouchableOpacity>
        )}

        {event.isActive ? (
          <TouchableOpacity style={styles.endBtn} onPress={handleEndEvent} activeOpacity={0.8}>
            <Icon name="alert" size={18} color={colors.error} />
            <Text style={styles.endBtnText}>{t('host.endEvent')}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.endedRow}>
            <Icon name="lock" size={16} color={colors.text.muted} />
            <Text style={styles.endedText}>{t('host.eventEnded')}</Text>
          </View>
        )}
      </View>
    );
  };

  const handleEndEvent = () => {
    if (!event) return;
    Alert.alert(
      t('host.endEvent'),
      t('host.endEventConfirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('host.endEvent'),
          style: 'destructive',
          onPress: async () => {
            setEvent({ ...event, isActive: false });
            await EventService.endEvent(event.id).catch(() => setEvent(event));
          },
        },
      ],
    );
  };

  const handleDeletePhoto = (photo: Photo) => {
    Alert.alert(t('host.deletePhoto'), t('host.deletePhotoConfirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          setSelectedPhoto(null);
          await EventService.deletePhoto(id!, photo.id);
        },
      },
    ]);
  };

  const selectedIsVideo = selectedPhoto?.mediaType === 'video';
  const player = useVideoPlayer(selectedIsVideo ? selectedPhoto!.imageUrl : null, (p) => { p.loop = true; p.play(); });

  const selectedIndex = selectedPhoto ? photos.findIndex((p) => p.id === selectedPhoto.id) : -1;
  const navigate = (dir: -1 | 1) => {
    const next = photos[selectedIndex + dir];
    if (next) setSelectedPhoto(next);
  };

  const saveOne = async (photo: Photo) => {
    const ext = photo.mediaType === 'video' ? 'mp4' : 'jpg';
    const target = FileSystem.cacheDirectory + `${photo.id}.${ext}`;
    const { uri } = await FileSystem.downloadAsync(photo.imageUrl, target);
    await MediaLibrary.saveToLibraryAsync(uri);
  };

  const handleSavePhoto = async (photo: Photo) => {
    try {
      setSaving(true);
      const perm = await MediaLibrary.requestPermissionsAsync();
      if (!perm.granted) { Alert.alert(t('errors.cameraPermission')); return; }
      await saveOne(photo);
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
      let done = 0;
      let lastErr: unknown = null;
      setDlProgress({ done: 0, total: list.length });
      for (const p of list) {
        try { await saveOne(p); done += 1; } catch (e) { lastErr = e; }
        setDlProgress({ done, total: list.length });
      }
      if (done === 0 && lastErr) Alert.alert(t('common.error'), String((lastErr as any)?.message ?? lastErr));
      else Alert.alert(t('host.downloadAllDone', { count: done }));
      exitSelect();
    } finally {
      setSaving(false);
      setDlProgress(null);
    }
  };

  const handleDownloadAll = () => downloadList(photos);

  // Server-side ZIP of the whole gallery — the sane path for big events.
  const [zipping, setZipping] = useState(false);
  const handleZip = async () => {
    if (!event || zipping) return;
    try {
      setZipping(true);
      const { url } = await createEventZip(event.id);
      await Linking.openURL(url);
    } catch {
      Alert.alert(t('common.error'), t('host.zipFailed'));
    } finally {
      setZipping(false);
    }
  };

  const toggleSelect = (id: string) => setSelected((prev) => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const exitSelect = () => { setSelecting(false); setSelected(new Set()); };

  const renderPhoto = ({ item }: { item: Photo }) => {
    const isSel = selected.has(item.id);
    return (
      <TouchableOpacity
        onPress={() => (selecting ? toggleSelect(item.id) : setSelectedPhoto(item))}
        onLongPress={() => { if (!selecting) { setSelecting(true); toggleSelect(item.id); } }}
        style={styles.photoCell}
        activeOpacity={0.85}
      >
        <Image source={{ uri: item.thumbnailUrl || item.imageUrl }} style={styles.photo} />
        {item.mediaType === 'video' && (
          <View style={styles.playBadge}><Icon name="play" size={14} color="#fff" /></View>
        )}
        {item.flagged && (
          <View style={styles.flagBadge}><Icon name="alert" size={11} color="#fff" /><Text style={styles.flagText}>{t('moderation.flagged')}</Text></View>
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
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Icon name="arrowLeft" size={20} color={colors.text.secondary} />
          <Text style={styles.backText}>{t('common.back')}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{event?.name ?? '...'}</Text>
        <TouchableOpacity onPress={() => router.push({ pathname: '/host/qr', params: { id, code: event?.shortCode } })}>
          <Text style={styles.qrLink}>QR</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Bar */}
      {event && (
        <View style={styles.statsBar}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {event.photoCap != null ? `${photos.length}/${event.photoCap}` : photos.length}
            </Text>
            <Text style={styles.statLabel}>{t('gallery.photos')}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {event.maxGuests != null ? `${event.guestCount}/${event.maxGuests}` : event.guestCount}
            </Text>
            <Text style={styles.statLabel}>{t('host.guestsLabel')}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={[styles.statItem, styles.liveIndicator]}>
            <View style={[styles.liveDot, !event.isActive && styles.liveDotEnded]} />
            <Text style={[styles.statLabel, { color: event.isActive ? colors.success : colors.text.muted }]}>
              {event.isActive ? t('host.live') : t('host.ended')}
            </Text>
          </View>
        </View>
      )}

      {/* Photos Grid */}
      <FlatList
        data={photos}
        keyExtractor={(p) => p.id}
        renderItem={renderPhoto}
        numColumns={2}
        contentContainerStyle={[styles.grid, { paddingBottom: insets.bottom + spacing.xl }]}
        ListHeaderComponent={
          <>
            {renderSettings()}
            <View style={styles.sectionHead}>
              <Text style={styles.sectionTitle}>
                {selecting ? t('gallery.selected', { count: selected.size }) : `${t('host.livePhotos')} (${photos.length})`}
              </Text>
              {photos.length > 0 && (
                <View style={styles.headActions}>
                  {selecting ? (
                    <TouchableOpacity onPress={exitSelect} style={styles.downloadAllBtn} activeOpacity={0.7}>
                      <Text style={styles.downloadAllText}>{t('common.cancel')}</Text>
                    </TouchableOpacity>
                  ) : (
                    <>
                      <TouchableOpacity onPress={() => setSelecting(true)} style={styles.downloadAllBtn} activeOpacity={0.7}>
                        <Icon name="check" size={15} color={colors.brand.DEFAULT} />
                        <Text style={styles.downloadAllText}>{t('gallery.select')}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleDownloadAll} style={styles.downloadAllBtn} disabled={saving} activeOpacity={0.7}>
                        <Icon name="download" size={15} color={colors.brand.DEFAULT} />
                        <Text style={styles.downloadAllText} numberOfLines={1}>
                          {dlProgress ? t('host.downloadAllProgress', { done: dlProgress.done, total: dlProgress.total }) : t('host.downloadAll')}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleZip} style={styles.downloadAllBtn} disabled={zipping} activeOpacity={0.7}>
                        <Icon name="film" size={15} color={colors.brand.DEFAULT} />
                        <Text style={styles.downloadAllText}>{zipping ? t('host.zipPreparing') : 'ZIP'}</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              )}
            </View>
          </>
        }
        ListEmptyComponent={
          !photosLoaded && (event?.photoCount ?? 0) > 0 ? (
            <View style={styles.skeletonGrid}>
              {Array.from({ length: Math.min(event!.photoCount, 8) }).map((_, i) => (
                <Skeleton key={i} style={styles.photoCell} />
              ))}
            </View>
          ) : (
            <View style={styles.empty}>
              <View style={styles.emptyIconWrap}>
                <Icon name="camera" size={32} color={colors.brand.light} strokeWidth={1.6} />
              </View>
              <Text style={styles.emptyText}>{t('gallery.empty')}</Text>
              <Text style={styles.emptySubText}>{t('gallery.emptySubtitle')}</Text>
            </View>
          )
        }
      />

      {/* Selection action bar */}
      {selecting && selected.size > 0 && (
        <View style={[styles.selBar, { paddingBottom: insets.bottom + spacing.md }]}>
          <TouchableOpacity
            onPress={() => downloadList(photos.filter((p) => selected.has(p.id)))}
            disabled={saving}
            style={styles.selBarBtn}
            activeOpacity={0.85}
          >
            <LinearGradient colors={gradients.amber} style={styles.selBarGradient}>
              <Icon name="download" size={18} color="#fff" />
              <Text style={styles.selBarText}>
                {dlProgress ? t('host.downloadAllProgress', { done: dlProgress.done, total: dlProgress.total }) : `${t('common.download')} (${selected.size})`}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}

      {/* Photo lightbox — view, save, delete */}
      <Modal visible={!!selectedPhoto} transparent animationType="fade" onRequestClose={() => setSelectedPhoto(null)} statusBarTranslucent>
        <View style={styles.lightbox}>
          <StatusBar barStyle="light-content" />
          {selectedPhoto && (selectedIsVideo
            ? <VideoView player={player} style={StyleSheet.absoluteFill} contentFit="contain" nativeControls />
            : <Image source={{ uri: selectedPhoto.imageUrl }} style={StyleSheet.absoluteFill} resizeMode="contain" />)}
          <View style={[styles.lightboxTop, { paddingTop: insets.top + spacing.sm }]}>
            <TouchableOpacity onPress={() => setSelectedPhoto(null)} style={styles.lbBtn}>
              <Icon name="close" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Prev / next */}
          {selectedIndex > 0 && (
            <TouchableOpacity onPress={() => navigate(-1)} style={[styles.lbNav, styles.lbNavLeft]} hitSlop={12}>
              <Icon name="arrowLeft" size={26} color="#fff" />
            </TouchableOpacity>
          )}
          {selectedIndex >= 0 && selectedIndex < photos.length - 1 && (
            <TouchableOpacity onPress={() => navigate(1)} style={[styles.lbNav, styles.lbNavRight]} hitSlop={12}>
              <Icon name="arrowRight" size={26} color="#fff" />
            </TouchableOpacity>
          )}

          {/* Caption — who took it */}
          {selectedPhoto && (
            <View style={[styles.lbCaption, { bottom: insets.bottom + 92 }]} pointerEvents="none">
              <Text style={styles.lbBy}>{t('gallery.by')} <Text style={styles.lbByName}>{selectedPhoto.uploaderName?.trim() || t('common.anonymous')}</Text></Text>
              {selectedIndex >= 0 && <Text style={styles.lbCount}>{selectedIndex + 1} / {photos.length}</Text>}
            </View>
          )}

          <View style={[styles.lightboxBar, { paddingBottom: insets.bottom + spacing.lg }]}>
            <TouchableOpacity
              onPress={() => selectedPhoto && handleSavePhoto(selectedPhoto)}
              style={styles.lbAction}
              disabled={saving}
            >
              <Icon name="download" size={22} color="#fff" />
              <Text style={styles.lbActionText}>{saving ? t('common.loading') : t('common.download')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => selectedPhoto && handleDeletePhoto(selectedPhoto)}
              style={styles.lbAction}
            >
              <Icon name="trash" size={22} color={colors.error} />
              <Text style={[styles.lbActionText, { color: colors.error }]}>{t('common.delete')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingBottom: spacing.md,
    borderBottomWidth: 1, borderBottomColor: colors.border.subtle,
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  backText: { color: colors.text.secondary, fontSize: typography.sizes.base },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.text.primary },
  qrLink: { color: colors.brand.DEFAULT, fontSize: typography.sizes.base, fontWeight: typography.weights.semibold },
  statsBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',
    paddingVertical: spacing.md, marginHorizontal: spacing.lg,
    backgroundColor: colors.bg.card, borderRadius: radius.xl,
    marginTop: spacing.md, borderWidth: 1, borderColor: colors.border.DEFAULT,
  },
  statItem: { alignItems: 'center', gap: 2 },
  statValue: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.brand.DEFAULT },
  statLabel: { fontSize: typography.sizes.xs, color: colors.text.muted },
  statDivider: { width: 1, height: 32, backgroundColor: colors.border.subtle },
  liveIndicator: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success },
  liveDotEnded: { backgroundColor: colors.text.muted },
  upgradeRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.sm, paddingVertical: 12, paddingHorizontal: spacing.sm, borderRadius: radius.lg, borderWidth: 1, borderColor: 'rgba(154,118,52,0.35)', backgroundColor: 'rgba(154,118,52,0.08)' },
  endBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: spacing.sm, paddingVertical: 12, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.error + '55', backgroundColor: colors.error + '0F' },
  endBtnText: { fontSize: typography.sizes.sm, fontFamily: fonts.bodySemibold, color: colors.error },
  endedRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: spacing.sm, paddingVertical: 10 },
  endedText: { fontSize: typography.sizes.sm, fontFamily: fonts.bodyMedium, color: colors.text.muted },
  grid: { padding: spacing.lg, gap: spacing.sm },
  settingsCard: { backgroundColor: colors.bg.card, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border.DEFAULT, padding: spacing.md, gap: spacing.sm, marginBottom: spacing.lg },
  settingsTitle: { fontSize: typography.sizes.base, fontFamily: fonts.displayBold, color: colors.text.primary, marginBottom: spacing.xs },
  settingRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm },
  settingLabel: { flex: 1, fontSize: typography.sizes.sm, fontFamily: fonts.bodyMedium, color: colors.text.primary },
  settingDesc: { fontSize: typography.sizes.xs, fontFamily: fonts.body, color: colors.text.muted, marginTop: 1 },
  settingSub: { fontSize: typography.sizes.sm, fontFamily: fonts.bodyMedium, color: colors.text.secondary, marginTop: spacing.sm },
  modeRadio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: colors.border.DEFAULT, alignItems: 'center', justifyContent: 'center' },
  modeRadioActive: { borderColor: colors.brand.DEFAULT },
  modeRadioDot: { width: 11, height: 11, borderRadius: 6, backgroundColor: colors.brand.DEFAULT },
  reminderRow: { flexDirection: 'row', gap: spacing.sm },
  reminderChip: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border.DEFAULT },
  reminderChipActive: { borderColor: colors.brand.DEFAULT, backgroundColor: colors.brand.glow },
  reminderText: { fontSize: typography.sizes.xs, fontFamily: fonts.body, color: colors.text.muted },
  reminderTextActive: { color: colors.brand.DEFAULT, fontFamily: fonts.bodySemibold },
  toggle: { width: 44, height: 26, borderRadius: 13, backgroundColor: colors.bg.elevated, borderWidth: 1, borderColor: colors.border.DEFAULT, justifyContent: 'center', padding: 2 },
  toggleOn: { backgroundColor: colors.brand.DEFAULT, borderColor: colors.brand.DEFAULT },
  toggleThumb: { width: 20, height: 20, borderRadius: 10, backgroundColor: colors.text.muted },
  toggleThumbOn: { backgroundColor: '#fff', marginLeft: 18 },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  sectionHead: { marginBottom: spacing.md, gap: spacing.sm },
  sectionTitle: { fontSize: typography.sizes.base, fontFamily: fonts.displayBold, color: colors.text.primary },
  downloadAllBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  downloadAllText: { fontSize: typography.sizes.sm, fontFamily: fonts.bodySemibold, color: colors.brand.DEFAULT },
  photoCell: { width: PHOTO_W, height: PHOTO_H, borderRadius: radius.md, overflow: 'hidden', margin: spacing.xs / 2 },
  photo: { width: '100%', height: '100%', backgroundColor: colors.border.subtle },
  skeletonGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  headActions: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: spacing.md },
  selOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'flex-end', justifyContent: 'flex-start', padding: 8 },
  selOverlayOn: { borderWidth: 3, borderColor: colors.brand.DEFAULT, borderRadius: radius.md, backgroundColor: 'rgba(190,106,46,0.18)' },
  selCheck: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#fff', backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center' },
  selCheckOn: { backgroundColor: colors.brand.DEFAULT, borderColor: '#fff' },
  selBar: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  selBarBtn: { borderRadius: radius.xl, overflow: 'hidden', height: 54 },
  selBarGradient: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  selBarText: { color: '#fff', fontSize: typography.sizes.base, fontFamily: fonts.bodySemibold },
  playBadge: { position: 'absolute', top: 6, left: 6, width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.55)', alignItems: 'center', justifyContent: 'center' },
  flagBadge: { position: 'absolute', bottom: 6, left: 6, right: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, backgroundColor: 'rgba(190,46,46,0.92)', borderRadius: radius.sm, paddingVertical: 3 },
  flagText: { color: '#fff', fontSize: 10, fontFamily: fonts.bodyBold },
  lightbox: { flex: 1, backgroundColor: 'rgba(0,0,0,0.96)', alignItems: 'center', justifyContent: 'center' },
  lightboxImage: { width: '100%', height: '78%' },
  lightboxTop: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: spacing.lg },
  lbBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  lightboxBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', gap: spacing['2xl'], paddingTop: spacing.lg },
  lbAction: { alignItems: 'center', gap: 6 },
  lbActionText: { color: '#fff', fontSize: typography.sizes.sm, fontFamily: fonts.bodyMedium },
  lbNav: { position: 'absolute', top: '46%', width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  lbNavLeft: { left: spacing.md },
  lbNavRight: { right: spacing.md },
  lbCaption: { position: 'absolute', left: 0, right: 0, alignItems: 'center', gap: 3 },
  lbBy: { color: 'rgba(255,255,255,0.7)', fontSize: typography.sizes.sm, fontFamily: fonts.body },
  lbByName: { color: '#fff', fontFamily: fonts.bodySemibold },
  lbCount: { color: 'rgba(255,255,255,0.5)', fontSize: typography.sizes.xs, fontFamily: fonts.body },
  empty: { alignItems: 'center', gap: spacing.sm, paddingTop: spacing['2xl'] },
  emptyIconWrap: { width: 88, height: 88, borderRadius: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.brand.glow, borderWidth: 1, borderColor: colors.border.brand },
  emptyText: { fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.text.primary },
  emptySubText: { fontSize: typography.sizes.sm, color: colors.text.muted, textAlign: 'center' },
});
