import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import { AuthService } from '@features/auth/services/authService';
import { useAuthStore } from '@store/authStore';
import { PrimaryButton } from '@shared/components/PrimaryButton';
import { InputField } from '@shared/components/InputField';
import { Icon, BrandIcon } from '@shared/components/Icon';
import { colors, typography, spacing, radius, fonts, gradients } from '@constants/theme';

type AuthStep = 'options' | 'email' | 'sent';

export default function AuthScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ role: string }>();
  const { setUser, setLoading, isLoading } = useAuthStore();

  const [step, setStep] = useState<AuthStep>('options');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleAnonymous = async () => {
    try {
      setLoading(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      const user = await AuthService.signInAnonymous();
      setUser(user);
      navigateAfterAuth();
    } catch (e) {
      Alert.alert(t('common.error'), t('errors.unknownError'));
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async () => {
    if (!email || !email.includes('@')) {
      setEmailError(t('auth.email') + ' geçersiz');
      return;
    }
    try {
      setLoading(true);
      await AuthService.sendMagicLink(email);
      setStep('sent');
    } catch {
      Alert.alert(t('common.error'), t('errors.unknownError'));
    } finally {
      setLoading(false);
    }
  };

  const navigateAfterAuth = () => {
    if (params.role === 'host') {
      router.replace('/host/dashboard');
    } else {
      router.replace('/guest/scan');
    }
  };

  return (
    <LinearGradient colors={gradients.page} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.xl }]}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back */}
          <TouchableOpacity onPress={() => (step === 'options' ? router.back() : setStep('options'))} style={styles.backBtn}>
            <Icon name="arrowLeft" size={18} color={colors.text.secondary} />
            <Text style={styles.backText}>{t('common.back')}</Text>
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <Image source={require('../assets/guestlogo.png')} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>
              {step === 'sent' ? t('auth.magicLinkSent') : t('auth.signIn')}
            </Text>
            <Text style={styles.subtitle}>
              {step === 'sent'
                ? t('auth.magicLinkDescription').replace('{{email}}', email)
                : params.role === 'host'
                  ? t('welcome.hostSubtitle')
                  : t('welcome.guestSubtitle')}
            </Text>
          </View>

          {step === 'options' && (
            <View style={styles.options}>
              {/* Apple */}
              <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8} onPress={() => Alert.alert(t('auth.socialSoonTitle'), t('auth.socialSoon'))}>
                <View style={styles.socialIconWrap}>
                  <BrandIcon brand="apple" size={20} color={colors.text.primary} />
                </View>
                <Text style={styles.socialLabel}>{t('auth.continueWithApple')}</Text>
                <Text style={styles.soonTag}>{t('auth.soonShort')}</Text>
              </TouchableOpacity>

              {/* Google */}
              <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8} onPress={() => Alert.alert(t('auth.socialSoonTitle'), t('auth.socialSoon'))}>
                <View style={styles.socialIconWrap}>
                  <BrandIcon brand="google" size={18} color={colors.text.primary} />
                </View>
                <Text style={styles.socialLabel}>{t('auth.continueWithGoogle')}</Text>
                <Text style={styles.soonTag}>{t('auth.soonShort')}</Text>
              </TouchableOpacity>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>{t('common.or')}</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Email */}
              <TouchableOpacity
                style={[styles.socialBtn, styles.emailBtn]}
                onPress={() => setStep('email')}
                activeOpacity={0.8}
              >
                <View style={styles.socialIconWrap}>
                  <Icon name="mail" size={20} color={colors.brand.light} />
                </View>
                <Text style={styles.socialLabel}>{t('auth.continueWithMagicLink')}</Text>
              </TouchableOpacity>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>{t('common.or')}</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Anonymous */}
              <PrimaryButton
                label={t('auth.continueAnonymously')}
                onPress={handleAnonymous}
                variant="ghost"
                loading={isLoading}
              />
              <Text style={styles.anonNote}>{t('auth.anonymousNote')}</Text>
            </View>
          )}

          {step === 'email' && (
            <View style={styles.options}>
              <InputField
                label={t('auth.email')}
                placeholder={t('auth.emailPlaceholder')}
                value={email}
                onChangeText={(v) => { setEmail(v); setEmailError(''); }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoFocus
                error={emailError}
              />
              <PrimaryButton
                label={t('auth.continueWithMagicLink')}
                onPress={handleMagicLink}
                loading={isLoading}
              />
            </View>
          )}

          {step === 'sent' && (
            <View style={styles.sentContainer}>
              <View style={styles.sentIconWrap}>
                <Icon name="mail" size={40} color={colors.brand.light} strokeWidth={1.8} />
              </View>
              <Text style={styles.sentHint}>Gelen kutunu veya spam klasörünü kontrol et.</Text>
              <PrimaryButton
                label={t('common.back')}
                onPress={() => setStep('options')}
                variant="ghost"
              />
            </View>
          )}

          <Text style={styles.terms}>{t('auth.termsNote')}</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: spacing.lg, gap: spacing.xl },
  backBtn: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6 },
  backText: { color: colors.text.secondary, fontSize: typography.sizes.base },
  header: { alignItems: 'center', gap: spacing.sm },
  logo: { height: 72, aspectRatio: 1.83, marginBottom: spacing.xs },
  title: { fontSize: typography.sizes['3xl'], fontFamily: fonts.displayBold, color: colors.text.primary, textAlign: 'center' },
  subtitle: { fontSize: typography.sizes.sm, fontFamily: fonts.body, color: colors.text.muted, textAlign: 'center', lineHeight: 20, paddingHorizontal: spacing.lg },
  options: { gap: spacing.md },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.bg.card,
    borderWidth: 1,
    borderColor: colors.border.DEFAULT,
    borderRadius: radius.xl,
    paddingVertical: 16,
    paddingHorizontal: spacing.lg,
  },
  emailBtn: { borderColor: colors.border.brand },
  socialIconWrap: { width: 28, alignItems: 'center', justifyContent: 'center' },
  socialLabel: { flex: 1, fontSize: typography.sizes.base, fontFamily: fonts.bodyMedium, color: colors.text.primary },
  soonTag: { fontSize: typography.sizes.xs, fontFamily: fonts.bodySemibold, color: colors.text.muted, backgroundColor: colors.bg.elevated, borderRadius: radius.full, paddingHorizontal: 8, paddingVertical: 3, overflow: 'hidden' },
  divider: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border.subtle },
  dividerText: { color: colors.text.muted, fontSize: typography.sizes.sm },
  anonNote: { textAlign: 'center', color: colors.text.muted, fontSize: typography.sizes.xs },
  sentContainer: { alignItems: 'center', gap: spacing.lg },
  sentIconWrap: { width: 88, height: 88, borderRadius: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.brand.glow, borderWidth: 1, borderColor: colors.border.brand },
  sentHint: { color: colors.text.secondary, textAlign: 'center', fontSize: typography.sizes.sm },
  terms: { textAlign: 'center', color: colors.text.muted, fontSize: typography.sizes.xs, lineHeight: 18 },
});
