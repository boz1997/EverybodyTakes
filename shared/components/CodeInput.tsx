import { useRef } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { colors, typography, radius, spacing, fonts } from '@constants/theme';

const LENGTH = 6;

// Accepts a raw 6-char code, a "?code=CODE" link (e.html / deep link), or a
// legacy "…/e/CODE" URL, and returns the normalized 6-char code.
export function extractCode(input: string): string {
  let s = input.trim();
  const byQuery = s.match(/[?&]code=([A-Za-z0-9]+)/i);
  const byPath = s.match(/\/e\/([^/?#\s]+)/i);
  if (byQuery) {
    s = byQuery[1];
  } else if (byPath) {
    s = byPath[1];
  } else if (/^[a-z]+:\/\//i.test(s)) {
    const parts = s.split(/[/?#]/).filter(Boolean);
    s = parts[parts.length - 1] ?? '';
  }
  return s.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, LENGTH);
}

interface Props {
  value: string;
  onChange: (code: string) => void;
  autoFocus?: boolean;
}

export function CodeInput({ value, onChange, autoFocus }: Props) {
  const ref = useRef<TextInput>(null);

  return (
    <Pressable style={styles.row} onPress={() => ref.current?.focus()}>
      {Array.from({ length: LENGTH }).map((_, i) => {
        const char = value[i] ?? '';
        const active = i === value.length;
        return (
          <View key={i} style={[styles.cell, char ? styles.cellFilled : null, active ? styles.cellActive : null]}>
            <Text style={styles.cellText}>{char}</Text>
          </View>
        );
      })}
      <TextInput
        ref={ref}
        value={value}
        onChangeText={(t) => onChange(extractCode(t))}
        autoCapitalize="characters"
        autoCorrect={false}
        autoComplete="off"
        maxLength={200}
        autoFocus={autoFocus}
        style={styles.hidden}
        keyboardType="default"
        caretHidden
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm },
  cell: {
    flex: 1, aspectRatio: 0.82, maxWidth: 52,
    borderRadius: radius.lg, borderWidth: 1.5, borderColor: colors.border.DEFAULT,
    backgroundColor: colors.bg.card, alignItems: 'center', justifyContent: 'center',
  },
  cellFilled: { borderColor: colors.brand.DEFAULT, backgroundColor: colors.brand.glow },
  cellActive: { borderColor: colors.brand.DEFAULT },
  cellText: { fontSize: typography.sizes['2xl'], fontFamily: fonts.displayBold, color: colors.text.primary },
  hidden: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0 },
});
