import { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue, useAnimatedStyle, withDelay, withTiming, withSpring,
} from 'react-native-reanimated';
import { Linking } from 'react-native';
import { useAuthStore } from '@store/authStore';
import { AuthService } from '@features/auth/services/authService';
import { EventService } from '@features/events/services/eventService';
import { getJoinedEvents, pruneDeletedJoined, JoinedEvent } from '@store/guestEvents';
import { EventType } from '@store/eventStore';
import { Icon, EVENT_TYPE_ICON } from '@shared/components/Icon';
import { GuestArt, HostArt } from '@shared/components/RoleArt';
import { Wordmark } from '@shared/components/Wordmark';
import { LINKS } from '@constants/links';
import { colors, typography, spacing, radius, fonts, gradients } from '@constants/theme';

const { height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { user, setUser } = useAuthStore();
  const [joined, setJoined] = useState<JoinedEvent[] | null>(null);        // all joined (local)
  const [activeJoined, setActiveJoined] = useState<JoinedEvent[] | null>(null); // still live

  // Returning guests: surface their live event(s) so they can jump straight in.
  // Reloads on focus, so a newly joined event — or one the host just ended —
  // updates the card. Offline/error → no card (isActive only lives on the server).
  useFocusEffect(useCallback(() => {
    let alive = true;
    (async () => {
      const list = await getJoinedEvents();
      if (!alive) return;
      setJoined(list);
      if (list.length === 0) { setActiveJoined([]); return; }
      try {
        const { active, existing } = await EventService.joinedStatus(list.map((e) => e.id));
        const kept = await pruneDeletedJoined(existing);   // drop host-deleted events
        if (alive) {
          setJoined(kept);
          setActiveJoined(kept.filter((e) => active.has(e.id)));
        }
      } catch {
        if (alive) setActiveJoined([]);
      }
    })();
    return () => { alive = false; };
  }, []));

  const openJoined = (ev: JoinedEvent) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push({ pathname: '/guest/join', params: { code: ev.code } });
  };

  const headlineOpacity = useSharedValue(0);
  const headlineY = useSharedValue(24);
  const cardsOpacity = useSharedValue(0);
  const cardsY = useSharedValue(28);
  const kickerOpacity = useSharedValue(0);

  useEffect(() => {
    kickerOpacity.value = withDelay(150, withTiming(1, { duration: 600 }));
    headlineOpacity.value = withDelay(300, withTiming(1, { duration: 700 }));
    headlineY.value = withDelay(300, withSpring(0, { damping: 20 }));
    cardsOpacity.value = withDelay(700, withTiming(1, { duration: 600 }));
    cardsY.value = withDelay(700, withSpring(0, { damping: 18 }));
  }, []);

  const kickerStyle = useAnimatedStyle(() => ({ opacity: kickerOpacity.value }));
  const headlineStyle = useAnimatedStyle(() => ({
    opacity: headlineOpacity.value,
    transform: [{ translateY: headlineY.value }],
  }));
  const cardsStyle = useAnimatedStyle(() => ({
    opacity: cardsOpacity.value,
    transform: [{ translateY: cardsY.value }],
  }));

  const handleRole = async (role: 'guest' | 'host') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (role === 'guest') { router.push('/guest/scan'); return; }
    // Host: never force login — continue anonymously; signing in is optional
    // and lives in Settings (it links the anonymous account to preserve data).
    if (user) { router.push('/host/dashboard'); return; }
    try {
      const u = await AuthService.signInAnonymous();
      setUser(u);
      router.push('/host/dashboard');
    } catch {
      router.push({ pathname: '/auth', params: { role: 'host' } });
    }
  };

  return (
    <LinearGradient colors={gradients.page} style={styles.container}>
      <View style={[styles.content, { paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + spacing.lg }]}>

        {/* Top — settings only (language is chosen in Settings) */}
        <Animated.View style={[styles.top, kickerStyle]}>
          <TouchableOpacity onPress={() => router.push('/settings')} style={styles.settingsBtn} activeOpacity={0.7}>
            <Icon name="settings" size={20} color={colors.text.secondary} />
          </TouchableOpacity>
        </Animated.View>

        {/* Logo + headline */}
        <Animated.View style={[styles.headlineBlock, headlineStyle]}>
          <View style={styles.brandRow}>
            <Image source={require('../assets/guestmark.png')} style={styles.mark} resizeMode="contain" />
            <Wordmark size={30} />
          </View>
          <Text style={styles.headline}>{t('welcome.tagline')}</Text>
          <Text style={styles.subtitle}>{t('welcome.subtitle')}</Text>
        </Animated.View>

        {/* Role cards */}
        <Animated.View style={[styles.cards, cardsStyle]}>

          {/* Returning guest — jump straight into a live event, above the roles */}
          {activeJoined && activeJoined.length === 1 && (
            <TouchableOpacity style={styles.resumeCard} onPress={() => openJoined(activeJoined[0])} activeOpacity={0.85}>
              {activeJoined[0].coverImageUrl ? (
                <Image source={{ uri: activeJoined[0].coverImageUrl }} style={styles.resumeCover} />
              ) : (
                <View style={styles.resumeIcon}><Icon name={EVENT_TYPE_ICON[activeJoined[0].type as EventType] ?? 'party'} size={22} color={colors.brand.DEFAULT} /></View>
              )}
              <View style={styles.resumeText}>
                <Text style={styles.resumeName} numberOfLines={1}>{activeJoined[0].name}</Text>
              </View>
              <Icon name="arrowRight" size={18} color={colors.brand.DEFAULT} />
            </TouchableOpacity>
          )}
          {activeJoined && activeJoined.length > 1 && (
            <TouchableOpacity style={styles.resumeCard} onPress={() => { Haptics.selectionAsync(); router.push('/guest/joined'); }} activeOpacity={0.85}>
              <View style={styles.resumeIcon}><Icon name="gallery" size={22} color={colors.brand.DEFAULT} /></View>
              <View style={styles.resumeText}>
                <Text style={styles.resumeName} numberOfLines={1}>{t('guest.myEvents')}</Text>
              </View>
              <Icon name="arrowRight" size={18} color={colors.brand.DEFAULT} />
            </TouchableOpacity>
          )}
          {activeJoined && ((activeJoined.length === 1 && (joined?.length ?? 0) > 1) || (activeJoined.length === 0 && (joined?.length ?? 0) > 0)) && (
            <TouchableOpacity onPress={() => router.push('/guest/joined')} style={styles.archiveLink} activeOpacity={0.7}>
              <Text style={styles.archiveLinkText}>{t('welcome.seeAllEvents', { n: joined?.length ?? 0 })}</Text>
              <Icon name="arrowRight" size={13} color={colors.text.muted} />
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.card} onPress={() => handleRole('guest')} activeOpacity={0.8}>
            <View style={styles.cardIcon}>
              <GuestArt size={44} />
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{t('welcome.iAmGuest')}</Text>
              <Text style={styles.cardSubtitle}>{t('welcome.guestSubtitle')}</Text>
            </View>
            <Icon name="arrowRight" size={18} color={colors.text.muted} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => handleRole('host')} activeOpacity={0.8}>
            <View style={styles.cardIcon}>
              <HostArt size={44} />
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{t('welcome.iAmHost')}</Text>
              <Text style={styles.cardSubtitle}>{t('welcome.hostSubtitle')}</Text>
            </View>
            <Icon name="arrowRight" size={18} color={colors.text.muted} />
          </TouchableOpacity>

          {/* Legal footer (App Store requirement) */}
          <View style={styles.legalRow}>
            <TouchableOpacity onPress={() => Linking.openURL(LINKS.privacy)}><Text style={styles.legalLink}>{t('settings.privacyPolicy')}</Text></TouchableOpacity>
            <Text style={styles.legalDot}>·</Text>
            <TouchableOpacity onPress={() => Linking.openURL(LINKS.terms)}><Text style={styles.legalLink}>{t('settings.termsOfService')}</Text></TouchableOpacity>
            <Text style={styles.legalDot}>·</Text>
            <TouchableOpacity onPress={() => Linking.openURL(LINKS.support)}><Text style={styles.legalLink}>{t('settings.support')}</Text></TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: spacing.lg, justifyContent: 'space-between' },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' },
  settingsBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg.card, borderWidth: 1, borderColor: colors.border.DEFAULT },
  legalRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: spacing.md },
  legalLink: { fontSize: typography.sizes.xs, fontFamily: fonts.body, color: colors.text.muted },
  legalDot: { fontSize: typography.sizes.xs, color: colors.text.muted },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: spacing.md },
  mark: { width: 56, height: 56 },
  headlineBlock: { gap: spacing.sm },
  headline: {
    fontFamily: fonts.displayBold, fontSize: 38, lineHeight: 42,
    color: colors.text.primary, letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: fonts.body, fontSize: typography.sizes.lg,
    color: colors.text.secondary, lineHeight: 26, maxWidth: '90%',
  },
  cards: { gap: spacing.md },
  card: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: colors.bg.card, borderRadius: radius.xl,
    borderWidth: 1, borderColor: colors.border.DEFAULT,
    paddingVertical: spacing.md, paddingHorizontal: spacing.md,
  },
  cardIcon: {
    width: 50, height: 50, borderRadius: radius.md,
    backgroundColor: colors.brand.glow, alignItems: 'center', justifyContent: 'center',
  },
  cardText: { flex: 1, gap: 3 },
  cardTitle: { fontFamily: fonts.displayBold, fontSize: typography.sizes.xl, color: colors.text.primary },
  cardSubtitle: { fontFamily: fonts.body, fontSize: typography.sizes.sm, color: colors.text.muted },
  resumeCard: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: colors.brand.glow, borderRadius: radius.xl,
    borderWidth: 1, borderColor: colors.brand.DEFAULT,
    paddingVertical: spacing.md, paddingHorizontal: spacing.md,
  },
  resumeCover: { width: 50, height: 50, borderRadius: radius.md, backgroundColor: colors.bg.elevated },
  resumeIcon: { width: 50, height: 50, borderRadius: radius.md, backgroundColor: colors.brand.glow, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border.brand },
  resumeText: { flex: 1 },
  resumeName: { fontFamily: fonts.displayBold, fontSize: typography.sizes.xl, color: colors.text.primary },
  archiveLink: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, paddingVertical: spacing.xs, marginTop: -spacing.xs },
  archiveLinkText: { fontFamily: fonts.bodyMedium, fontSize: typography.sizes.sm, color: colors.text.muted },
});
