import { TouchableOpacity, Text, StyleSheet, View, ViewStyle, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { colors, radius, typography, fonts, gradients } from '@constants/theme';
import { Icon } from '@shared/components/Icon';

type IconName = React.ComponentProps<typeof Icon>['name'];

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'brand' | 'ghost' | 'danger' | 'gold';
  icon?: IconName;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
}

export function PrimaryButton({ label, onPress, variant = 'brand', icon, loading, disabled, style, fullWidth = true }: Props) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  // Single content renderer so the optional leading icon stays consistent
  // across every variant (and aligned with the label).
  const content = (spinnerColor: string, iconColor: string, textStyle: object) =>
    loading ? (
      <ActivityIndicator color={spinnerColor} size="small" />
    ) : (
      <View style={styles.content}>
        {icon && <Icon name={icon} size={19} color={iconColor} strokeWidth={2.3} />}
        <Text style={textStyle}>{label}</Text>
      </View>
    );

  if (variant === 'brand' || variant === 'gold') {
    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled || loading}
        style={[styles.container, fullWidth && styles.fullWidth, style]}
        activeOpacity={0.85}
      >
        <LinearGradient
          colors={variant === 'gold' ? gradients.bronze : gradients.amber}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {content(colors.text.inverse, colors.text.inverse, styles.brandLabel)}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const isDanger = variant === 'danger';
  const ghostStyles = isDanger ? [styles.ghost, styles.danger] : styles.ghost;

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || loading}
      style={[styles.container, fullWidth && styles.fullWidth, ghostStyles, style]}
      activeOpacity={0.7}
    >
      {content(
        isDanger ? colors.error : colors.brand.DEFAULT,
        isDanger ? colors.error : colors.text.primary,
        [styles.ghostLabel, isDanger && styles.dangerLabel],
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
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
