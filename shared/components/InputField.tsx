import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors, radius, typography, spacing, fonts } from '@constants/theme';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
}

export function InputField({ label, error, hint, style, ...props }: Props) {
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor={colors.text.muted}
        selectionColor={colors.brand.DEFAULT}
        {...props}
      />
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : hint ? (
        <Text style={styles.hintText}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.xs,
  },
  label: {
    color: colors.text.secondary,
    fontSize: typography.sizes.sm,
    fontFamily: fonts.bodyMedium,
    marginBottom: 2,
  },
  input: {
    backgroundColor: colors.bg.card,
    borderWidth: 1,
    borderColor: colors.border.DEFAULT,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: 15,
    color: colors.text.primary,
    fontSize: typography.sizes.base,
    fontFamily: fonts.body,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.sizes.xs,
    fontFamily: fonts.body,
  },
  hintText: {
    color: colors.text.muted,
    fontSize: typography.sizes.xs,
    fontFamily: fonts.body,
  },
});
