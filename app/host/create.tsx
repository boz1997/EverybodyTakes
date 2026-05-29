import { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Animated, { FadeIn } from 'react-native-reanimated';
import { format } from 'date-fns';
import { tr as trLocale } from 'date-fns/locale';
import { useEventStore, EventType, RevealTiming } from '@store/eventStore';
import { StepIndicator } from '@shared/components/StepIndicator';
import { PrimaryButton } from '@shared/components/PrimaryButton';
import { InputField } from '@shared/components/InputField';
import { Icon, IconName, EVENT_TYPE_ICON } from '@shared/components/Icon';
import { colors, typography, spacing, radius, fonts, gradients } from '@constants/theme';

const TOTAL_STEPS = 5;

const EVENT_TYPES: { key: EventType; labelKey: string }[] = [
  { key: 'wedding', labelKey: 'host.eventTypes.wedding' },
  { key: 'birthday', labelKey: 'host.eventTypes.birthday' },
  { key: 'party', labelKey: 'host.eventTypes.party' },
  { key: 'yacht', labelKey: 'host.eventTypes.yacht' },
  { key: 'club', labelKey: 'host.eventTypes.club' },
  { key: 'festival', labelKey: 'host.eventTypes.festival' },
  { key: 'corporate', labelKey: 'host.eventTypes.corporate' },
  { key: 'other', labelKey: 'host.eventTypes.other' },
];

const SHOT_OPTIONS = [10, 12, 24, 36, 48, 72];
const REVEAL_OPTIONS: { key: RevealTiming; icon: IconName; labelKey: string; descKey: string }[] = [
  { key: 'instant', icon: 'flash', labelKey: 'host.revealInstant', descKey: 'host.revealInstantDesc' },
  { key: 'after_event', icon: 'calendar', labelKey: 'host.revealAfterEvent', descKey: 'host.revealAfterEventDesc' },
  { key: '24h', icon: 'film', labelKey: 'host.reveal24h', descKey: 'host.reveal24hDesc' },
];

export default function CreateEvent() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { draft, updateDraft, resetDraft } = useEventStore();

  const [step, setStep] = useState(0);
  const [nameError, setNameError] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const stepTitles = [
    t('host.createStep1'),   // Event Details
    t('host.eventType'),     // Type & Date
    t('host.photoSettings'), // Photo
    t('host.revealTiming'),  // Reveal
    t('host.guestSettings'), // Guests
  ];

  const pickCover = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
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
    <LinearGradient colors={gradients.page} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>

        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
          <TouchableOpacity onPress={() => step > 0 ? setStep(step - 1) : router.back()} style={styles.headerBtn}>
            <Icon name="arrowLeft" size={22} color={colors.text.secondary} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.stepLabel}>{stepTitles[step]}</Text>
            <StepIndicator total={TOTAL_STEPS} current={step} />
          </View>
          <TouchableOpacity onPress={() => { resetDraft(); router.back(); }} style={styles.headerBtn}>
            <Text style={styles.cancelText}>{t('common.cancel')}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 110 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View key={step} entering={FadeIn.duration(250)} style={styles.section}>

            {/* STEP 0: Cover + Name */}
            {step === 0 && (
              <>
                <View style={styles.questionBlock}>
                  <Text style={styles.questionTitle}>{t('host.eventCover')}</Text>
                  <Text style={styles.questionHint}>{t('common.optional')}</Text>
                  <TouchableOpacity onPress={pickCover} style={styles.coverPicker} activeOpacity={0.8}>
                    {draft.coverImageUri ? (
                      <Animated.Image source={{ uri: draft.coverImageUri }} style={styles.coverImage} />
                    ) : (
                      <LinearGradient colors={['rgba(190,106,46,0.12)', 'rgba(190,106,46,0.05)']} style={styles.coverEmpty}>
                        <Icon name="image" size={30} color={colors.brand.light} strokeWidth={1.8} />
                        <Text style={styles.coverEmptyText}>{t('host.addCoverPhoto')}</Text>
                      </LinearGradient>
                    )}
                    {draft.coverImageUri && (
                      <View style={styles.coverChange}>
                        <Text style={styles.coverChangeText}>{t('host.changeCoverPhoto')}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>

                <View style={styles.questionBlock}>
                  <InputField
                    label={t('host.eventName')}
                    placeholder={t('host.eventNamePlaceholder')}
                    value={draft.name}
                    onChangeText={(v) => { updateDraft({ name: v }); setNameError(''); }}
                    error={nameError}
                    maxLength={80}
                    autoFocus
                  />
                </View>
              </>
            )}

            {/* STEP 1: Event Type + Date */}
            {step === 1 && (
              <>
                <View style={styles.questionBlock}>
                  <Text style={styles.questionTitle}>{t('host.eventType')}</Text>
                  <View style={styles.typeGrid}>
                    {EVENT_TYPES.map((et) => (
                      <TouchableOpacity
                        key={et.key}
                        style={[styles.typeChip, draft.type === et.key && styles.typeChipActive]}
                        onPress={() => updateDraft({ type: et.key })}
                        activeOpacity={0.7}
                      >
                        <Icon
                          name={EVENT_TYPE_ICON[et.key]}
                          size={16}
                          color={draft.type === et.key ? colors.brand.DEFAULT : colors.text.muted}
                        />
                        <Text style={[styles.typeLabel, draft.type === et.key && styles.typeLabelActive]}>
                          {t(et.labelKey)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.questionBlock}>
                  <Text style={styles.questionTitle}>{t('host.eventDate')}</Text>
                  <TouchableOpacity
                    style={styles.dateRow}
                    onPress={() => setShowPicker((s) => !s)}
                    activeOpacity={0.8}
                  >
                    <Icon name="calendar" size={20} color={colors.brand.light} />
                    <Text style={[styles.dateText, !draft.date && styles.datePlaceholder]}>
                      {draft.date
                        ? format(draft.date, 'd MMMM yyyy, EEEE', { locale: trLocale })
                        : t('common.optional')}
                    </Text>
                    <Icon name={showPicker ? 'chevronUp' : 'chevronDown'} size={16} color={colors.text.muted} />
                  </TouchableOpacity>

                  {showPicker && (
                    <View style={styles.pickerWrap}>
                      <DateTimePicker
                        value={draft.date ?? new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'inline' : 'default'}
                        themeVariant="light"
                        textColor={colors.text.primary}
                        accentColor={colors.brand.DEFAULT}
                        minimumDate={new Date()}
                        onChange={(_, selected) => {
                          if (Platform.OS !== 'ios') setShowPicker(false);
                          if (selected) updateDraft({ date: selected });
                        }}
                      />
                    </View>
                  )}
                </View>
              </>
            )}

            {/* STEP 2: Shots per guest + Disposable */}
            {step === 2 && (
              <>
                <View style={styles.questionBlock}>
                  <Text style={styles.questionTitle}>{t('host.shotsPerGuest')}</Text>
                  <Text style={styles.questionHint}>{t('host.shotsPerGuestHint')}</Text>
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
                </View>

                <View style={styles.questionBlock}>
                  <TouchableOpacity
                    style={[styles.toggleRow, draft.disposableMode && styles.toggleRowActive]}
                    onPress={() => updateDraft({ disposableMode: !draft.disposableMode })}
                    activeOpacity={0.8}
                  >
                    <View style={styles.toggleInfo}>
                      <View style={styles.toggleIconWrap}>
                        <Icon name="film" size={20} color={draft.disposableMode ? colors.brand.DEFAULT : colors.text.muted} />
                      </View>
                      <View style={styles.toggleText}>
                        <Text style={styles.toggleTitle}>{t('host.disposableMode')}</Text>
                        <Text style={styles.toggleDesc}>{t('host.disposableModeDesc')}</Text>
                      </View>
                    </View>
                    <View style={[styles.toggle, draft.disposableMode && styles.toggleOn]}>
                      <View style={[styles.toggleThumb, draft.disposableMode && styles.toggleThumbOn]} />
                    </View>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {/* STEP 3: Reveal timing + Gallery upload */}
            {step === 3 && (
              <>
                <View style={styles.questionBlock}>
                  <Text style={styles.questionTitle}>{t('host.revealTiming')}</Text>
                  <View style={styles.revealOptions}>
                    {REVEAL_OPTIONS.map((opt) => (
                      <TouchableOpacity
                        key={opt.key}
                        style={[styles.revealCard, draft.revealTiming === opt.key && styles.revealCardActive]}
                        onPress={() => updateDraft({ revealTiming: opt.key })}
                        activeOpacity={0.8}
                      >
                        <View style={styles.revealIconWrap}>
                          <Icon name={opt.icon} size={20} color={draft.revealTiming === opt.key ? colors.brand.DEFAULT : colors.text.muted} />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={[styles.revealTitle, draft.revealTiming === opt.key && styles.revealTitleActive]}>
                            {t(opt.labelKey)}
                          </Text>
                          <Text style={styles.revealDesc}>{t(opt.descKey)}</Text>
                        </View>
                        <View style={[styles.radio, draft.revealTiming === opt.key && styles.radioActive]}>
                          {draft.revealTiming === opt.key && <View style={styles.radioDot} />}
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.questionBlock}>
                  <TouchableOpacity
                    style={[styles.toggleRow, draft.allowGalleryUpload && styles.toggleRowActive]}
                    onPress={() => updateDraft({ allowGalleryUpload: !draft.allowGalleryUpload })}
                    activeOpacity={0.8}
                  >
                    <View style={styles.toggleInfo}>
                      <View style={styles.toggleIconWrap}>
                        <Icon name="image" size={20} color={draft.allowGalleryUpload ? colors.brand.DEFAULT : colors.text.muted} />
                      </View>
                      <View style={styles.toggleText}>
                        <Text style={styles.toggleTitle}>{t('host.allowGalleryUpload')}</Text>
                      </View>
                    </View>
                    <View style={[styles.toggle, draft.allowGalleryUpload && styles.toggleOn]}>
                      <View style={[styles.toggleThumb, draft.allowGalleryUpload && styles.toggleThumbOn]} />
                    </View>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {/* STEP 4: Max guests + Reminder */}
            {step === 4 && (
              <>
                <View style={styles.questionBlock}>
                  <Text style={styles.questionTitle}>{t('host.maxGuests')}</Text>
                  <Text style={styles.questionHint}>{t('host.maxGuestsHint')}</Text>
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
                </View>

                <View style={styles.questionBlock}>
                  <Text style={styles.questionTitle}>{t('host.reminderBefore')}</Text>
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
                </View>
              </>
            )}
          </Animated.View>
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
  headerBtn: { minWidth: 56 },
  backText: { fontSize: 24, color: colors.text.secondary },
  headerCenter: { alignItems: 'center', gap: 8 },
  stepLabel: { fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.secondary },
  cancelText: { fontSize: typography.sizes.sm, color: colors.text.muted, textAlign: 'right' },
  scroll: { padding: spacing.lg },
  section: { gap: spacing.xl },
  questionBlock: { gap: spacing.sm },
  questionTitle: { fontSize: typography.sizes.xl, fontFamily: fonts.displayBold, color: colors.text.primary },
  questionHint: { fontSize: typography.sizes.sm, color: colors.text.muted, marginTop: -4 },
  coverPicker: { width: '100%', height: 180, borderRadius: radius['2xl'], overflow: 'hidden', marginTop: spacing.xs },
  coverImage: { width: '100%', height: '100%' },
  coverEmpty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.sm, borderWidth: 1, borderColor: colors.border.brand, borderRadius: radius['2xl'], borderStyle: 'dashed' },
  coverEmptyText: { color: colors.text.muted, fontSize: typography.sizes.sm },
  coverChange: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)', padding: spacing.sm, alignItems: 'center' },
  coverChangeText: { color: '#fff', fontSize: typography.sizes.sm },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.xs },
  typeChip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 10, borderRadius: radius.full, borderWidth: 1, borderColor: colors.border.DEFAULT, backgroundColor: colors.bg.card },
  typeChipActive: { borderColor: colors.brand.DEFAULT, backgroundColor: colors.brand.glow },
  typeLabel: { fontSize: typography.sizes.sm, color: colors.text.muted },
  typeLabelActive: { color: colors.brand.DEFAULT, fontWeight: typography.weights.medium },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.bg.card, borderWidth: 1, borderColor: colors.border.DEFAULT, borderRadius: radius.lg, paddingHorizontal: spacing.md, paddingVertical: 16, marginTop: spacing.xs },
  dateText: { flex: 1, fontSize: typography.sizes.base, color: colors.text.primary },
  datePlaceholder: { color: colors.text.muted },
  pickerWrap: { marginTop: spacing.sm, backgroundColor: colors.bg.card, borderRadius: radius.xl, overflow: 'hidden', borderWidth: 1, borderColor: colors.border.DEFAULT },
  shotGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: spacing.sm, marginTop: spacing.xs },
  shotChip: { width: '31.5%', alignItems: 'center', paddingVertical: spacing.md, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border.DEFAULT, backgroundColor: colors.bg.card },
  shotChipActive: { borderColor: colors.brand.DEFAULT, backgroundColor: colors.brand.glow },
  shotNumber: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.text.muted },
  shotNumberActive: { color: colors.brand.DEFAULT },
  shotLabel: { fontSize: typography.sizes.xs, color: colors.text.muted },
  shotLabelActive: { color: colors.brand.DEFAULT },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.md, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border.DEFAULT, backgroundColor: colors.bg.card },
  toggleRowActive: { borderColor: colors.brand.DEFAULT, backgroundColor: colors.brand.glow },
  toggleInfo: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, flex: 1 },
  toggleIconWrap: { width: 36, height: 36, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg.elevated },
  toggleText: { flex: 1, gap: 2 },
  toggleTitle: { fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.text.primary },
  toggleDesc: { fontSize: typography.sizes.xs, color: colors.text.muted },
  toggle: { width: 44, height: 26, borderRadius: 13, backgroundColor: colors.bg.elevated, justifyContent: 'center', padding: 2 },
  toggleOn: { backgroundColor: colors.brand.DEFAULT },
  toggleThumb: { width: 22, height: 22, borderRadius: 11, backgroundColor: colors.text.muted },
  toggleThumbOn: { backgroundColor: '#fff', marginLeft: 18 },
  revealOptions: { gap: spacing.sm, marginTop: spacing.xs },
  revealCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border.DEFAULT, backgroundColor: colors.bg.card },
  revealCardActive: { borderColor: colors.brand.DEFAULT, backgroundColor: colors.brand.glow },
  revealIconWrap: { width: 36, height: 36, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg.elevated },
  revealTitle: { fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.secondary },
  revealTitleActive: { color: colors.brand.DEFAULT },
  revealDesc: { fontSize: typography.sizes.xs, color: colors.text.muted, marginTop: 2 },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: colors.border.DEFAULT, alignItems: 'center', justifyContent: 'center' },
  radioActive: { borderColor: colors.brand.DEFAULT },
  radioDot: { width: 11, height: 11, borderRadius: 6, backgroundColor: colors.brand.DEFAULT },
  guestGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.xs },
  guestChip: { paddingHorizontal: spacing.lg, paddingVertical: 10, borderRadius: radius.full, borderWidth: 1, borderColor: colors.border.DEFAULT, backgroundColor: colors.bg.card },
  guestChipActive: { borderColor: colors.brand.DEFAULT, backgroundColor: colors.brand.glow },
  guestChipText: { fontSize: typography.sizes.sm, color: colors.text.muted },
  guestChipTextActive: { color: colors.brand.DEFAULT, fontWeight: typography.weights.semibold },
  reminderOptions: { gap: spacing.sm, marginTop: spacing.xs },
  reminderChip: { padding: spacing.md, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border.DEFAULT, backgroundColor: colors.bg.card, alignItems: 'center' },
  reminderChipActive: { borderColor: colors.brand.DEFAULT, backgroundColor: colors.brand.glow },
  reminderText: { fontSize: typography.sizes.sm, color: colors.text.muted },
  reminderTextActive: { color: colors.brand.DEFAULT, fontWeight: typography.weights.medium },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: spacing.lg, backgroundColor: colors.bg.primary, borderTopWidth: 1, borderTopColor: colors.border.subtle },
});
