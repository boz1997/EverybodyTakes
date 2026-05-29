import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { useAuthStore } from '@store/authStore';
import { Icon } from '@shared/components/Icon';
import { colors, typography, spacing, radius } from '@constants/theme';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const { t } = useTranslation();
  const { isInitialized, user } = useAuthStore();

  const logoOpacity = useSharedValue(0);
  const logoY = useSharedValue(30);
  const taglineOpacity = useSharedValue(0);
  const buttonsOpacity = useSharedValue(0);
  const buttonsY = useSharedValue(40);

  useEffect(() => {
    logoOpacity.value = withDelay(200, withTiming(1, { duration: 700 }));
    logoY.value = withDelay(200, withSpring(0, { damping: 20 }));
    taglineOpacity.value = withDelay(600, withTiming(1, { duration: 600 }));
    buttonsOpacity.value = withDelay(900, withTiming(1, { duration: 500 }));
    buttonsY.value = withDelay(900, withSpring(0, { damping: 18 }));
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ translateY: logoY.value }],
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
  }));

  const buttonsStyle = useAnimatedStyle(() => ({
    opacity: buttonsOpacity.value,
    transform: [{ translateY: buttonsY.value }],
  }));

  const handleRole = (role: 'guest' | 'host') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (role === 'guest') {
      router.push('/guest/scan');
    } else {
      if (user) {
        router.push('/host/dashboard');
      } else {
        router.push({ pathname: '/auth', params: { role: 'host' } });
      }
    }
  };

  return (
    <LinearGradient
      colors={['#0A0A0F', '#160A2E', '#0A0A0F']}
      locations={[0, 0.5, 1]}
      style={styles.container}
    >
      {/* Ambient glow */}
      <View style={styles.glowTop} pointerEvents="none" />
      <View style={styles.glowBottom} pointerEvents="none" />

      {/* Film grain overlay feel */}
      <View style={styles.content}>

        {/* Logo + Brand */}
        <Animated.View style={[styles.logoSection, logoStyle]}>
          <View style={styles.logoMark}>
            <LinearGradient
              colors={['#A855F7', '#7C3AED']}
              style={styles.logoGradient}
            >
              <Icon name="camera" size={36} color="#fff" strokeWidth={2.2} />
            </LinearGradient>
          </View>
          <Text style={styles.brandName}>GuestCam</Text>
        </Animated.View>

        {/* Tagline */}
        <Animated.View style={[styles.taglineSection, taglineStyle]}>
          <Text style={styles.tagline}>{t('welcome.tagline')}</Text>
          <Text style={styles.subtitle}>{t('welcome.subtitle')}</Text>
        </Animated.View>

        {/* Role Buttons */}
        <Animated.View style={[styles.buttonsSection, buttonsStyle]}>

          {/* Guest Button */}
          <TouchableOpacity
            style={styles.roleCard}
            onPress={() => handleRole('guest')}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={['rgba(168,85,247,0.15)', 'rgba(168,85,247,0.05)']}
              style={styles.roleCardGradient}
            >
              <View style={styles.roleIconWrap}>
                <Icon name="camera" size={24} color={colors.brand.light} />
              </View>
              <View style={styles.roleTextWrap}>
                <Text style={styles.roleTitle}>{t('welcome.iAmGuest')}</Text>
                <Text style={styles.roleSubtitle}>{t('welcome.guestSubtitle')}</Text>
              </View>
              <Icon name="arrowRight" size={20} color={colors.text.muted} />
            </LinearGradient>
          </TouchableOpacity>

          {/* Host Button */}
          <TouchableOpacity
            style={styles.roleCard}
            onPress={() => handleRole('host')}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={['rgba(245,158,11,0.15)', 'rgba(245,158,11,0.05)']}
              style={styles.roleCardGradient}
            >
              <View style={[styles.roleIconWrap, styles.hostIconBg]}>
                <Icon name="party" size={24} color={colors.gold.light} />
              </View>
              <View style={styles.roleTextWrap}>
                <Text style={styles.roleTitle}>{t('welcome.iAmHost')}</Text>
                <Text style={styles.roleSubtitle}>{t('welcome.hostSubtitle')}</Text>
              </View>
              <Icon name="arrowRight" size={20} color={colors.text.muted} />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Bottom hint */}
        <View style={styles.bottomHint}>
          <View style={styles.dot} /><View style={styles.dot} /><View style={styles.dot} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  glowTop: {
    position: 'absolute',
    top: -100,
    left: width * 0.2,
    width: width * 0.6,
    height: 300,
    borderRadius: 300,
    backgroundColor: 'rgba(168,85,247,0.12)',
  },
  glowBottom: {
    position: 'absolute',
    bottom: 0,
    right: -50,
    width: 250,
    height: 250,
    borderRadius: 250,
    backgroundColor: 'rgba(245,158,11,0.06)',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: height * 0.12,
    paddingBottom: spacing['2xl'],
    justifyContent: 'space-between',
  },
  logoSection: {
    alignItems: 'center',
    gap: spacing.md,
  },
  logoMark: {
    width: 80,
    height: 80,
    borderRadius: radius['2xl'],
    overflow: 'hidden',
    shadowColor: colors.brand.DEFAULT,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  logoGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    fontSize: 36,
    color: '#fff',
  },
  brandName: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.extrabold,
    color: colors.text.primary,
    letterSpacing: -1,
  },
  taglineSection: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
  tagline: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonsSection: {
    gap: spacing.md,
  },
  roleCard: {
    borderRadius: radius['2xl'],
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border.DEFAULT,
  },
  roleCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
  },
  roleIconWrap: {
    width: 52,
    height: 52,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(168,85,247,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hostIconBg: {
    backgroundColor: 'rgba(245,158,11,0.2)',
  },
  roleIcon: {
    fontSize: 24,
  },
  roleTextWrap: {
    flex: 1,
    gap: 3,
  },
  roleTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
  },
  roleSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.text.muted,
  },
  roleArrow: {
    fontSize: 18,
    color: colors.text.muted,
  },
  bottomHint: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.border.DEFAULT,
  },
});
