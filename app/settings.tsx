import { useState } from 'react';
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
import { Icon, IconName } from '@shared/components/Icon';
import { LINKS } from '@constants/links';
import { colors, typography, spacing, radius, fonts, gradients } from '@constants/theme';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { user, reset } = useAuthStore();
  const [deleting, setDeleting] = useState(false);

  const openLink = (url: string) => Linking.openURL(url).catch(() => Alert.alert(t('common.error')));

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
        <View style={styles.card}>
          <View style={styles.langRow}>
            <LanguageToggle />
          </View>
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
          {linkRow('trash', deleting ? t('settings.deleting') : t('settings.deleteAccount'), confirmDelete, true)}
          <Text style={styles.deleteHint}>{t('settings.deleteAccountDesc')}</Text>
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
  langRow: { paddingVertical: spacing.sm, alignItems: 'flex-start' },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: 14 },
  rowLabel: { flex: 1, fontSize: typography.sizes.base, fontFamily: fonts.bodyMedium, color: colors.text.primary },
  divider: { height: 1, backgroundColor: colors.border.subtle },
  deleteHint: { fontSize: typography.sizes.xs, fontFamily: fonts.body, color: colors.text.muted, paddingBottom: spacing.sm, paddingHorizontal: 2, lineHeight: 16 },
  version: { textAlign: 'center', color: colors.text.muted, fontSize: typography.sizes.xs, marginTop: spacing.xl },
});
