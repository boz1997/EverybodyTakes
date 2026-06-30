import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Icon } from '@shared/components/Icon';
import { fonts } from '@constants/theme';

interface WatermarkOverlayProps {
  size?: 'sm' | 'lg';
  style?: StyleProp<ViewStyle>;
}

// Decorative "GuestCam" stamp shown over free-plan photos (gallery cells +
// lightbox) and baked into free downloads. pointerEvents none so it never
// blocks taps on the photo beneath it.
export function WatermarkOverlay({ size = 'sm', style }: WatermarkOverlayProps) {
  const lg = size === 'lg';
  return (
    <View style={[styles.wrap, lg ? styles.lg : styles.sm, style]} pointerEvents="none">
      <Icon name="camera" size={lg ? 15 : 11} color="#fff" strokeWidth={2.4} />
      <Text style={[styles.label, lg && styles.labelLg]}>GuestCam</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute', top: 6, left: 6,
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.42)', borderRadius: 999,
  },
  sm: { paddingHorizontal: 6, paddingVertical: 3, gap: 3 },
  lg: { paddingHorizontal: 10, paddingVertical: 5, gap: 5 },
  label: { color: 'rgba(255,255,255,0.95)', fontSize: 10, fontFamily: fonts.bodySemibold },
  labelLg: { fontSize: 13 },
});
