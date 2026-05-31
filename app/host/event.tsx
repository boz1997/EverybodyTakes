import { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList, Image,
  Alert, Dimensions, Modal, StatusBar,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system/legacy';
import { EventService, Event, Photo } from '@features/events/services/eventService';
import { Icon } from '@shared/components/Icon';
import { colors, typography, spacing, radius, fonts, gradients } from '@constants/theme';

const { width } = Dimensions.get('window');
const PHOTO_SIZE = (width - spacing.lg * 2 - spacing.sm * 2) / 3;

export default function EventManage() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [event, setEvent] = useState<Event | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    EventService.getById(id).then(setEvent);
    const unsub = EventService.subscribeToPhotos(id, setPhotos);
    return unsub;
  }, [id]);

  // Host-editable settings — optimistic local update + persist.
  const patchSettings = (patch: Partial<Event>) => {
    if (!event) return;
    setEvent({ ...event, ...patch });
    EventService.updateSettings(event.id, patch as any).catch(() => setEvent(event));
  };

  const REMINDERS: { key: '1h' | '24h' | null; labelKey: string }[] = [
    { key: null, labelKey: 'host.noReminder' },
    { key: '1h', labelKey: 'host.reminder1h' },
    { key: '24h', labelKey: 'host.reminder24h' },
  ];

  const renderSettings = () => {
    if (!event) return null;
    return (
      <View style={styles.settingsCard}>
        <Text style={styles.settingsTitle}>{t('host.eventSettings')}</Text>

        <TouchableOpacity
          style={styles.settingRow}
          onPress={() => patchSettings({ disposableMode: !event.disposableMode })}
          activeOpacity={0.8}
        >
          <Icon name="film" size={20} color={event.disposableMode ? colors.brand.DEFAULT : colors.text.muted} />
          <Text style={styles.settingLabel}>{t('host.disposableMode')}</Text>
          <View style={[styles.toggle, event.disposableMode && styles.toggleOn]}>
            <View style={[styles.toggleThumb, event.disposableMode && styles.toggleThumbOn]} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingRow}
          onPress={() => patchSettings({ allowGalleryUpload: !event.allowGalleryUpload })}
          activeOpacity={0.8}
        >
          <Icon name="image" size={20} color={event.allowGalleryUpload ? colors.brand.DEFAULT : colors.text.muted} />
          <Text style={styles.settingLabel}>{t('host.allowGalleryUpload')}</Text>
          <View style={[styles.toggle, event.allowGalleryUpload && styles.toggleOn]}>
            <View style={[styles.toggleThumb, event.allowGalleryUpload && styles.toggleThumbOn]} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingRow}
          onPress={() => patchSettings({ galleryVisibility: event.galleryVisibility === 'host_only' ? 'everyone' : 'host_only' })}
          activeOpacity={0.8}
        >
          <Icon name="lock" size={20} color={event.galleryVisibility === 'host_only' ? colors.brand.DEFAULT : colors.text.muted} />
          <View style={{ flex: 1 }}>
            <Text style={styles.settingLabel}>{t('host.hostOnlyGallery')}</Text>
            <Text style={styles.settingDesc}>{t('host.hostOnlyGalleryDesc')}</Text>
          </View>
          <View style={[styles.toggle, event.galleryVisibility === 'host_only' && styles.toggleOn]}>
            <View style={[styles.toggleThumb, event.galleryVisibility === 'host_only' && styles.toggleThumbOn]} />
          </View>
        </TouchableOpacity>

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

  const saveOne = async (photo: Photo) => {
    const target = FileSystem.cacheDirectory + `${photo.id}.jpg`;
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

  const handleDownloadAll = async () => {
    if (photos.length === 0 || saving) return;
    try {
      setSaving(true);
      const perm = await MediaLibrary.requestPermissionsAsync();
      if (!perm.granted) { Alert.alert(t('errors.cameraPermission')); return; }
      let done = 0;
      let lastErr: unknown = null;
      for (const p of photos) {
        try { await saveOne(p); done += 1; } catch (e) { lastErr = e; }
      }
      if (done === 0 && lastErr) Alert.alert(t('common.error'), String((lastErr as any)?.message ?? lastErr));
      else Alert.alert(t('host.downloadAllDone', { count: done }));
    } finally {
      setSaving(false);
    }
  };

  const renderPhoto = ({ item }: { item: Photo }) => (
    <TouchableOpacity
      onPress={() => setSelectedPhoto(item)}
      style={styles.photoCell}
      activeOpacity={0.85}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.photo} />
    </TouchableOpacity>
  );

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
            <Text style={styles.statValue}>{photos.length}</Text>
            <Text style={styles.statLabel}>{t('gallery.photos')}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{event.guestCount}</Text>
            <Text style={styles.statLabel}>misafir</Text>
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
        numColumns={3}
        contentContainerStyle={[styles.grid, { paddingBottom: insets.bottom + spacing.xl }]}
        ListHeaderComponent={
          <>
            {renderSettings()}
            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>{t('host.livePhotos')} ({photos.length})</Text>
              {photos.length > 0 && (
                <TouchableOpacity onPress={handleDownloadAll} style={styles.downloadAllBtn} disabled={saving} activeOpacity={0.7}>
                  <Icon name="download" size={15} color={colors.brand.DEFAULT} />
                  <Text style={styles.downloadAllText}>{t('host.downloadAll')}</Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <View style={styles.emptyIconWrap}>
              <Icon name="camera" size={32} color={colors.brand.light} strokeWidth={1.6} />
            </View>
            <Text style={styles.emptyText}>Henüz fotoğraf yok</Text>
            <Text style={styles.emptySubText}>Misafirlerin fotoğraf çektikçe burada görünür</Text>
          </View>
        }
      />

      {/* Photo lightbox — view, save, delete */}
      <Modal visible={!!selectedPhoto} transparent animationType="fade" onRequestClose={() => setSelectedPhoto(null)} statusBarTranslucent>
        <View style={styles.lightbox}>
          <StatusBar barStyle="light-content" />
          {selectedPhoto && (
            <Image source={{ uri: selectedPhoto.imageUrl }} style={StyleSheet.absoluteFill} resizeMode="contain" />
          )}
          <View style={[styles.lightboxTop, { paddingTop: insets.top + spacing.sm }]}>
            <TouchableOpacity onPress={() => setSelectedPhoto(null)} style={styles.lbBtn}>
              <Icon name="close" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
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
  sectionTitle: { fontSize: typography.sizes.base, fontFamily: fonts.displayBold, color: colors.text.primary },
  downloadAllBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  downloadAllText: { fontSize: typography.sizes.sm, fontFamily: fonts.bodySemibold, color: colors.brand.DEFAULT },
  photoCell: { width: PHOTO_SIZE, height: PHOTO_SIZE, borderRadius: radius.md, overflow: 'hidden', margin: spacing.xs / 2 },
  photo: { width: '100%', height: '100%' },
  lightbox: { flex: 1, backgroundColor: 'rgba(0,0,0,0.96)', alignItems: 'center', justifyContent: 'center' },
  lightboxImage: { width: '100%', height: '78%' },
  lightboxTop: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: spacing.lg },
  lbBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  lightboxBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', gap: spacing['2xl'], paddingTop: spacing.lg },
  lbAction: { alignItems: 'center', gap: 6 },
  lbActionText: { color: '#fff', fontSize: typography.sizes.sm, fontFamily: fonts.bodyMedium },
  empty: { alignItems: 'center', gap: spacing.sm, paddingTop: spacing['2xl'] },
  emptyIconWrap: { width: 88, height: 88, borderRadius: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.brand.glow, borderWidth: 1, borderColor: colors.border.brand },
  emptyText: { fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.text.primary },
  emptySubText: { fontSize: typography.sizes.sm, color: colors.text.muted, textAlign: 'center' },
});
