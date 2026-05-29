import { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, Image, TouchableOpacity,
  Dimensions, Modal, StatusBar,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { format } from 'date-fns';
import { EventService, Photo, Event } from '@features/events/services/eventService';
import { useAuthStore } from '@store/authStore';
import { Icon } from '@shared/components/Icon';
import { colors, typography, spacing, radius, fonts, gradients } from '@constants/theme';

// Reveal gating: photos may be hidden until the event ends or 24h later.
function revealAtMs(e: Event): number {
  const ends = e.endsAt ? Date.parse(e.endsAt) : 0;
  if (e.revealTiming === 'after_event') return ends;
  if (e.revealTiming === '24h') return ends + 24 * 60 * 60 * 1000;
  return 0;
}

function isRevealed(e: Event | null): boolean {
  if (!e || e.revealTiming === 'instant') return true;
  return Date.now() >= revealAtMs(e);
}

const { width } = Dimensions.get('window');
const PHOTO_SIZE = (width - spacing.lg * 2 - spacing.xs * 2) / 3;

export default function GalleryScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuthStore();

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [event, setEvent] = useState<Event | null>(null);
  const [selected, setSelected] = useState<Photo | null>(null);
  const [filter, setFilter] = useState<'all' | 'mine'>('all');

  useEffect(() => {
    if (!id) return;
    EventService.getById(id).then(setEvent);
    const unsub = EventService.subscribeToPhotos(id, setPhotos);
    return unsub;
  }, [id]);

  const revealed = isRevealed(event);

  const filtered = filter === 'mine'
    ? photos.filter((p) => p.uploadedBy === user?.uid)
    : photos;

  const renderPhoto = ({ item, index }: { item: Photo; index: number }) => (
    <Animated.View entering={FadeIn.delay(index * 30)}>
      <TouchableOpacity
        onPress={() => { setSelected(item); Haptics.selectionAsync(); }}
        style={styles.photoCell}
        activeOpacity={0.9}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.photo} />
        {item.uploadedBy === user?.uid && (
          <View style={styles.myBadge}>
            <Icon name="check" size={11} color="#fff" strokeWidth={3} />
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <LinearGradient colors={gradients.page} style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Icon name="arrowLeft" size={24} color={colors.text.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('gallery.title')}</Text>
        <Text style={styles.photoCount}>{photos.length}</Text>
      </View>

      {!revealed ? (
        /* Reveal-timing lock — photos are developing */
        <Animated.View entering={FadeInDown} style={styles.locked}>
          <View style={styles.lockedIconWrap}>
            <Icon name="film" size={40} color={colors.brand.DEFAULT} strokeWidth={1.6} />
          </View>
          <Text style={styles.lockedTitle}>{t('guest.developing')}</Text>
          <Text style={styles.lockedDesc}>
            {event?.revealTiming === '24h' ? t('guest.galleryLockedDesc') : t('guest.developingDesc')}
          </Text>
          {event && (
            <View style={styles.opensPill}>
              <Icon name="film" size={14} color={colors.brand.DEFAULT} />
              <Text style={styles.opensText}>
                {t('guest.opensAt', { time: format(new Date(revealAtMs(event)), 'd MMM HH:mm') })}
              </Text>
            </View>
          )}
        </Animated.View>
      ) : (
        <>
          {/* Filter */}
          <View style={styles.filterRow}>
            <TouchableOpacity
              style={[styles.filterChip, filter === 'all' && styles.filterChipActive]}
              onPress={() => setFilter('all')}
            >
              <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
                {t('gallery.allPhotos')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterChip, filter === 'mine' && styles.filterChipActive]}
              onPress={() => setFilter('mine')}
            >
              <Text style={[styles.filterText, filter === 'mine' && styles.filterTextActive]}>
                {t('gallery.myPhotos')}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Grid */}
          <FlatList
            data={filtered}
            keyExtractor={(p) => p.id}
            renderItem={renderPhoto}
            numColumns={3}
            contentContainerStyle={[styles.grid, { paddingBottom: insets.bottom + spacing.xl }]}
            ListEmptyComponent={
              <Animated.View entering={FadeInDown} style={styles.empty}>
                <View style={styles.emptyIconWrap}>
                  <Icon name="camera" size={36} color={colors.brand.light} strokeWidth={1.6} />
                </View>
                <Text style={styles.emptyTitle}>{t('gallery.empty')}</Text>
                <Text style={styles.emptySubtitle}>{t('gallery.emptySubtitle')}</Text>
              </Animated.View>
            }
          />
        </>
      )}

      {/* Lightbox Modal */}
      <Modal
        visible={!!selected}
        transparent
        animationType="fade"
        onRequestClose={() => setSelected(null)}
        statusBarTranslucent
      >
        <TouchableOpacity
          style={styles.lightbox}
          onPress={() => setSelected(null)}
          activeOpacity={1}
        >
          <StatusBar barStyle="light-content" />
          {selected && (
            <>
              <Image
                source={{ uri: selected.imageUrl }}
                style={styles.lightboxImage}
                resizeMode="contain"
              />
              <View style={[styles.lightboxMeta, { paddingBottom: insets.bottom + spacing.lg }]}>
                {selected.uploaderName && (
                  <Text style={styles.lightboxUploader}>
                    {t('gallery.by')} {selected.uploaderName}
                  </Text>
                )}
                <View style={styles.lightboxClose}>
                  <Icon name="close" size={14} color="rgba(255,255,255,0.5)" />
                  <Text style={styles.lightboxCloseText}>{t('common.close')}</Text>
                </View>
              </View>
            </>
          )}
        </TouchableOpacity>
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
  backBtn: { width: 32, height: 32, justifyContent: 'center' },
  headerTitle: { fontSize: typography.sizes.xl, fontFamily: fonts.displayBold, color: colors.text.primary },
  photoCount: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, color: colors.brand.DEFAULT },
  filterRow: { flexDirection: 'row', gap: spacing.sm, padding: spacing.lg, paddingBottom: spacing.sm },
  filterChip: { paddingHorizontal: spacing.lg, paddingVertical: 8, borderRadius: radius.full, borderWidth: 1, borderColor: colors.border.DEFAULT, backgroundColor: colors.bg.card },
  filterChipActive: { borderColor: colors.brand.DEFAULT, backgroundColor: colors.brand.glow },
  filterText: { fontSize: typography.sizes.sm, color: colors.text.muted },
  filterTextActive: { color: colors.brand.DEFAULT, fontWeight: typography.weights.semibold },
  grid: { paddingHorizontal: spacing.lg, gap: spacing.xs },
  photoCell: { width: PHOTO_SIZE, height: PHOTO_SIZE, borderRadius: radius.md, overflow: 'hidden', margin: spacing.xs / 2 },
  photo: { width: '100%', height: '100%' },
  myBadge: { position: 'absolute', top: 6, right: 6, width: 20, height: 20, borderRadius: 10, backgroundColor: colors.brand.DEFAULT, alignItems: 'center', justifyContent: 'center' },
  locked: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md, paddingHorizontal: spacing.xl },
  lockedIconWrap: { width: 96, height: 96, borderRadius: 48, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.brand.glow, borderWidth: 1, borderColor: colors.border.brand },
  lockedTitle: { fontSize: typography.sizes.xl, fontFamily: fonts.displayBold, color: colors.text.primary, textAlign: 'center' },
  lockedDesc: { fontSize: typography.sizes.sm, fontFamily: fonts.body, color: colors.text.muted, textAlign: 'center', lineHeight: 20 },
  opensPill: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.brand.glow, borderRadius: radius.full, paddingHorizontal: spacing.md, paddingVertical: 8, borderWidth: 1, borderColor: colors.border.brand, marginTop: spacing.xs },
  opensText: { fontSize: typography.sizes.sm, fontFamily: fonts.bodySemibold, color: colors.brand.dark },
  empty: { alignItems: 'center', gap: spacing.md, paddingTop: spacing['3xl'] },
  emptyIconWrap: { width: 96, height: 96, borderRadius: 48, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.brand.glow, borderWidth: 1, borderColor: colors.border.brand },
  emptyTitle: { fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: colors.text.primary },
  emptySubtitle: { fontSize: typography.sizes.sm, color: colors.text.muted },
  lightbox: { flex: 1, backgroundColor: 'rgba(0,0,0,0.95)', alignItems: 'center', justifyContent: 'center' },
  lightboxImage: { width, height: width, maxHeight: '80%' },
  lightboxMeta: { position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center', gap: spacing.sm },
  lightboxUploader: { color: 'rgba(255,255,255,0.6)', fontSize: typography.sizes.sm },
  lightboxClose: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  lightboxCloseText: { color: 'rgba(255,255,255,0.5)', fontSize: typography.sizes.sm },
});
