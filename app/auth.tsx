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
import { colors, typography, spacing, radius } from '@constants/theme';

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
    <LinearGradient colors={['#0A0A0F', '#160A2E', '#0A0A0F']} style={styles.container}>
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
            <Text style={styles.backText}>← {t('common.back')}</Text>
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoMini}>
              <LinearGradient colors={['#A855F7', '#7C3AED']} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: radius.lg }}>
                <Text style={{ fontSize: 22, color: '#fff' }}>◉</Text>
              </LinearGradient>
            </View>
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
              <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
                <Text style={styles.socialIcon}>🍎</Text>
                <Text style={styles.socialLabel}>{t('auth.continueWithApple')}</Text>
              </TouchableOpacity>

              {/* Google */}
              <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
                <Text style={styles.socialIcon}>G</Text>
                <Text style={styles.socialLabel}>{t('auth.continueWithGoogle')}</Text>
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
                <Text style={styles.socialIcon}>✉️</Text>
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
              <Text style={styles.sentEmoji}>📨</Text>
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
  backBtn: { alignSelf: 'flex-start' },
  backText: { color: colors.text.secondary, fontSize: typography.sizes.base },
  header: { alignItems: 'center', gap: spacing.sm },
  logoMini: { width: 56, height: 56, borderRadius: radius.lg, overflow: 'hidden' },
  title: { fontSize: typography.sizes['2xl'], fontWeight: typography.weights.bold, color: colors.text.primary, textAlign: 'center' },
  subtitle: { fontSize: typography.sizes.sm, color: colors.text.muted, textAlign: 'center', lineHeight: 20, paddingHorizontal: spacing.lg },
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
  socialIcon: { fontSize: 20, width: 28, textAlign: 'center', color: colors.text.primary, fontWeight: typography.weights.bold },
  socialLabel: { fontSize: typography.sizes.base, fontWeight: typography.weights.medium, color: colors.text.primary },
  divider: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border.subtle },
  dividerText: { color: colors.text.muted, fontSize: typography.sizes.sm },
  anonNote: { textAlign: 'center', color: colors.text.muted, fontSize: typography.sizes.xs },
  sentContainer: { alignItems: 'center', gap: spacing.lg },
  sentEmoji: { fontSize: 64 },
  sentHint: { color: colors.text.secondary, textAlign: 'center', fontSize: typography.sizes.sm },
  terms: { textAlign: 'center', color: colors.text.muted, fontSize: typography.sizes.xs, lineHeight: 18 },
});
