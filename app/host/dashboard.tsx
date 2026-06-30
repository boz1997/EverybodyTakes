import { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  RefreshControl, Image, Alert,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { dateLocale } from '@shared/utils/dateLocale';
import { useAuthStore } from '@store/authStore';
import { EventService, Event } from '@features/events/services/eventService';
import { deleteEventCompletely } from '@features/events/services/eventLifecycle';
import { Icon, EVENT_TYPE_ICON } from '@shared/components/Icon';
import { CreateEventArt } from '@shared/components/RoleArt';
import { registerPushTokenForUser } from '@shared/notifications';
import { EventType } from '@store/eventStore';
import { colors, typography, spacing, radius, fonts, gradients } from '@constants/theme';

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

  // Register this device for host push (new-photo notifications).
  useEffect(() => { if (user) registerPushTokenForUser(user.uid); }, [user]);

  const confirmDelete = (item: Event) => {
    Alert.alert(t('host.deleteEvent'), t('host.deleteEventConfirm', { name: item.name }), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          setEvents((prev) => prev.filter((e) => e.id !== item.id));
          await deleteEventCompletely(item.id).catch(() => load());
        },
      },
    ]);
  };

  const renderEvent = ({ item }: { item: Event }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({ pathname: '/host/event', params: { id: item.id } })}
      onLongPress={() => confirmDelete(item)}
      activeOpacity={0.85}
    >
      <LinearGradient
        colors={['rgba(190,106,46,0.07)', 'transparent']}
        style={styles.cardGradient}
      >
        {item.coverImageUrl ? (
          <Image source={{ uri: item.coverImageUrl }} style={styles.cardCover} />
        ) : (
          <View style={[styles.cardCover, styles.cardCoverEmpty]}>
            <Icon name={EVENT_TYPE_ICON[item.type as EventType] ?? 'party'} size={32} color={colors.brand.light} strokeWidth={1.6} />
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
            {item.date ? format(new Date(item.date), 'd MMM yyyy', { locale: dateLocale() }) : '—'}
          </Text>

          <View style={styles.cardStats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{item.photoCount}</Text>
              <Text style={styles.statLabel}>{t('host.photoCount', { count: '' }).trim()}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{item.guestCount}</Text>
              <Text style={styles.statLabel}>{t('host.guestsLabel')}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{item.shotsPerGuest}</Text>
              <Text style={styles.statLabel}>{t('host.shotsPerGuestShort')}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={gradients.page} style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <TouchableOpacity onPress={() => router.replace('/')} activeOpacity={0.7}>
          <Text style={styles.greeting}>GuestCam</Text>
          <Text style={styles.headerTitle}>{t('host.dashboard')}</Text>
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={() => router.push('/settings')}
            style={styles.joinBtn}
            activeOpacity={0.8}
          >
            <Icon name="settings" size={20} color={colors.text.secondary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/host/create')} style={styles.createBtn} activeOpacity={0.85}>
            <LinearGradient colors={gradients.amber} style={styles.createBtnGradient}>
              <Icon name="plus" size={16} color="#fff" strokeWidth={2.6} />
              <Text style={styles.createBtnText}>{t('host.createEvent')}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
              <View style={styles.emptyIconWrap}>
                <CreateEventArt size={64} />
              </View>
              <Text style={styles.emptyTitle}>{t('host.noEvents')}</Text>
              <Text style={styles.emptySubtitle}>{t('host.noEventsSubtitle')}</Text>
              <TouchableOpacity onPress={() => router.push('/host/create')} style={styles.emptyBtn} activeOpacity={0.85}>
                <LinearGradient colors={gradients.amber} style={styles.emptyBtnGradient}>
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
  headerTitle: { fontSize: typography.sizes['2xl'], fontFamily: fonts.displayBold, color: colors.text.primary },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  joinBtn: { width: 44, height: 44, borderRadius: radius.lg, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border.DEFAULT, backgroundColor: colors.bg.card },
  createBtn: { borderRadius: radius.xl, overflow: 'hidden' },
  createBtnGradient: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: spacing.md, paddingVertical: 10 },
  createBtnText: { color: '#fff', fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold },
  list: { padding: spacing.lg, gap: spacing.md },
  listEmpty: { flex: 1, justifyContent: 'center' },
  card: { borderRadius: radius['2xl'], overflow: 'hidden', borderWidth: 1, borderColor: colors.border.DEFAULT },
  cardGradient: { padding: spacing.md, gap: spacing.md },
  cardCover: { width: '100%', height: 140, borderRadius: radius.lg, backgroundColor: colors.bg.elevated },
  cardCoverEmpty: { alignItems: 'center', justifyContent: 'center' },
  cardContent: { gap: spacing.sm },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardName: { fontSize: typography.sizes.lg, fontFamily: fonts.displayBold, color: colors.text.primary, flex: 1 },
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
  emptyIconWrap: { width: 96, height: 96, borderRadius: 48, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.brand.glow, borderWidth: 1, borderColor: colors.border.brand },
  emptyTitle: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.text.primary },
  emptySubtitle: { fontSize: typography.sizes.sm, color: colors.text.muted, textAlign: 'center' },
  emptyBtn: { borderRadius: radius.xl, overflow: 'hidden', marginTop: spacing.sm },
  emptyBtnGradient: { paddingHorizontal: spacing.xl, paddingVertical: 14 },
  emptyBtnText: { color: '#fff', fontSize: typography.sizes.base, fontWeight: typography.weights.semibold },
});
