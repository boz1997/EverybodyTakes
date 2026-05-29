import { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import * as ImagePicker from 'expo-image-picker';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useEventStore, EventType, RevealTiming } from '@store/eventStore';
import { StepIndicator } from '@shared/components/StepIndicator';
import { PrimaryButton } from '@shared/components/PrimaryButton';
import { InputField } from '@shared/components/InputField';
import { colors, typography, spacing, radius } from '@constants/theme';

const TOTAL_STEPS = 3;

const EVENT_TYPES: { key: EventType; icon: string; labelKey: string }[] = [
  { key: 'wedding', icon: '💍', labelKey: 'host.eventTypes.wedding' },
  { key: 'birthday', icon: '🎂', labelKey: 'host.eventTypes.birthday' },
  { key: 'party', icon: '🎉', labelKey: 'host.eventTypes.party' },
  { key: 'yacht', icon: '⛵', labelKey: 'host.eventTypes.yacht' },
  { key: 'club', icon: '🎵', labelKey: 'host.eventTypes.club' },
  { key: 'festival', icon: '🎪', labelKey: 'host.eventTypes.festival' },
  { key: 'corporate', icon: '🏢', labelKey: 'host.eventTypes.corporate' },
  { key: 'other', icon: '✨', labelKey: 'host.eventTypes.other' },
];

const SHOT_OPTIONS = [10, 12, 24, 36, 48, 72];
const REVEAL_OPTIONS: { key: RevealTiming; icon: string; labelKey: string; descKey: string }[] = [
  { key: 'instant', icon: '⚡', labelKey: 'host.revealInstant', descKey: 'host.revealInstantDesc' },
  { key: 'after_event', icon: '🌅', labelKey: 'host.revealAfterEvent', descKey: 'host.revealAfterEventDesc' },
  { key: '24h', icon: '⏳', labelKey: 'host.reveal24h', descKey: 'host.reveal24hDesc' },
];

export default function CreateEvent() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { draft, updateDraft, resetDraft } = useEventStore();

  const [step, setStep] = useState(0);
  const [nameError, setNameError] = useState('');

  const stepTitles = [t('host.createStep1'), t('host.createStep2'), t('host.createStep3')];

  const pickCover = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.9,
    });
    if (!result.canceled && result.assets[0]) {
      updateDraft({ coverImageUri: result.assets[0].uri });
    }
  };

  const validateStep = () => {
    if (step === 0 && !draft.name.trim()) {
      setNameError(t('common.required'));
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
    } else {
      router.push('/host/paywall');
    }
  };

  return (
    <LinearGradient colors={['#0A0A0F', '#160A2E', '#0A0A0F']} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>

        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
          <TouchableOpacity onPress={() => step > 0 ? setStep(step - 1) : router.back()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.stepLabel}>{stepTitles[step]}</Text>
            <StepIndicator total={TOTAL_STEPS} current={step} />
          </View>
          <TouchableOpacity onPress={() => { resetDraft(); router.back(); }}>
            <Text style={styles.cancelText}>{t('common.cancel')}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 100 }]}
          keyboardShouldPersistTaps="handled"
        >
          {/* STEP 0: Event Details */}
          {step === 0 && (
            <View style={styles.section}>
              {/* Cover Photo */}
              <TouchableOpacity onPress={pickCover} style={styles.coverPicker} activeOpacity={0.8}>
                {draft.coverImageUri ? (
                  <Animated.Image source={{ uri: draft.coverImageUri }} style={styles.coverImage} />
                ) : (
                  <LinearGradient colors={['rgba(168,85,247,0.15)', 'rgba(168,85,247,0.05)']} style={styles.coverEmpty}>
                    <Text style={{ fontSize: 32 }}>📸</Text>
                    <Text style={styles.coverEmptyText}>{t('host.addCoverPhoto')}</Text>
                  </LinearGradient>
                )}
                {draft.coverImageUri && (
                  <View style={styles.coverChange}>
                    <Text style={styles.coverChangeText}>{t('host.changeCoverPhoto')}</Text>
                  </View>
                )}
              </TouchableOpacity>

              <InputField
                label={t('host.eventName')}
                placeholder={t('host.eventNamePlaceholder')}
                value={draft.name}
                onChangeText={(v) => { updateDraft({ name: v }); setNameError(''); }}
                error={nameError}
                maxLength={80}
              />

              <Text style={styles.sectionTitle}>{t('host.eventType')}</Text>
              <View style={styles.typeGrid}>
                {EVENT_TYPES.map((et) => (
                  <TouchableOpacity
                    key={et.key}
                    style={[styles.typeChip, draft.type === et.key && styles.typeChipActive]}
                    onPress={() => updateDraft({ type: et.key })}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.typeIcon}>{et.icon}</Text>
                    <Text style={[styles.typeLabel, draft.type === et.key && styles.typeLabelActive]}>
                      {t(et.labelKey)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* STEP 1: Photo Settings */}
          {step === 1 && (
            <View style={styles.section}>
              {/* Shots per guest */}
              <Text style={styles.sectionTitle}>{t('host.shotsPerGuest')}</Text>
              <Text style={styles.sectionHint}>{t('host.shotsPerGuestHint')}</Text>
              <View style={styles.shotGrid}>
                {SHOT_OPTIONS.map((n) => (
                  <TouchableOpacity
                    key={n}
                    style={[styles.shotChip, draft.shotsPerGuest === n && styles.shotChipActive]}
                    onPress={() => updateDraft({ shotsPerGuest: n })}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.shotNumber, draft.shotsPerGuest === n && styles.shotNumberActive]}>{n}</Text>
                    <Text style={[styles.shotLabel, draft.shotsPerGuest === n && styles.shotLabelActive]}>
                      {t('guest.shot')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Disposable mode */}
              <TouchableOpacity
                style={[styles.toggleRow, draft.disposableMode && styles.toggleRowActive]}
                onPress={() => updateDraft({ disposableMode: !draft.disposableMode })}
                activeOpacity={0.8}
              >
                <View style={styles.toggleInfo}>
                  <Text style={styles.toggleIcon}>📽️</Text>
                  <View style={styles.toggleText}>
                    <Text style={styles.toggleTitle}>{t('host.disposableMode')}</Text>
                    <Text style={styles.toggleDesc}>{t('host.disposableModeDesc')}</Text>
                  </View>
                </View>
                <View style={[styles.toggle, draft.disposableMode && styles.toggleOn]}>
                  <View style={[styles.toggleThumb, draft.disposableMode && styles.toggleThumbOn]} />
                </View>
              </TouchableOpacity>

              {/* Reveal timing */}
              <Text style={styles.sectionTitle}>{t('host.revealTiming')}</Text>
              <View style={styles.revealOptions}>
                {REVEAL_OPTIONS.map((opt) => (
                  <TouchableOpacity
                    key={opt.key}
                    style={[styles.revealCard, draft.revealTiming === opt.key && styles.revealCardActive]}
                    onPress={() => updateDraft({ revealTiming: opt.key })}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.revealIcon}>{opt.icon}</Text>
                    <Text style={[styles.revealTitle, draft.revealTiming === opt.key && styles.revealTitleActive]}>
                      {t(opt.labelKey)}
                    </Text>
                    <Text style={styles.revealDesc}>{t(opt.descKey)}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Gallery upload */}
              <TouchableOpacity
                style={[styles.toggleRow, draft.allowGalleryUpload && styles.toggleRowActive]}
                onPress={() => updateDraft({ allowGalleryUpload: !draft.allowGalleryUpload })}
                activeOpacity={0.8}
              >
                <View style={styles.toggleInfo}>
                  <Text style={styles.toggleIcon}>🖼️</Text>
                  <View style={styles.toggleText}>
                    <Text style={styles.toggleTitle}>{t('host.allowGalleryUpload')}</Text>
                  </View>
                </View>
                <View style={[styles.toggle, draft.allowGalleryUpload && styles.toggleOn]}>
                  <View style={[styles.toggleThumb, draft.allowGalleryUpload && styles.toggleThumbOn]} />
                </View>
              </TouchableOpacity>
            </View>
          )}

          {/* STEP 2: Guest Settings */}
          {step === 2 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('host.maxGuests')}</Text>
              <Text style={styles.sectionHint}>{t('host.maxGuestsHint')}</Text>

              <View style={styles.guestGrid}>
                {[null, 25, 50, 100, 200, 500].map((n) => (
                  <TouchableOpacity
                    key={String(n)}
                    style={[styles.guestChip, draft.maxGuests === n && styles.guestChipActive]}
                    onPress={() => updateDraft({ maxGuests: n })}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.guestChipText, draft.maxGuests === n && styles.guestChipTextActive]}>
                      {n === null ? t('host.unlimited') : String(n)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.sectionTitle}>{t('host.reminderBefore')}</Text>
              <View style={styles.reminderOptions}>
                {[{ key: null, label: t('host.noReminder') }, { key: '1h', label: t('host.reminder1h') }, { key: '24h', label: t('host.reminder24h') }].map((opt) => (
                  <TouchableOpacity
                    key={String(opt.key)}
                    style={[styles.reminderChip, draft.reminderBefore === opt.key && styles.reminderChipActive]}
                    onPress={() => updateDraft({ reminderBefore: opt.key as any })}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.reminderText, draft.reminderBefore === opt.key && styles.reminderTextActive]}>
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Summary Card */}
              <View style={styles.summary}>
                <LinearGradient colors={['rgba(168,85,247,0.1)', 'rgba(168,85,247,0.03)']} style={styles.summaryGradient}>
                  <Text style={styles.summaryTitle}>Özet</Text>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Etkinlik</Text>
                    <Text style={styles.summaryValue}>{draft.name || '—'}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Çekim/kişi</Text>
                    <Text style={styles.summaryValue}>{draft.shotsPerGuest}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Gösterim</Text>
                    <Text style={styles.summaryValue}>{t(`host.reveal${draft.revealTiming === 'instant' ? 'Instant' : draft.revealTiming === 'after_event' ? 'AfterEvent' : '24h'}`)}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Misafir limiti</Text>
                    <Text style={styles.summaryValue}>{draft.maxGuests ?? t('host.unlimited')}</Text>
                  </View>
                </LinearGradient>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Bottom CTA */}
        <View style={[styles.bottomBar, { paddingBottom: insets.bottom + spacing.sm }]}>
          <PrimaryButton
            label={step < TOTAL_STEPS - 1 ? t('common.next') : t('host.generateQR')}
            onPress={handleNext}
          />
        </View>
      </KeyboardAvoidingView>
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
  backText: { fontSize: 24, color: colors.text.secondary },
  headerCenter: { alignItems: 'center', gap: 6 },
  stepLabel: { fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.secondary },
  cancelText: { fontSize: typography.sizes.sm, color: colors.text.muted },
  scroll: { padding: spacing.lg, gap: spacing.lg },
  section: { gap: spacing.lg },
  sectionTitle: { fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.text.primary },
  sectionHint: { fontSize: typography.sizes.sm, color: colors.text.muted, marginTop: -spacing.sm },
  coverPicker: { width: '100%', height: 180, borderRadius: radius['2xl'], overflow: 'hidden' },
  coverImage: { width: '100%', height: '100%' },
  coverEmpty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.sm, borderWidth: 1, borderColor: colors.border.brand, borderRadius: radius['2xl'], borderStyle: 'dashed' },
  coverEmptyText: { color: colors.text.muted, fontSize: typography.sizes.sm },
  coverChange: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)', padding: spacing.sm, alignItems: 'center' },
  coverChangeText: { color: '#fff', fontSize: typography.sizes.sm },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  typeChip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 10, borderRadius: radius.full, borderWidth: 1, borderColor: colors.border.DEFAULT, backgroundColor: colors.bg.card },
  typeChipActive: { borderColor: colors.brand.DEFAULT, backgroundColor: colors.brand.glow },
  typeIcon: { fontSize: 16 },
  typeLabel: { fontSize: typography.sizes.sm, color: colors.text.muted },
  typeLabelActive: { color: colors.brand.DEFAULT, fontWeight: typography.weights.medium },
  shotGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  shotChip: { alignItems: 'center', padding: spacing.md, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border.DEFAULT, backgroundColor: colors.bg.card, minWidth: 80 },
  shotChipActive: { borderColor: colors.brand.DEFAULT, backgroundColor: colors.brand.glow },
  shotNumber: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.text.muted },
  shotNumberActive: { color: colors.brand.DEFAULT },
  shotLabel: { fontSize: typography.sizes.xs, color: colors.text.muted },
  shotLabelActive: { color: colors.brand.DEFAULT },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.md, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border.DEFAULT, backgroundColor: colors.bg.card },
  toggleRowActive: { borderColor: colors.brand.DEFAULT, backgroundColor: colors.brand.glow },
  toggleInfo: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, flex: 1 },
  toggleIcon: { fontSize: 24 },
  toggleText: { flex: 1, gap: 2 },
  toggleTitle: { fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary },
  toggleDesc: { fontSize: typography.sizes.xs, color: colors.text.muted },
  toggle: { width: 44, height: 26, borderRadius: 13, backgroundColor: colors.bg.elevated, justifyContent: 'center', padding: 2 },
  toggleOn: { backgroundColor: colors.brand.DEFAULT },
  toggleThumb: { width: 22, height: 22, borderRadius: 11, backgroundColor: colors.text.muted },
  toggleThumbOn: { backgroundColor: '#fff', marginLeft: 18 },
  revealOptions: { gap: spacing.sm },
  revealCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border.DEFAULT, backgroundColor: colors.bg.card },
  revealCardActive: { borderColor: colors.brand.DEFAULT, backgroundColor: colors.brand.glow },
  revealIcon: { fontSize: 24 },
  revealTitle: { fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.secondary, flex: 1 },
  revealTitleActive: { color: colors.brand.DEFAULT },
  revealDesc: { fontSize: typography.sizes.xs, color: colors.text.muted },
  guestGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  guestChip: { paddingHorizontal: spacing.lg, paddingVertical: 10, borderRadius: radius.full, borderWidth: 1, borderColor: colors.border.DEFAULT, backgroundColor: colors.bg.card },
  guestChipActive: { borderColor: colors.brand.DEFAULT, backgroundColor: colors.brand.glow },
  guestChipText: { fontSize: typography.sizes.sm, color: colors.text.muted },
  guestChipTextActive: { color: colors.brand.DEFAULT, fontWeight: typography.weights.semibold },
  reminderOptions: { gap: spacing.sm },
  reminderChip: { padding: spacing.md, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border.DEFAULT, backgroundColor: colors.bg.card, alignItems: 'center' },
  reminderChipActive: { borderColor: colors.brand.DEFAULT, backgroundColor: colors.brand.glow },
  reminderText: { fontSize: typography.sizes.sm, color: colors.text.muted },
  reminderTextActive: { color: colors.brand.DEFAULT, fontWeight: typography.weights.medium },
  summary: { borderRadius: radius['2xl'], overflow: 'hidden', borderWidth: 1, borderColor: colors.border.brand },
  summaryGradient: { padding: spacing.lg, gap: spacing.sm },
  summaryTitle: { fontSize: typography.sizes.base, fontWeight: typography.weights.bold, color: colors.brand.DEFAULT, marginBottom: spacing.xs },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryLabel: { fontSize: typography.sizes.sm, color: colors.text.muted },
  summaryValue: { fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: spacing.lg, backgroundColor: colors.bg.primary, borderTopWidth: 1, borderTopColor: colors.border.subtle },
});
