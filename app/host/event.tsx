import { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList, Image,
  Alert, Dimensions,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
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

  useEffect(() => {
    if (!id) return;
    EventService.getById(id).then(setEvent);
    const unsub = EventService.subscribeToPhotos(id, setPhotos);
    return unsub;
  }, [id]);

  const handleDeletePhoto = (photo: Photo) => {
    Alert.alert(t('host.deletePhoto'), '?', [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          await EventService.deletePhoto(id!, photo.id);
        },
      },
    ]);
  };

  const renderPhoto = ({ item }: { item: Photo }) => (
    <TouchableOpacity
      onPress={() => setSelectedPhoto(selectedPhoto?.id === item.id ? null : item)}
      style={[styles.photoCell, selectedPhoto?.id === item.id && styles.photoCellSelected]}
      activeOpacity={0.85}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.photo} />
      {selectedPhoto?.id === item.id && (
        <View style={styles.photoOverlay}>
          <TouchableOpacity onPress={() => handleDeletePhoto(item)} style={styles.deleteBtn}>
            <Icon name="trash" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
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
            <Text style={styles.statValue}>{event.photoCount}</Text>
            <Text style={styles.statLabel}>{t('gallery.photos')}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{event.guestCount}</Text>
            <Text style={styles.statLabel}>misafir</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={[styles.statItem, styles.liveIndicator]}>
            <View style={styles.liveDot} />
            <Text style={[styles.statLabel, { color: colors.success }]}>Canlı</Text>
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
          <Text style={styles.sectionTitle}>{t('host.livePhotos')} ({photos.length})</Text>
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
  grid: { padding: spacing.lg, gap: spacing.sm },
  sectionTitle: { fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.text.primary, marginBottom: spacing.md },
  photoCell: { width: PHOTO_SIZE, height: PHOTO_SIZE, borderRadius: radius.md, overflow: 'hidden', margin: spacing.xs / 2 },
  photoCellSelected: { borderWidth: 2, borderColor: colors.brand.DEFAULT },
  photo: { width: '100%', height: '100%' },
  photoOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
  deleteBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(239,68,68,0.8)', alignItems: 'center', justifyContent: 'center' },
  empty: { alignItems: 'center', gap: spacing.sm, paddingTop: spacing['2xl'] },
  emptyIconWrap: { width: 88, height: 88, borderRadius: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.brand.glow, borderWidth: 1, borderColor: colors.border.brand },
  emptyText: { fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.text.primary },
  emptySubText: { fontSize: typography.sizes.sm, color: colors.text.muted, textAlign: 'center' },
});
