import { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  RefreshControl, Image,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { tr as trLocale } from 'date-fns/locale';
import { useAuthStore } from '@store/authStore';
import { EventService, Event } from '@features/events/services/eventService';
import { colors, typography, spacing, radius } from '@constants/theme';

export default function HostDashboard() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { user } = useAuthStore();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    if (!user) return;
    try {
      const data = await EventService.getHostEvents(user.uid);
      setEvents(data);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { load(); }, [user]);

  const renderEvent = ({ item }: { item: Event }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({ pathname: '/host/event', params: { id: item.id } })}
      activeOpacity={0.85}
    >
      <LinearGradient
        colors={['rgba(168,85,247,0.08)', 'transparent']}
        style={styles.cardGradient}
      >
        {item.coverImageUrl ? (
          <Image source={{ uri: item.coverImageUrl }} style={styles.cardCover} />
        ) : (
          <View style={[styles.cardCover, styles.cardCoverEmpty]}>
            <Text style={{ fontSize: 28 }}>
              {item.type === 'wedding' ? '💍' : item.type === 'birthday' ? '🎂' : item.type === 'yacht' ? '⛵' : item.type === 'club' ? '🎵' : '🎉'}
            </Text>
          </View>
        )}

        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
            <View style={[styles.badge, item.isActive ? styles.badgeActive : styles.badgePast]}>
              <Text style={styles.badgeText}>{item.isActive ? '● Live' : 'Ended'}</Text>
            </View>
          </View>

          <Text style={styles.cardDate}>
            {item.date ? format(new Date(item.date), 'd MMM yyyy', { locale: trLocale }) : '—'}
          </Text>

          <View style={styles.cardStats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{item.photoCount}</Text>
              <Text style={styles.statLabel}>{t('host.photoCount', { count: '' }).trim()}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{item.guestCount}</Text>
              <Text style={styles.statLabel}>misafir</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{item.shotsPerGuest}</Text>
              <Text style={styles.statLabel}>çekim/kişi</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#0A0A0F', '#13131A']} style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <View>
          <Text style={styles.greeting}>GuestCam</Text>
          <Text style={styles.headerTitle}>{t('host.dashboard')}</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/host/create')} style={styles.createBtn} activeOpacity={0.85}>
          <LinearGradient colors={['#A855F7', '#7C3AED']} style={styles.createBtnGradient}>
            <Text style={styles.createBtnText}>+ {t('host.createEvent')}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <FlatList
        data={events}
        keyExtractor={(e) => e.id}
        renderItem={renderEvent}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: insets.bottom + spacing.xl },
          events.length === 0 && styles.listEmpty,
        ]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); load(); }} tintColor={colors.brand.DEFAULT} />
        }
        ListEmptyComponent={
          !loading ? (
            <View style={styles.empty}>
              <Text style={styles.emptyEmoji}>📷</Text>
              <Text style={styles.emptyTitle}>{t('host.noEvents')}</Text>
              <Text style={styles.emptySubtitle}>{t('host.noEventsSubtitle')}</Text>
              <TouchableOpacity onPress={() => router.push('/host/create')} style={styles.emptyBtn} activeOpacity={0.85}>
                <LinearGradient colors={['#A855F7', '#7C3AED']} style={styles.emptyBtnGradient}>
                  <Text style={styles.emptyBtnText}>{t('host.createEvent')}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : null
        }
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  greeting: { fontSize: typography.sizes.xs, color: colors.brand.DEFAULT, fontWeight: typography.weights.semibold, letterSpacing: 1 },
  headerTitle: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.text.primary },
  createBtn: { borderRadius: radius.xl, overflow: 'hidden' },
  createBtnGradient: { paddingHorizontal: spacing.md, paddingVertical: 10 },
  createBtnText: { color: '#fff', fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold },
  list: { padding: spacing.lg, gap: spacing.md },
  listEmpty: { flex: 1, justifyContent: 'center' },
  card: { borderRadius: radius['2xl'], overflow: 'hidden', borderWidth: 1, borderColor: colors.border.DEFAULT },
  cardGradient: { padding: spacing.md, gap: spacing.md },
  cardCover: { width: '100%', height: 140, borderRadius: radius.lg, backgroundColor: colors.bg.elevated },
  cardCoverEmpty: { alignItems: 'center', justifyContent: 'center' },
  cardContent: { gap: spacing.sm },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardName: { fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, color: colors.text.primary, flex: 1 },
  badge: { borderRadius: radius.full, paddingHorizontal: 10, paddingVertical: 4 },
  badgeActive: { backgroundColor: 'rgba(34,197,94,0.15)' },
  badgePast: { backgroundColor: colors.bg.elevated },
  badgeText: { fontSize: typography.sizes.xs, fontWeight: typography.weights.semibold, color: colors.success },
  cardDate: { fontSize: typography.sizes.sm, color: colors.text.muted },
  cardStats: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.xs },
  stat: { alignItems: 'center', gap: 2 },
  statValue: { fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: colors.brand.DEFAULT },
  statLabel: { fontSize: typography.sizes.xs, color: colors.text.muted },
  statDivider: { width: 1, height: 28, backgroundColor: colors.border.subtle },
  empty: { alignItems: 'center', gap: spacing.md, paddingVertical: spacing['3xl'] },
  emptyEmoji: { fontSize: 64 },
  emptyTitle: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.text.primary },
  emptySubtitle: { fontSize: typography.sizes.sm, color: colors.text.muted, textAlign: 'center' },
  emptyBtn: { borderRadius: radius.xl, overflow: 'hidden', marginTop: spacing.sm },
  emptyBtnGradient: { paddingHorizontal: spacing.xl, paddingVertical: 14 },
  emptyBtnText: { color: '#fff', fontSize: typography.sizes.base, fontWeight: typography.weights.semibold },
});
