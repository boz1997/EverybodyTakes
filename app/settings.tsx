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
import { logError } from '@shared/errorLog';
import { registerPushTokenForUser } from '@shared/notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@lib/firebase';
import { Icon, IconName, BrandIcon } from '@shared/components/Icon';
import { InputField } from '@shared/components/InputField';
import { LINKS } from '@constants/links';
import { colors, typography, spacing, radius, fonts, gradients } from '@constants/theme';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { user, setUser, reset } = useAuthStore();
  const [deleting, setDeleting] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [emailVal, setEmailVal] = useState('');
  const [pwVal, setPwVal] = useState('');
  const [emailBusy, setEmailBusy] = useState(false);
  const [notifOn, setNotifOn] = useState(true);

  // Device-wide notification switch. "off" clears the push token so the Cloud
  // Functions have nowhere to send; "on" re-registers it.
  useEffect(() => { AsyncStorage.getItem('@guestcam_notif').then((v) => setNotifOn(v !== 'off')); }, []);
  const toggleNotif = async () => {
    const next = !notifOn;
    setNotifOn(next);
    await AsyncStorage.setItem('@guestcam_notif', next ? 'on' : 'off');
    if (!user) return;
    if (next) await registerPushTokenForUser(user.uid);
    else await setDoc(doc(db, 'users', user.uid), { pushToken: null }, { merge: true }).catch(() => {});
  };

  const signedIn = !!user && !user.isAnonymous;
  const openLink = (url: string) => Linking.openURL(url).catch(() => Alert.alert(t('common.error')));

  const isCancel = (e: unknown) => {
    const code = (e as { code?: string })?.code;
    const msg = ((e as { message?: string })?.message ?? '').toLowerCase();
    return msg === 'cancelled' || msg.includes('cancel') || code === 'ERR_REQUEST_CANCELED'
      || code === 'ERR_CANCELED' || code === 'SIGN_IN_CANCELLED' || code === '-5' || code === '12501';
  };

  const handleApple = async () => {
    try { setUser(await AuthService.signInWithApple()); }
    catch (e: unknown) { if (!isCancel(e)) { logError('apple_signin', e); Alert.alert(t('common.error'), t('auth.appleSignInFailed')); } }
  };

  const handleGoogle = async () => {
    try { setUser(await AuthService.signInWithGoogle()); }
    catch (e: unknown) { if (!isCancel(e)) { logError('google_signin', e); Alert.alert(t('common.error'), t('errors.unknownError')); } }
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

        {/* Notifications — device-wide on/off (default on) */}
        <Text style={styles.sectionTitle}>{t('settings.notifications')}</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.row} onPress={toggleNotif} activeOpacity={0.8}>
            <Icon name="bell" size={20} color={notifOn ? colors.brand.DEFAULT : colors.text.muted} />
            <View style={{ flex: 1 }}>
              <Text style={styles.rowLabel}>{t('settings.eventNotifications')}</Text>
              <Text style={styles.deleteHint}>{t('settings.eventNotificationsDesc')}</Text>
            </View>
            <View style={[styles.toggle, notifOn && styles.toggleOn]}>
              <View style={[styles.toggleThumb, notifOn && styles.toggleThumbOn]} />
            </View>
          </TouchableOpacity>
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
              <TouchableOpacity style={styles.googleBtn} onPress={handleGoogle} activeOpacity={0.85}>
                <BrandIcon brand="google" size={18} color={colors.text.primary} />
                <Text style={styles.googleBtnText}>{t('auth.continueWithGoogle')}</Text>
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
          {/* Always visible — App Store 5.1.1(v) requires a discoverable account
              deletion entry point regardless of how much data the user has. */}
          <View style={styles.divider} />
          {linkRow('trash', deleting ? t('settings.deleting') : t('settings.deleteAccount'), confirmDelete, true)}
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
  toggle: { width: 44, height: 26, borderRadius: 13, backgroundColor: colors.border.DEFAULT, justifyContent: 'center', padding: 2 },
  toggleOn: { backgroundColor: colors.brand.DEFAULT },
  toggleThumb: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#fff' },
  toggleThumbOn: { marginLeft: 18 },
  rowLabel: { flex: 1, fontSize: typography.sizes.base, fontFamily: fonts.bodyMedium, color: colors.text.primary },
  divider: { height: 1, backgroundColor: colors.border.subtle },
  deleteHint: { fontSize: typography.sizes.xs, fontFamily: fonts.body, color: colors.text.muted, paddingBottom: spacing.sm, paddingHorizontal: 2, lineHeight: 16 },
  signInBlock: { paddingVertical: spacing.md, gap: spacing.sm },
  signInTitle: { fontSize: typography.sizes.base, fontFamily: fonts.bodySemibold, color: colors.text.primary },
  signInDesc: { fontSize: typography.sizes.xs, fontFamily: fonts.body, color: colors.text.muted, lineHeight: 16, marginBottom: spacing.xs },
  appleBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, height: 50, borderRadius: radius.lg, backgroundColor: '#000' },
  appleBtnText: { color: '#fff', fontSize: typography.sizes.base, fontFamily: fonts.bodySemibold },
  googleBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, height: 50, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border.DEFAULT, backgroundColor: colors.bg.elevated, paddingHorizontal: spacing.lg },
  googleBtnText: { color: colors.text.primary, fontSize: typography.sizes.base, fontFamily: fonts.bodySemibold },
  soonTag: { fontSize: typography.sizes.xs, fontFamily: fonts.bodySemibold, color: colors.text.muted, backgroundColor: colors.bg.card, borderRadius: radius.full, paddingHorizontal: 8, paddingVertical: 3, overflow: 'hidden' },
  emailForm: { gap: spacing.sm },
  emailSubmit: { height: 50, borderRadius: radius.lg, backgroundColor: colors.brand.DEFAULT, alignItems: 'center', justifyContent: 'center' },
  emailSubmitText: { color: '#fff', fontSize: typography.sizes.base, fontFamily: fonts.bodySemibold },
  version: { textAlign: 'center', color: colors.text.muted, fontSize: typography.sizes.xs, marginTop: spacing.xl },
});
