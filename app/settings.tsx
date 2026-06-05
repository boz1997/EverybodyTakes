import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Linking, Platform,
} from 'react-native';
import Constants from 'expo-constants';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { AuthService } from '@features/auth/services/authService';
import { EventService } from '@features/events/services/eventService';
import { useAuthStore } from '@store/authStore';
import { getJoinedEvents, clearAllLocal } from '@store/guestEvents';
import { LanguageToggle } from '@shared/components/LanguageToggle';
import { Icon, IconName, BrandIcon } from '@shared/components/Icon';
import { InputField } from '@shared/components/InputField';
import { LINKS } from '@constants/links';
import { colors, typography, spacing, radius, fonts, gradients } from '@constants/theme';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { user, setUser, reset } = useAuthStore();
  const [deleting, setDeleting] = useState(false);
  // Only surface account deletion once there's actually something to delete —
  // a brand-new visitor who hasn't joined or hosted anything has no data yet.
  const [hasData, setHasData] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [emailVal, setEmailVal] = useState('');
  const [pwVal, setPwVal] = useState('');
  const [emailBusy, setEmailBusy] = useState(false);

  useEffect(() => {
    (async () => {
      const joined = await getJoinedEvents();
      const hosted = user ? await EventService.getHostEvents(user.uid).catch(() => []) : [];
      setHasData(joined.length > 0 || hosted.length > 0 || !!user?.email);
    })();
  }, [user]);

  const signedIn = !!user && !user.isAnonymous;
  const openLink = (url: string) => Linking.openURL(url).catch(() => Alert.alert(t('common.error')));

  const handleApple = async () => {
    try {
      const u = await AuthService.signInWithApple();
      setUser(u);
    } catch (e: unknown) {
      const code = (e as { code?: string })?.code;
      if (code === 'ERR_REQUEST_CANCELED' || code === 'ERR_CANCELED') return;
      Alert.alert(t('common.error'), String((e as { message?: string })?.message ?? e));
    }
  };

  const handleEmail = async () => {
    if (!emailVal.includes('@') || pwVal.length < 6) {
      Alert.alert(t('auth.emailPasswordHint'));
      return;
    }
    try {
      setEmailBusy(true);
      const u = await AuthService.signInWithEmail(emailVal, pwVal);
      setUser(u);
    } catch (e: unknown) {
      const msg = (e as { message?: string })?.message === 'wrong-password'
        ? t('auth.wrongPassword')
        : t('errors.unknownError');
      Alert.alert(t('common.error'), msg);
    } finally {
      setEmailBusy(false);
    }
  };

  const confirmSignOut = () => {
    Alert.alert(t('settings.logout'), t('settings.logoutConfirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('settings.logout'), style: 'destructive',
        onPress: async () => { await AuthService.signOut().catch(() => {}); reset(); router.replace('/'); },
      },
    ]);
  };

  const linkRow = (icon: IconName, label: string, onPress: () => void, danger = false) => (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7} disabled={deleting}>
      <Icon name={icon} size={20} color={danger ? colors.error : colors.text.secondary} />
      <Text style={[styles.rowLabel, danger && { color: colors.error }]}>{label}</Text>
      {!danger && <Icon name="arrowRight" size={16} color={colors.text.muted} />}
    </TouchableOpacity>
  );

  const confirmDelete = () => {
    Alert.alert(
      t('settings.deleteAccountConfirmTitle'),
      t('settings.deleteAccountConfirmBody'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { text: t('common.delete'), style: 'destructive', onPress: runDelete },
      ],
    );
  };

  const runDelete = async () => {
    try {
      setDeleting(true);
      const joined = await getJoinedEvents();
      if (user) await EventService.purgeUserData(user.uid, joined.map((e) => e.id));
      await clearAllLocal();
      // Best-effort: deleting the auth user can require a recent login; either way
      // we clear local state and return the user to the welcome screen.
      await AuthService.deleteAccount().catch(() => AuthService.signOut().catch(() => {}));
      reset();
      Alert.alert(t('settings.deleteAccountDone'));
      router.replace('/');
    } catch (e: unknown) {
      Alert.alert(t('common.error'), String((e as { message?: string })?.message ?? e));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <LinearGradient colors={gradients.page} style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scroll, { paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + spacing.xl }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Icon name="arrowLeft" size={18} color={colors.text.secondary} />
          <Text style={styles.backText}>{t('common.back')}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{t('settings.title')}</Text>

        {/* Language */}
        <Text style={styles.sectionTitle}>{t('settings.language')}</Text>
        <View style={styles.langRow}>
          <LanguageToggle />
        </View>

        {/* Legal & Support */}
        <Text style={styles.sectionTitle}>{t('settings.legalSection')}</Text>
        <View style={styles.card}>
          {linkRow('lock', t('settings.privacyPolicy'), () => openLink(LINKS.privacy))}
          <View style={styles.divider} />
          {linkRow('film', t('settings.termsOfService'), () => openLink(LINKS.terms))}
          <View style={styles.divider} />
          {linkRow('mail', t('settings.support'), () => openLink(LINKS.support))}
        </View>

        {/* Account */}
        <Text style={styles.sectionTitle}>{t('settings.account')}</Text>
        <View style={styles.card}>
          {signedIn ? (
            <>
              <View style={styles.row}>
                <Icon name="users" size={20} color={colors.brand.DEFAULT} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.rowLabel}>{user?.email ?? user?.displayName ?? t('settings.signedIn')}</Text>
                  <Text style={styles.deleteHint}>{t('settings.signedIn')}</Text>
                </View>
              </View>
              <View style={styles.divider} />
              {linkRow('arrowRight', t('settings.logout'), confirmSignOut)}
            </>
          ) : (
            <View style={styles.signInBlock}>
              <Text style={styles.signInTitle}>{t('settings.signInSave')}</Text>
              <Text style={styles.signInDesc}>{t('settings.signInSaveDesc')}</Text>
              {Platform.OS === 'ios' && (
                <TouchableOpacity style={styles.appleBtn} onPress={handleApple} activeOpacity={0.85}>
                  <BrandIcon brand="apple" size={18} color="#fff" />
                  <Text style={styles.appleBtnText}>{t('auth.continueWithApple')}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.googleBtn}
                onPress={() => Alert.alert(t('auth.socialSoonTitle'), t('auth.socialSoon'))}
                activeOpacity={0.85}
              >
                <BrandIcon brand="google" size={18} color={colors.text.primary} />
                <Text style={styles.googleBtnText}>{t('auth.continueWithGoogle')}</Text>
                <Text style={styles.soonTag}>{t('auth.soonShort')}</Text>
              </TouchableOpacity>

              {!emailOpen ? (
                <TouchableOpacity style={styles.googleBtn} onPress={() => setEmailOpen(true)} activeOpacity={0.85}>
                  <Icon name="mail" size={18} color={colors.brand.light} />
                  <Text style={styles.googleBtnText}>{t('auth.continueWithEmail')}</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.emailForm}>
                  <InputField label={t('auth.email')} placeholder={t('auth.emailPlaceholder')} value={emailVal} onChangeText={setEmailVal} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
                  <InputField label={t('auth.password')} placeholder={t('auth.passwordPlaceholder')} value={pwVal} onChangeText={setPwVal} secureTextEntry />
                  <TouchableOpacity style={styles.emailSubmit} onPress={handleEmail} activeOpacity={0.85} disabled={emailBusy}>
                    <Text style={styles.emailSubmitText}>{emailBusy ? t('common.loading') : t('common.continue')}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
          {hasData && (
            <>
              <View style={styles.divider} />
              {linkRow('trash', deleting ? t('settings.deleting') : t('settings.deleteAccount'), confirmDelete, true)}
            </>
          )}
        </View>

        <Text style={styles.version}>
          {t('settings.version')} {Constants.expoConfig?.version ?? '1.0.0'}
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: spacing.lg, gap: spacing.sm },
  backBtn: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6 },
  backText: { color: colors.text.secondary, fontSize: typography.sizes.base, fontFamily: fonts.body },
  title: { fontSize: typography.sizes['3xl'], fontFamily: fonts.displayBold, color: colors.text.primary, marginTop: spacing.sm, marginBottom: spacing.md },
  sectionTitle: { fontSize: typography.sizes.xs, fontFamily: fonts.bodySemibold, color: colors.brand.DEFAULT, letterSpacing: 1, textTransform: 'uppercase', marginTop: spacing.lg, marginBottom: spacing.xs },
  card: { backgroundColor: colors.bg.card, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border.DEFAULT, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  langRow: { alignItems: 'flex-start' },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: 14 },
  rowLabel: { flex: 1, fontSize: typography.sizes.base, fontFamily: fonts.bodyMedium, color: colors.text.primary },
  divider: { height: 1, backgroundColor: colors.border.subtle },
  deleteHint: { fontSize: typography.sizes.xs, fontFamily: fonts.body, color: colors.text.muted, paddingBottom: spacing.sm, paddingHorizontal: 2, lineHeight: 16 },
  signInBlock: { paddingVertical: spacing.md, gap: spacing.sm },
  signInTitle: { fontSize: typography.sizes.base, fontFamily: fonts.bodySemibold, color: colors.text.primary },
  signInDesc: { fontSize: typography.sizes.xs, fontFamily: fonts.body, color: colors.text.muted, lineHeight: 16, marginBottom: spacing.xs },
  appleBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, height: 50, borderRadius: radius.lg, backgroundColor: '#000' },
  appleBtnText: { color: '#fff', fontSize: typography.sizes.base, fontFamily: fonts.bodySemibold },
  googleBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, height: 50, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border.DEFAULT, backgroundColor: colors.bg.elevated, paddingHorizontal: spacing.lg },
  googleBtnText: { flex: 1, color: colors.text.primary, fontSize: typography.sizes.base, fontFamily: fonts.bodyMedium },
  soonTag: { fontSize: typography.sizes.xs, fontFamily: fonts.bodySemibold, color: colors.text.muted, backgroundColor: colors.bg.card, borderRadius: radius.full, paddingHorizontal: 8, paddingVertical: 3, overflow: 'hidden' },
  emailForm: { gap: spacing.sm },
  emailSubmit: { height: 50, borderRadius: radius.lg, backgroundColor: colors.brand.DEFAULT, alignItems: 'center', justifyContent: 'center' },
  emailSubmitText: { color: '#fff', fontSize: typography.sizes.base, fontFamily: fonts.bodySemibold },
  version: { textAlign: 'center', color: colors.text.muted, fontSize: typography.sizes.xs, marginTop: spacing.xl },
});
