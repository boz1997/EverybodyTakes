import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import { changeLanguage } from '@translations/index';
import { colors, typography, radius, fonts } from '@constants/theme';

const LANGS = ['tr', 'en'] as const;

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith('tr') ? 'tr' : 'en';

  return (
    <View style={styles.row}>
      {LANGS.map((lng) => {
        const active = current === lng;
        return (
          <TouchableOpacity
            key={lng}
            onPress={() => { if (!active) { Haptics.selectionAsync(); changeLanguage(lng); } }}
            style={[styles.pill, active && styles.pillActive]}
            activeOpacity={0.8}
          >
            <Text style={[styles.label, active && styles.labelActive]}>{lng.toUpperCase()}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: colors.bg.card,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border.DEFAULT,
    padding: 3,
  },
  pill: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: radius.full },
  pillActive: { backgroundColor: colors.text.primary },
  label: { fontSize: typography.sizes.xs, fontFamily: fonts.bodySemibold, color: colors.text.muted, letterSpacing: 0.5 },
  labelActive: { color: colors.text.inverse },
});
