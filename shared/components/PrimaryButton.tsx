import { TouchableOpacity, Text, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { colors, radius, typography, fonts, gradients } from '@constants/theme';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'brand' | 'ghost' | 'danger' | 'gold';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
}

export function PrimaryButton({ label, onPress, variant = 'brand', loading, disabled, style, fullWidth = true }: Props) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  if (variant === 'brand') {
    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled || loading}
        style={[styles.container, fullWidth && styles.fullWidth, style]}
        activeOpacity={0.85}
      >
        <LinearGradient
          colors={gradients.amber}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {loading ? (
            <ActivityIndicator color={colors.text.inverse} size="small" />
          ) : (
            <Text style={styles.brandLabel}>{label}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (variant === 'gold') {
    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled || loading}
        style={[styles.container, fullWidth && styles.fullWidth, style]}
        activeOpacity={0.85}
      >
        <LinearGradient
          colors={gradients.bronze}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {loading ? (
            <ActivityIndicator color={colors.text.inverse} size="small" />
          ) : (
            <Text style={styles.brandLabel}>{label}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const ghostStyles = variant === 'danger'
    ? [styles.ghost, styles.danger]
    : styles.ghost;

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || loading}
      style={[styles.container, fullWidth && styles.fullWidth, ghostStyles, style]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'danger' ? colors.error : colors.brand.DEFAULT} size="small" />
      ) : (
        <Text style={[styles.ghostLabel, variant === 'danger' && styles.dangerLabel]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.xl,
    overflow: 'hidden',
    height: 56,
  },
  fullWidth: {
    width: '100%',
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandLabel: {
    color: colors.text.inverse,
    fontSize: typography.sizes.base,
    fontFamily: fonts.bodySemibold,
    letterSpacing: 0.2,
  },
  ghost: {
    borderWidth: 1,
    borderColor: colors.text.primary,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  danger: {
    borderColor: colors.error + '55',
    backgroundColor: colors.error + '0F',
  },
  ghostLabel: {
    color: colors.text.primary,
    fontSize: typography.sizes.base,
    fontFamily: fonts.bodyMedium,
  },
  dangerLabel: {
    color: colors.error,
  },
});
