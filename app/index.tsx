import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue, useAnimatedStyle, withDelay, withTiming, withSpring,
} from 'react-native-reanimated';
import { useAuthStore } from '@store/authStore';
import { Icon } from '@shared/components/Icon';
import { colors, typography, spacing, radius, fonts, gradients } from '@constants/theme';

const { height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { user } = useAuthStore();

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

  const handleRole = (role: 'guest' | 'host') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (role === 'guest') {
      router.push('/guest/scan');
    } else {
      router.push(user ? '/host/dashboard' : { pathname: '/auth', params: { role: 'host' } });
    }
  };

  return (
    <LinearGradient colors={gradients.page} style={styles.container}>
      <View style={[styles.content, { paddingTop: insets.top + height * 0.08, paddingBottom: insets.bottom + spacing.xl }]}>

        {/* Top — logo */}
        <Animated.View style={[styles.top, kickerStyle]}>
          <Image source={require('../assets/guestlogo.png')} style={styles.logo} resizeMode="contain" />
        </Animated.View>

        {/* Headline */}
        <Animated.View style={[styles.headlineBlock, headlineStyle]}>
          <Text style={styles.headline}>{t('welcome.tagline')}</Text>
          <Text style={styles.subtitle}>{t('welcome.subtitle')}</Text>
        </Animated.View>

        {/* Role cards */}
        <Animated.View style={[styles.cards, cardsStyle]}>
          <TouchableOpacity style={styles.card} onPress={() => handleRole('guest')} activeOpacity={0.8}>
            <View style={styles.cardIcon}>
              <Icon name="camera" size={22} color={colors.brand.DEFAULT} />
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{t('welcome.iAmGuest')}</Text>
              <Text style={styles.cardSubtitle}>{t('welcome.guestSubtitle')}</Text>
            </View>
            <Icon name="arrowRight" size={18} color={colors.text.muted} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => handleRole('host')} activeOpacity={0.8}>
            <View style={styles.cardIcon}>
              <Icon name="party" size={22} color={colors.brand.DEFAULT} />
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{t('welcome.iAmHost')}</Text>
              <Text style={styles.cardSubtitle}>{t('welcome.hostSubtitle')}</Text>
            </View>
            <Icon name="arrowRight" size={18} color={colors.text.muted} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: spacing.lg, justifyContent: 'space-between' },
  top: { alignItems: 'flex-start' },
  logo: { height: 42, aspectRatio: 1.83 },
  headlineBlock: { gap: spacing.md, marginTop: spacing.xl },
  headline: {
    fontFamily: fonts.displayBold, fontSize: 46, lineHeight: 50,
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
});
