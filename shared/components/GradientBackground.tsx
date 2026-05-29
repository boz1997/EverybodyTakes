import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '@constants/theme';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'brand' | 'dark';
}

export function GradientBackground({ children, style, variant = 'default' }: Props) {
  const gradients = {
    default: [colors.bg.primary, '#0F0F1A'] as [string, string],
    brand: ['#1A0A2E', '#0A0A0F'] as [string, string],
    dark: [colors.bg.secondary, colors.bg.primary] as [string, string],
  };

  return (
    <LinearGradient colors={gradients[variant]} style={[styles.container, style]}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
