import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, InteractionManager, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import { useEventStore } from '@store/eventStore';
import { useAuthStore } from '@store/authStore';
import { EventService } from '@features/events/services/eventService';
import { PLANS, PAID_PLAN_ORDER, PAID_PLANS_ENABLED, PlanId, Plan, formatPrice } from '@constants/plans';
import { buyProduct, getPriceStrings, restorePurchases, purchasesReady, PurchaseCancelled } from '@features/purchases/purchaseService';
import { logError } from '@shared/errorLog';
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
  const [promoVisible, setPromoVisible] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);

  // Pull live localized store prices for the paid products.
  useEffect(() => {
    const ids = PAID_PLAN_ORDER.map((id) => PLANS[id].productId).filter(Boolean) as string[];
    getPriceStrings(ids).then(setPriceMap).catch(() => {});
  }, []);

  // Prefer the live store price; fall back to the reference USD price.
  const priceLabel = (plan: Plan): string =>
    (plan.productId && priceMap[plan.productId]) || formatPrice(plan.priceUSD);

  // Only advertise features that are actually implemented: guests, photos, video.
  // `ok` drives the icon — a missing feature (no video) shows a cross, not a tick.
  const featureLines = (plan: Plan): { label: string; ok: boolean }[] => [
    { label: plan.maxGuests == null ? t('paywall.unlimitedGuests') : t('paywall.upToGuests', { n: plan.maxGuests }), ok: true },
    { label: plan.photoCap == null ? t('paywall.unlimitedPhotos') : t('paywall.photoCap', { n: plan.photoCap }), ok: true },
    { label: plan.retentionDays == null ? t('paywall.storageForever') : t('paywall.storageDays', { n: plan.retentionDays }), ok: plan.retentionDays == null },
    { label: plan.watermark ? t('paywall.adsShown') : t('paywall.noAds'), ok: !plan.watermark },
    { label: plan.video ? t('paywall.videoOn') : t('paywall.videoOff'), ok: plan.video },
    { label: plan.notes ? t('notes.bookTitle') : t('notes.featureOff'), ok: plan.notes },
  ];

  // Unlocks the selected plan: upgrades the event or creates it, then routes on.
  // Shared by the paid (App Store) and promo-code paths — neither pays twice.
  const finalize = async () => {
    if (!user) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    if (isUpgrade) {
      await EventService.updatePlan(upgradeId!, selected);
      router.back();
      return;
    }

    const event = await EventService.create(user.uid, draft, selected);
    setActiveEventId(event.id);
    resetDraft();
    // Close the create + paywall modals, THEN open QR over the dashboard. The
    // push is deferred until the dismissal animation finishes — on iPad two
    // stacked modals could otherwise be left presented, hiding the QR behind
    // them (the host would see the reveal step and think nothing happened).
    router.dismissAll();
    InteractionManager.runAfterInteractions(() => {
      router.push({ pathname: '/host/qr', params: { id: event.id, code: event.shortCode } });
    });
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
            // Surface the underlying StoreKit/RevenueCat reason — a bare
            // "could not be completed" leaves failures (and review screenshots)
            // undiagnosable.
            const detail = (e as { message?: string })?.message;
            logError('purchase', e, { productId: plan.productId });
            Alert.alert(t('common.error'), detail ? `${t('paywall.purchaseFailed')}\n\n(${detail})` : t('paywall.purchaseFailed'));
            return;
          }
        }
      }
      await finalize();
    } catch {
      Alert.alert(t('common.error'), t('errors.unknownError'));
    } finally {
      setLoading(false);
    }
  };

  // Redeems a promo code and unlocks the selected plan for free (no purchase).
  const applyPromo = async () => {
    if (!user) return;
    const code = promoCode.trim().toUpperCase();
    if (code.length < 6) return;
    try {
      setPromoLoading(true);
      const result = await EventService.redeemPromoCode(code, user.uid);
      if (result !== 'ok') {
        Alert.alert(t('paywall.promoTitle'), t(result === 'used' ? 'paywall.promoUsed' : 'paywall.promoInvalid'));
        return;
      }
      setPromoVisible(false);
      setPromoCode('');
      await finalize();
    } catch {
      Alert.alert(t('common.error'), t('errors.unknownError'));
    } finally {
      setPromoLoading(false);
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
          <View style={styles.brandRow}>
            <Image source={require('../../assets/guestmark.png')} style={styles.brandLogo} contentFit="contain" />
            <Text style={styles.brandName}>GuestCam</Text>
          </View>
          <Text style={styles.title}>{isUpgrade ? t('paywall.upgradeTitle') : t('paywall.title')}</Text>
          <Text style={styles.subtitle}>{!PAID_PLANS_ENABLED ? t('paywall.freeSubtitle') : (isUpgrade ? t('paywall.upgradeSubtitle') : t('paywall.subtitle'))}</Text>
        </View>

        {/* Event summary pill (create flow only) */}
        {!isUpgrade && (
          <View style={styles.eventPill}>
            <Icon name={EVENT_TYPE_ICON[draft.type]} size={18} color={colors.brand.DEFAULT} />
            <Text style={styles.eventPillName} numberOfLines={1}>{draft.name || t('guest.eventCover')}</Text>
            <Text style={styles.eventPillDetail}>{draft.shotsPerGuest} {t('host.shotsPerGuestShort')}</Text>
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
                        <Icon name={line.ok ? 'check' : 'close'} size={14} color={line.ok ? colors.brand.DEFAULT : colors.text.muted} strokeWidth={2.6} />
                        <Text style={[styles.featureText, !line.ok && styles.featureTextOff]}>{line.label}</Text>
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

        {PAID_PLANS_ENABLED && selected !== 'free' && (
          <TouchableOpacity onPress={() => setPromoVisible(true)} style={styles.restoreBtn}>
            <Text style={styles.restoreText}>{t('paywall.havePromo')}</Text>
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

      {/* Promo code entry */}
      <Modal visible={promoVisible} transparent animationType="fade" onRequestClose={() => setPromoVisible(false)}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalOverlay}>
          <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={() => setPromoVisible(false)} />
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{t('paywall.promoTitle')}</Text>
            <Text style={styles.modalSub}>{t('paywall.promoSubtitle')}</Text>
            <TextInput
              value={promoCode}
              onChangeText={(v) => setPromoCode(v.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8))}
              autoCapitalize="characters"
              autoCorrect={false}
              autoFocus
              placeholder="XXXXXXXX"
              placeholderTextColor={colors.text.muted}
              style={styles.promoInput}
            />
            <PrimaryButton
              label={t('paywall.promoApply')}
              onPress={applyPromo}
              loading={promoLoading}
              disabled={promoCode.trim().length < 6}
            />
            <TouchableOpacity onPress={() => setPromoVisible(false)} style={styles.restoreBtn}>
              <Text style={styles.restoreText}>{t('common.cancel')}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: spacing.lg, gap: spacing.lg },
  backBtn: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6 },
  backText: { color: colors.text.secondary, fontSize: typography.sizes.base, fontFamily: fonts.body },
  header: { gap: spacing.xs },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
  brandLogo: { width: 22, height: 22, borderRadius: 5 },
  brandName: { fontSize: typography.sizes.sm, fontFamily: fonts.bodyBold, color: colors.brand.dark },
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
  featureTextOff: { color: colors.text.muted },
  terms: { textAlign: 'center', color: colors.text.muted, fontSize: typography.sizes.xs, fontFamily: fonts.body },
  restoreBtn: { alignSelf: 'center', paddingVertical: spacing.sm },
  restoreText: { color: colors.brand.DEFAULT, fontSize: typography.sizes.sm, fontFamily: fonts.bodySemibold },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: spacing.lg, backgroundColor: colors.bg.primary, borderTopWidth: 1, borderTopColor: colors.border.subtle },
  modalOverlay: { flex: 1, justifyContent: 'center', paddingHorizontal: spacing.lg, backgroundColor: 'rgba(0,0,0,0.45)' },
  modalCard: { backgroundColor: colors.bg.primary, borderRadius: radius['2xl'], padding: spacing.lg, gap: spacing.md },
  modalTitle: { fontSize: typography.sizes.xl, fontFamily: fonts.displayBold, color: colors.text.primary },
  modalSub: { fontSize: typography.sizes.sm, fontFamily: fonts.body, color: colors.text.muted, lineHeight: 20 },
  promoInput: {
    borderWidth: 1.5, borderColor: colors.border.DEFAULT, borderRadius: radius.lg,
    backgroundColor: colors.bg.card, paddingHorizontal: spacing.lg, paddingVertical: 14,
    fontSize: typography.sizes.xl, fontFamily: fonts.displayBold, color: colors.text.primary,
    textAlign: 'center', letterSpacing: 4,
  },
});
