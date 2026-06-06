import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import { useEventStore } from '@store/eventStore';
import { useAuthStore } from '@store/authStore';
import { EventService } from '@features/events/services/eventService';
import { PLANS, PAID_PLAN_ORDER, PAID_PLANS_ENABLED, PlanId, Plan, formatPrice } from '@constants/plans';
import { buyProduct, getPriceStrings, restorePurchases, purchasesReady, PurchaseCancelled } from '@features/purchases/purchaseService';
import { PrimaryButton } from '@shared/components/PrimaryButton';
import { Icon, EVENT_TYPE_ICON } from '@shared/components/Icon';
import { colors, typography, spacing, radius, fonts, gradients } from '@constants/theme';

const ORDER: PlanId[] = ['free', ...PAID_PLAN_ORDER];
const POPULAR: PlanId = 'medium';

export default function PaywallScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { draft, setActiveEventId, resetDraft } = useEventStore();
  const { user } = useAuthStore();
  const { upgradeId, current } = useLocalSearchParams<{ upgradeId?: string; current?: string }>();
  const isUpgrade = !!upgradeId;

  // In upgrade mode only show plans strictly above the current one.
  const FULL_ORDER: PlanId[] = ['free', 'small', 'medium', 'unlimited'];
  const higher = current ? FULL_ORDER.slice(FULL_ORDER.indexOf(current as PlanId) + 1) : PAID_PLAN_ORDER;
  // No payments at launch → only the (generous) free plan is offered; never a price.
  const planList: PlanId[] = !PAID_PLANS_ENABLED ? ['free'] : (isUpgrade ? higher : ORDER);

  const [selected, setSelected] = useState<PlanId>(
    !PAID_PLANS_ENABLED ? 'free' : (isUpgrade ? (higher[0] ?? 'unlimited') : 'small'),
  );
  const [loading, setLoading] = useState(false);
  const [priceMap, setPriceMap] = useState<Record<string, string>>({});

  // Pull live localized store prices for the paid products.
  useEffect(() => {
    const ids = PAID_PLAN_ORDER.map((id) => PLANS[id].productId).filter(Boolean) as string[];
    getPriceStrings(ids).then(setPriceMap).catch(() => {});
  }, []);

  // Prefer the live store price; fall back to the reference USD price.
  const priceLabel = (plan: Plan): string =>
    (plan.productId && priceMap[plan.productId]) || formatPrice(plan.priceUSD);

  const featureLines = (plan: Plan): string[] => {
    const lines: string[] = [];
    lines.push(plan.maxGuests == null ? t('paywall.unlimitedGuests') : t('paywall.upToGuests', { n: plan.maxGuests }));
    lines.push(plan.photoCap == null ? t('paywall.unlimitedPhotos') : t('paywall.photoCap', { n: plan.photoCap }));
    lines.push(plan.video ? t('paywall.videoOn') : t('paywall.videoOff'));
    lines.push(plan.watermark ? t('paywall.watermark') : t('paywall.noWatermark'));
    if (plan.hdExport) lines.push(t('paywall.hdExport'));
    if (plan.liveWall) lines.push(t('paywall.liveWall'));
    return lines;
  };

  const handleContinue = async () => {
    if (!user) return;
    try {
      setLoading(true);

      // Paid plan → run the App Store purchase first; abort if it fails/cancels.
      if (PAID_PLANS_ENABLED && selected !== 'free') {
        const plan = PLANS[selected];
        if (plan.productId) {
          if (!purchasesReady()) { Alert.alert(t('paywall.purchaseUnavailable')); return; }
          try {
            await buyProduct(plan.productId);
          } catch (e) {
            if (e instanceof PurchaseCancelled) return;
            Alert.alert(t('common.error'), t('paywall.purchaseFailed'));
            return;
          }
        }
      }
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      if (isUpgrade) {
        await EventService.updatePlan(upgradeId!, selected);
        router.back();
        return;
      }

      const event = await EventService.create(user.uid, draft, selected);
      setActiveEventId(event.id);
      resetDraft();
      // Close the create/paywall modals, then open QR over the dashboard so the
      // host can't navigate back into setup/payment after the event exists.
      router.dismissAll();
      router.push({ pathname: '/host/qr', params: { id: event.id, code: event.shortCode } });
    } catch {
      Alert.alert(t('common.error'), t('errors.unknownError'));
    } finally {
      setLoading(false);
    }
  };

  const selectedPlan = PLANS[selected];

  return (
    <LinearGradient colors={gradients.page} style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + 150 }]}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Icon name="arrowLeft" size={18} color={colors.text.secondary} />
          <Text style={styles.backText}>{t('common.back')}</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>{isUpgrade ? t('paywall.upgradeTitle') : t('paywall.title')}</Text>
          <Text style={styles.subtitle}>{!PAID_PLANS_ENABLED ? t('paywall.freeSubtitle') : (isUpgrade ? t('paywall.upgradeSubtitle') : t('paywall.subtitle'))}</Text>
        </View>

        {/* Event summary pill (create flow only) */}
        {!isUpgrade && (
          <View style={styles.eventPill}>
            <Icon name={EVENT_TYPE_ICON[draft.type]} size={18} color={colors.brand.DEFAULT} />
            <Text style={styles.eventPillName} numberOfLines={1}>{draft.name || 'Etkinlik'}</Text>
            <Text style={styles.eventPillDetail}>{draft.shotsPerGuest} çekim/kişi</Text>
          </View>
        )}

        {/* Plans */}
        <View style={styles.plans}>
          {planList.map((id) => {
            const plan = PLANS[id];
            const active = selected === id;
            return (
              <TouchableOpacity
                key={id}
                onPress={() => { setSelected(id); Haptics.selectionAsync(); }}
                style={[styles.planCard, active && styles.planCardActive]}
                activeOpacity={0.9}
              >
                {id === POPULAR && (
                  <View style={styles.badge}><Text style={styles.badgeText}>{t('paywall.mostPopular')}</Text></View>
                )}
                <View style={styles.planTop}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.planName}>{t(`paywall.planNames.${id}`)}</Text>
                    <Text style={styles.planGuests}>
                      {plan.maxGuests == null ? t('paywall.unlimitedGuests') : t('paywall.upToGuests', { n: plan.maxGuests })}
                    </Text>
                  </View>
                  <View style={styles.priceCol}>
                    <Text style={styles.price}>{priceLabel(plan)}</Text>
                    {plan.priceUSD > 0 && <Text style={styles.pricePer}>{t('paywall.perEvent')}</Text>}
                  </View>
                  <View style={[styles.radio, active && styles.radioActive]}>
                    {active && <View style={styles.radioDot} />}
                  </View>
                </View>

                {active && (
                  <View style={styles.featureList}>
                    {featureLines(plan).map((line, i) => (
                      <View key={i} style={styles.featureRow}>
                        <Icon name="check" size={14} color={colors.brand.DEFAULT} strokeWidth={2.6} />
                        <Text style={styles.featureText}>{line}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.terms}>{!PAID_PLANS_ENABLED ? t('paywall.freeTerms') : t('paywall.termsNote')}</Text>

        {PAID_PLANS_ENABLED && (
          <TouchableOpacity onPress={() => restorePurchases().catch(() => {})} style={styles.restoreBtn}>
            <Text style={styles.restoreText}>{t('paywall.restorePurchase')}</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + spacing.sm }]}>
        <PrimaryButton
          label={isUpgrade
            ? `${t('paywall.upgradeTo')} · ${priceLabel(selectedPlan)}`
            : selected === 'free'
              ? t('paywall.continueWithFree')
              : `${t('paywall.selectPlan')} · ${priceLabel(selectedPlan)}`}
          onPress={handleContinue}
          variant={!isUpgrade && selected === 'free' ? 'ghost' : 'brand'}
          loading={loading}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: spacing.lg, gap: spacing.lg },
  backBtn: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6 },
  backText: { color: colors.text.secondary, fontSize: typography.sizes.base, fontFamily: fonts.body },
  header: { gap: spacing.xs },
  title: { fontSize: typography.sizes['3xl'], fontFamily: fonts.displayBold, color: colors.text.primary },
  subtitle: { fontSize: typography.sizes.sm, fontFamily: fonts.body, color: colors.text.muted, lineHeight: 20 },
  eventPill: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: colors.bg.card, borderRadius: radius.full,
    paddingHorizontal: spacing.lg, paddingVertical: 12,
    borderWidth: 1, borderColor: colors.border.DEFAULT,
  },
  eventPillName: { flex: 1, fontSize: typography.sizes.base, fontFamily: fonts.bodySemibold, color: colors.text.primary },
  eventPillDetail: { fontSize: typography.sizes.sm, fontFamily: fonts.body, color: colors.text.muted },
  plans: { gap: spacing.sm },
  planCard: {
    borderRadius: radius['2xl'], padding: spacing.lg, gap: spacing.md,
    borderWidth: 1.5, borderColor: colors.border.DEFAULT, backgroundColor: colors.bg.card,
  },
  planCardActive: { borderColor: colors.brand.DEFAULT, backgroundColor: colors.brand.glow },
  badge: { alignSelf: 'flex-start', backgroundColor: colors.brand.DEFAULT, borderRadius: radius.full, paddingHorizontal: 12, paddingVertical: 4 },
  badgeText: { color: colors.text.inverse, fontSize: typography.sizes.xs, fontFamily: fonts.bodyBold },
  planTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  planName: { fontSize: typography.sizes.lg, fontFamily: fonts.displayBold, color: colors.text.primary },
  planGuests: { fontSize: typography.sizes.sm, fontFamily: fonts.body, color: colors.text.muted },
  priceCol: { alignItems: 'flex-end' },
  price: { fontSize: typography.sizes.xl, fontFamily: fonts.displayBold, color: colors.brand.dark },
  pricePer: { fontSize: typography.sizes.xs, fontFamily: fonts.body, color: colors.text.muted },
  radio: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: colors.border.DEFAULT, alignItems: 'center', justifyContent: 'center' },
  radioActive: { borderColor: colors.brand.DEFAULT },
  radioDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.brand.DEFAULT },
  featureList: { gap: 8, paddingTop: spacing.xs, borderTopWidth: 1, borderTopColor: colors.border.subtle },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  featureText: { fontSize: typography.sizes.sm, fontFamily: fonts.body, color: colors.text.secondary },
  terms: { textAlign: 'center', color: colors.text.muted, fontSize: typography.sizes.xs, fontFamily: fonts.body },
  restoreBtn: { alignSelf: 'center', paddingVertical: spacing.sm },
  restoreText: { color: colors.brand.DEFAULT, fontSize: typography.sizes.sm, fontFamily: fonts.bodySemibold },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: spacing.lg, backgroundColor: colors.bg.primary, borderTopWidth: 1, borderTopColor: colors.border.subtle },
});
