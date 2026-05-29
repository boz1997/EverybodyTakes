import { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import { useEventStore } from '@store/eventStore';
import { useAuthStore } from '@store/authStore';
import { EventService } from '@features/events/services/eventService';
import { PrimaryButton } from '@shared/components/PrimaryButton';
import { colors, typography, spacing, radius } from '@constants/theme';

type Plan = 'free' | 'starter' | 'pro';

interface PlanFeature {
  text: string;
  included: boolean;
}

export default function PaywallScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { draft, setActiveEventId } = useEventStore();
  const { user } = useAuthStore();

  const [selectedPlan, setSelectedPlan] = useState<Plan>('starter');
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      key: 'free' as Plan,
      name: t('paywall.free.name'),
      price: t('paywall.free.price'),
      period: '',
      icon: '🎁',
      features: (t('paywall.free.features', { returnObjects: true }) as string[]).map((f) => ({ text: f, included: true })),
      color: colors.text.muted,
      gradient: ['#1A1A24', '#13131A'] as [string, string],
    },
    {
      key: 'starter' as Plan,
      name: t('paywall.starter.name'),
      price: t('paywall.starter.price'),
      period: t('paywall.starter.period'),
      icon: '⚡',
      features: (t('paywall.starter.features', { returnObjects: true }) as string[]).map((f) => ({ text: f, included: true })),
      color: colors.brand.DEFAULT,
      gradient: ['rgba(168,85,247,0.15)', 'rgba(168,85,247,0.03)'] as [string, string],
      badge: t('paywall.mostPopular'),
    },
    {
      key: 'pro' as Plan,
      name: t('paywall.pro.name'),
      price: t('paywall.pro.price'),
      period: t('paywall.pro.period'),
      icon: '👑',
      features: (t('paywall.pro.features', { returnObjects: true }) as string[]).map((f) => ({ text: f, included: true })),
      color: colors.gold.DEFAULT,
      gradient: ['rgba(245,158,11,0.15)', 'rgba(245,158,11,0.03)'] as [string, string],
    },
  ];

  const handleContinue = async () => {
    if (!user) return;
    try {
      setLoading(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      if (selectedPlan !== 'free') {
        // TODO: initiate in-app purchase here
        // await PurchaseService.purchase(selectedPlan);
      }

      const event = await EventService.create(user.uid, draft, selectedPlan);
      setActiveEventId(event.id);
      router.replace({ pathname: '/host/qr', params: { id: event.id, code: event.shortCode } });
    } catch (e) {
      Alert.alert(t('common.error'), t('errors.unknownError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#0A0A0F', '#160A2E', '#0A0A0F']} style={styles.container}>
      {/* Top glow */}
      <View style={styles.glow} pointerEvents="none" />

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + 140 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← {t('common.back')}</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.crown}>👑</Text>
          <Text style={styles.title}>{t('paywall.title')}</Text>
          <Text style={styles.subtitle}>{t('paywall.subtitle')}</Text>
        </View>

        {/* Event Summary Pill */}
        <View style={styles.eventPill}>
          <LinearGradient colors={['rgba(168,85,247,0.2)', 'rgba(168,85,247,0.05)']} style={styles.eventPillGradient}>
            <Text style={styles.eventPillIcon}>🎉</Text>
            <Text style={styles.eventPillName} numberOfLines={1}>{draft.name || 'Etkinlik'}</Text>
            <Text style={styles.eventPillDetail}>{draft.shotsPerGuest} çekim/kişi</Text>
          </LinearGradient>
        </View>

        {/* Plans */}
        <View style={styles.plans}>
          {plans.map((plan) => (
            <TouchableOpacity
              key={plan.key}
              onPress={() => { setSelectedPlan(plan.key); Haptics.selectionAsync(); }}
              style={[styles.planCard, selectedPlan === plan.key && { borderColor: plan.color }]}
              activeOpacity={0.85}
            >
              <LinearGradient colors={plan.gradient} style={styles.planGradient}>
                {plan.badge && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{plan.badge}</Text>
                  </View>
                )}

                <View style={styles.planTop}>
                  <View style={styles.planLeft}>
                    <Text style={styles.planIcon}>{plan.icon}</Text>
                    <View>
                      <Text style={[styles.planName, { color: plan.color }]}>{plan.name}</Text>
                      {plan.period ? (
                        <Text style={styles.planPeriod}>{plan.period}</Text>
                      ) : null}
                    </View>
                  </View>
                  <View style={styles.planPriceWrap}>
                    <Text style={[styles.planPrice, { color: plan.color }]}>{plan.price}</Text>
                  </View>
                </View>

                <View style={styles.featureList}>
                  {plan.features.map((f, i) => (
                    <View key={i} style={styles.featureRow}>
                      <Text style={[styles.featureCheck, { color: plan.color }]}>✓</Text>
                      <Text style={styles.featureText}>{f.text}</Text>
                    </View>
                  ))}
                </View>

                {/* Selection indicator */}
                <View style={[styles.selector, selectedPlan === plan.key && { borderColor: plan.color, backgroundColor: plan.color + '20' }]}>
                  {selectedPlan === plan.key && <View style={[styles.selectorDot, { backgroundColor: plan.color }]} />}
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.terms}>{t('paywall.termsNote')}</Text>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + spacing.sm }]}>
        {selectedPlan === 'free' ? (
          <PrimaryButton
            label={t('paywall.continueWithFree')}
            onPress={handleContinue}
            variant="ghost"
            loading={loading}
          />
        ) : (
          <PrimaryButton
            label={`${t('paywall.selectPlan')} — ${plans.find(p => p.key === selectedPlan)?.price}`}
            onPress={handleContinue}
            variant={selectedPlan === 'pro' ? 'gold' : 'brand'}
            loading={loading}
          />
        )}
        <TouchableOpacity style={styles.restoreBtn}>
          <Text style={styles.restoreText}>{t('paywall.restorePurchase')}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  glow: { position: 'absolute', top: -50, left: '20%', width: '60%', height: 200, borderRadius: 200, backgroundColor: 'rgba(168,85,247,0.15)' },
  scroll: { paddingHorizontal: spacing.lg, gap: spacing.lg },
  backBtn: { alignSelf: 'flex-start' },
  backText: { color: colors.text.secondary, fontSize: typography.sizes.base },
  header: { alignItems: 'center', gap: spacing.sm },
  crown: { fontSize: 48 },
  title: { fontSize: typography.sizes['2xl'], fontWeight: typography.weights.extrabold, color: colors.text.primary, textAlign: 'center' },
  subtitle: { fontSize: typography.sizes.sm, color: colors.text.muted, textAlign: 'center' },
  eventPill: { borderRadius: radius.full, overflow: 'hidden', borderWidth: 1, borderColor: colors.border.brand },
  eventPillGradient: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: 12, gap: spacing.sm },
  eventPillIcon: { fontSize: 20 },
  eventPillName: { flex: 1, fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.text.primary },
  eventPillDetail: { fontSize: typography.sizes.sm, color: colors.text.muted },
  plans: { gap: spacing.md },
  planCard: { borderRadius: radius['2xl'], overflow: 'hidden', borderWidth: 1.5, borderColor: colors.border.DEFAULT },
  planGradient: { padding: spacing.lg, gap: spacing.md },
  badge: { alignSelf: 'flex-start', backgroundColor: colors.brand.DEFAULT, borderRadius: radius.full, paddingHorizontal: 12, paddingVertical: 4, marginBottom: -spacing.xs },
  badgeText: { color: '#fff', fontSize: typography.sizes.xs, fontWeight: typography.weights.bold },
  planTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  planLeft: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  planIcon: { fontSize: 28 },
  planName: { fontSize: typography.sizes.lg, fontWeight: typography.weights.bold },
  planPeriod: { fontSize: typography.sizes.xs, color: colors.text.muted },
  planPriceWrap: { alignItems: 'flex-end' },
  planPrice: { fontSize: typography.sizes['2xl'], fontWeight: typography.weights.extrabold },
  featureList: { gap: 8 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  featureCheck: { fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, width: 16 },
  featureText: { fontSize: typography.sizes.sm, color: colors.text.secondary },
  selector: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: colors.border.DEFAULT, alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center' },
  selectorDot: { width: 12, height: 12, borderRadius: 6 },
  terms: { textAlign: 'center', color: colors.text.muted, fontSize: typography.sizes.xs },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: spacing.lg, backgroundColor: colors.bg.primary, borderTopWidth: 1, borderTopColor: colors.border.subtle, gap: spacing.sm },
  restoreBtn: { alignItems: 'center' },
  restoreText: { color: colors.text.muted, fontSize: typography.sizes.xs },
});
