import { Text, StyleSheet, TextStyle } from 'react-native';
import { colors, fonts } from '@constants/theme';

// The GuestCam wordmark rendered in the app's display font, with "Cam" in
// the brand amber. Used instead of a baked image so it stays crisp at any size.
export function Wordmark({ size = 28, style }: { size?: number; style?: TextStyle }) {
  return (
    <Text style={[styles.base, { fontSize: size }, style]}>
      Guest<Text style={styles.accent}>Cam</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  base: { fontFamily: fonts.displayBold, color: colors.text.primary, letterSpacing: -0.5 },
  accent: { color: colors.brand.DEFAULT },
});
