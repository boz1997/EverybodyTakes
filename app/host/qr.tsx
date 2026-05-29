import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-native-qrcode-svg';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Icon } from '@shared/components/Icon';
import { colors, typography, spacing, radius, fonts, gradients } from '@constants/theme';

export default function QRScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { id, code } = useLocalSearchParams<{ id: string; code: string }>();
  const [copied, setCopied] = useState(false);

  const eventUrl = `https://guestcam.app/e/${code}`;

  const handleShare = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await Share.share({
      message: `${t('host.eventCreated')}\n\n${eventUrl}`,
      url: eventUrl,
    });
  };

  const handleCopy = () => {
    Clipboard.setStringAsync(eventUrl);
    setCopied(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <LinearGradient colors={gradients.page} style={styles.container}>
      <View style={styles.glow} pointerEvents="none" />

      <View style={[styles.content, { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.xl }]}>

        {/* Header */}
        <Animated.View entering={FadeInUp.delay(100)} style={styles.header}>
          <View style={styles.checkmark}>
            <Icon name="check" size={32} color={colors.success} strokeWidth={2.4} />
          </View>
          <Text style={styles.title}>{t('host.eventCreated')}</Text>
          <Text style={styles.subtitle}>{t('host.eventCreatedSubtitle')}</Text>
        </Animated.View>

        {/* QR Code Card */}
        <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.qrCard}>
          <LinearGradient colors={['rgba(190,106,46,0.10)', 'rgba(190,106,46,0.04)']} style={styles.qrCardGradient}>
            {/* QR */}
            <View style={styles.qrWrap}>
              <View style={styles.qrInner}>
                <QRCode
                  value={eventUrl}
                  size={220}
                  backgroundColor="#FFFFFF"
                  color={colors.text.primary}
                />
              </View>
              {/* Corner decorations */}
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />
            </View>

            {/* Event code — shown prominently, not as a URL */}
            <View style={styles.codeBlock}>
              <Text style={styles.codeLabel}>{t('host.eventCodeLabel')}</Text>
              <Text style={styles.codeValue}>{code}</Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* URL + Copy */}
        <Animated.View entering={FadeInDown.delay(500)} style={styles.urlRow}>
          <View style={styles.urlPill}>
            <Text style={styles.urlText} numberOfLines={1}>{eventUrl}</Text>
          </View>
          <TouchableOpacity onPress={handleCopy} style={styles.copyBtn} activeOpacity={0.8}>
            <LinearGradient colors={copied ? ['#22C55E', '#16A34A'] : ['#2A2A3A', '#1A1A24']} style={styles.copyBtnGradient}>
              <Icon name={copied ? 'check' : 'copy'} size={18} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Actions */}
        <Animated.View entering={FadeInDown.delay(600)} style={styles.actions}>
          <TouchableOpacity onPress={handleShare} style={styles.actionBtn} activeOpacity={0.85}>
            <LinearGradient colors={gradients.amber} style={styles.actionBtnGradient}>
              <Icon name="share" size={18} color="#fff" />
              <Text style={styles.actionText}>{t('host.shareQR')}</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace({ pathname: '/host/event', params: { id } })}
            style={styles.actionBtn}
            activeOpacity={0.85}
          >
            <View style={styles.actionBtnOutline}>
              <Icon name="settings" size={18} color={colors.text.primary} />
              <Text style={styles.actionTextOutline}>{t('host.manageEvent')}</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Dashboard */}
        <TouchableOpacity onPress={() => router.replace('/host/dashboard')} activeOpacity={0.7}>
          <View style={styles.dashboardLinkRow}>
            <Text style={styles.dashboardLink}>{t('host.dashboard')}</Text>
            <Icon name="arrowRight" size={16} color={colors.text.muted} />
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  glow: { position: 'absolute', top: -30, left: '20%', width: '60%', height: 250, borderRadius: 250, backgroundColor: 'rgba(190,106,46,0.10)' },
  content: { flex: 1, paddingHorizontal: spacing.lg, alignItems: 'center', justifyContent: 'space-between' },
  header: { alignItems: 'center', gap: spacing.sm },
  checkmark: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(34,197,94,0.12)', borderWidth: 1, borderColor: 'rgba(34,197,94,0.3)' },
  title: { fontSize: typography.sizes['2xl'], fontFamily: fonts.displayBold, color: colors.text.primary, textAlign: 'center' },
  subtitle: { fontSize: typography.sizes.sm, color: colors.text.muted, textAlign: 'center' },
  qrCard: { width: '100%', borderRadius: radius['2xl'], overflow: 'hidden', borderWidth: 1, borderColor: colors.border.brand },
  qrCardGradient: { alignItems: 'center', padding: spacing.xl, gap: spacing.lg },
  qrWrap: { position: 'relative', padding: spacing.md },
  qrInner: { padding: spacing.md, backgroundColor: '#FFFFFF', borderRadius: radius.xl },
  corner: { position: 'absolute', width: 20, height: 20, borderColor: colors.brand.DEFAULT, borderWidth: 2 },
  cornerTL: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 6 },
  cornerTR: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 6 },
  cornerBL: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 6 },
  cornerBR: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 6 },
  codeBlock: { alignItems: 'center', gap: 4 },
  codeLabel: { fontSize: typography.sizes.xs, fontFamily: fonts.bodySemibold, color: colors.text.muted, letterSpacing: 2, textTransform: 'uppercase' },
  codeValue: { fontSize: typography.sizes['3xl'], fontFamily: fonts.displayBold, color: colors.text.primary, letterSpacing: 6 },
  urlRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, width: '100%' },
  urlPill: { flex: 1, backgroundColor: colors.bg.card, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border.DEFAULT, paddingHorizontal: spacing.md, paddingVertical: 12 },
  urlText: { color: colors.text.secondary, fontSize: typography.sizes.sm },
  copyBtn: { width: 46, height: 46, borderRadius: radius.xl, overflow: 'hidden' },
  copyBtnGradient: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  copyIcon: { fontSize: 18, color: '#fff' },
  actions: { flexDirection: 'row', gap: spacing.md, width: '100%' },
  actionBtn: { flex: 1, borderRadius: radius.xl, overflow: 'hidden', height: 52 },
  actionBtnGradient: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  actionBtnOutline: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderWidth: 1, borderColor: colors.border.DEFAULT, borderRadius: radius.xl, height: 52 },
  actionText: { fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: '#fff' },
  actionTextOutline: { fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.text.primary },
  dashboardLinkRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dashboardLink: { color: colors.text.muted, fontSize: typography.sizes.sm },
});
