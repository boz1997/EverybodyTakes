import { BlurView } from 'expo-blur';
import { StyleSheet, View, ViewStyle, Platform } from 'react-native';
import { colors, radius } from '@constants/theme';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
}

export function GlassCard({ children, style, intensity = 20 }: Props) {
  if (Platform.OS === 'ios') {
    return (
      <BlurView intensity={intensity} tint="dark" style={[styles.card, style]}>
        {children}
      </BlurView>
    );
  }

  return (
    <View style={[styles.card, styles.androidCard, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border.DEFAULT,
  },
  androidCard: {
    backgroundColor: colors.bg.card,
  },
});
