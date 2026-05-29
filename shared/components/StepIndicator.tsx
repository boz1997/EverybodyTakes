import { View, StyleSheet } from 'react-native';
import { colors, radius } from '@constants/theme';

interface Props {
  total: number;
  current: number;
}

export function StepIndicator({ total, current }: Props) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i < current && styles.completed,
            i === current && styles.active,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
    backgroundColor: colors.border.DEFAULT,
  },
  completed: {
    backgroundColor: colors.brand.dark,
    width: 8,
  },
  active: {
    backgroundColor: colors.brand.DEFAULT,
    width: 24,
  },
});
