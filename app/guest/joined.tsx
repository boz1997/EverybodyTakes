import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { getJoinedEvents, removeJoinedEvent, JoinedEvent } from '@store/guestEvents';
import { Icon, EVENT_TYPE_ICON } from '@shared/components/Icon';
import { EventType } from '@store/eventStore';
import { colors, typography, spacing, radius, fonts, gradients } from '@constants/theme';

export default function JoinedEventsScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [events, setEvents] = useState<JoinedEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJoinedEvents().then((e) => { setEvents(e); setLoading(false); });
  }, []);

  const confirmRemove = (item: JoinedEvent) => {
    Alert.alert(item.name, t('guest.removeJoinedConfirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          setEvents((prev) => prev.filter((e) => e.id !== item.id));
          await removeJoinedEvent(item.id);
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: JoinedEvent }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({ pathname: '/guest/join', params: { code: item.code } })}
      onLongPress={() => confirmRemove(item)}
      activeOpacity={0.85}
    >
      {item.coverImageUrl ? (
        <Image source={{ uri: item.coverImageUrl }} style={styles.cover} />
      ) : (
        <View style={[styles.cover, styles.coverEmpty]}>
          <Icon name={EVENT_TYPE_ICON[item.type as EventType] ?? 'party'} size={24} color={colors.brand.light} />
        </View>
      )}
      <View style={styles.cardText}>
        <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.cardCode}>{item.code}</Text>
      </View>
      <Icon name="arrowRight" size={18} color={colors.text.muted} />
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={gradients.page} style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Icon name="arrowLeft" size={24} color={colors.text.secondary} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('guest.myEvents')}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => router.push('/settings')} style={styles.joinBtn} activeOpacity={0.8}>
            <Icon name="settings" size={20} color={colors.text.secondary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.replace('/guest/scan')} style={styles.joinBtn} activeOpacity={0.8}>
            <Icon name="qr" size={20} color={colors.brand.DEFAULT} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={events}
        keyExtractor={(e) => e.id}
        renderItem={renderItem}
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + spacing.xl }, events.length === 0 && styles.listEmpty]}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.empty}>
              <View style={styles.emptyIcon}>
                <Icon name="qr" size={32} color={colors.brand.light} strokeWidth={1.6} />
              </View>
              <Text style={styles.emptyTitle}>{t('guest.noJoinedEvents')}</Text>
              <Text style={styles.emptySub}>{t('guest.noJoinedEventsHint')}</Text>
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
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingBottom: spacing.md,
    borderBottomWidth: 1, borderBottomColor: colors.border.subtle,
  },
  backBtn: { width: 32, height: 32, justifyContent: 'center' },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  joinBtn: { width: 36, height: 36, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border.brand, backgroundColor: colors.brand.glow },
  title: { fontSize: typography.sizes.lg, fontFamily: fonts.displayBold, color: colors.text.primary },
  list: { padding: spacing.lg, gap: spacing.sm },
  listEmpty: { flex: 1, justifyContent: 'center' },
  card: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: colors.bg.card, borderRadius: radius.xl,
    borderWidth: 1, borderColor: colors.border.DEFAULT, padding: spacing.sm,
  },
  cover: { width: 52, height: 52, borderRadius: radius.md, backgroundColor: colors.bg.elevated },
  coverEmpty: { alignItems: 'center', justifyContent: 'center' },
  cardText: { flex: 1, gap: 2 },
  cardName: { fontSize: typography.sizes.base, fontFamily: fonts.bodySemibold, color: colors.text.primary },
  cardCode: { fontSize: typography.sizes.sm, fontFamily: fonts.body, color: colors.text.muted, letterSpacing: 1 },
  empty: { alignItems: 'center', gap: spacing.md, paddingHorizontal: spacing.xl },
  emptyIcon: { width: 88, height: 88, borderRadius: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.brand.glow, borderWidth: 1, borderColor: colors.border.brand },
  emptyTitle: { fontSize: typography.sizes.lg, fontFamily: fonts.displayBold, color: colors.text.primary },
  emptySub: { fontSize: typography.sizes.sm, fontFamily: fonts.body, color: colors.text.muted, textAlign: 'center' },
});
