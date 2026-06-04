import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { tr as trLocale } from 'date-fns/locale';
import ViewShot, { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library/legacy';
import * as Haptics from 'expo-haptics';
import { EventService, Event } from '@features/events/services/eventService';
import { orderedTemplates, TemplateMeta, ShareData } from '@features/share/templates';
import { EventType } from '@store/eventStore';
import { Icon } from '@shared/components/Icon';
import { LINKS } from '@constants/links';
import { colors, typography, spacing, radius, fonts, gradients } from '@constants/theme';

export default function ShareCardScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [event, setEvent] = useState<Event | null>(null);
  const [templates, setTemplates] = useState<TemplateMeta[]>([]);
  const [index, setIndex] = useState(0);
  const [busy, setBusy] = useState(false);
  // ViewShot is exported as a value, not a type; ref typed loosely on purpose.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shotRef = useRef<any>(null);

  useEffect(() => {
    if (!id) return;
    EventService.getById(id).then((e) => {
      if (!e) return;
      setEvent(e);
      setTemplates(orderedTemplates(e.type as EventType, !!e.coverImageUrl));
    });
  }, [id]);

  if (!event || templates.length === 0) {
    return (
      <LinearGradient colors={gradients.page} style={styles.container}>
        <View style={styles.center}><ActivityIndicator color={colors.brand.DEFAULT} /></View>
      </LinearGradient>
    );
  }

  const data: ShareData = {
    name: event.name,
    dateLabel: event.date ? format(new Date(event.date), 'd MMMM yyyy', { locale: trLocale }) : '',
    code: event.shortCode,
    qrValue: LINKS.eventUrl(event.shortCode),
    coverUrl: event.coverImageUrl,
    invited: t('host.shareInvited'),
    scan: t('host.shareScan'),
  };

  const Current = templates[index].comp;

  const capture = async (): Promise<string | null> => {
    try {
      return await captureRef(shotRef, { format: 'png', quality: 1 });
    } catch {
      return null;
    }
  };

  const onDownload = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const perm = await MediaLibrary.requestPermissionsAsync();
      if (!perm.granted) { Alert.alert(t('errors.cameraPermission')); return; }
      const uri = await capture();
      if (!uri) throw new Error('capture failed');
      await MediaLibrary.saveToLibraryAsync(uri);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert(t('host.shareSaved'));
    } catch (e: unknown) {
      Alert.alert(t('common.error'), String((e as { message?: string })?.message ?? e));
    } finally {
      setBusy(false);
    }
  };

  const onShare = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const uri = await capture();
      if (!uri) throw new Error('capture failed');
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { mimeType: 'image/png', dialogTitle: event.name });
      }
    } catch (e: unknown) {
      Alert.alert(t('common.error'), String((e as { message?: string })?.message ?? e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <LinearGradient colors={gradients.page} style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Icon name="arrowLeft" size={18} color={colors.text.secondary} />
          <Text style={styles.backText}>{t('common.back')}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{t('host.shareTitle')}</Text>
      </View>

      {/* Template picker */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        {templates.map((tpl, i) => (
          <TouchableOpacity
            key={tpl.key}
            onPress={() => { setIndex(i); Haptics.selectionAsync(); }}
            style={[styles.chip, i === index && styles.chipActive]}
            activeOpacity={0.85}
          >
            <Text style={[styles.chipText, i === index && styles.chipTextActive]}>{tpl.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Live preview */}
      <View style={styles.preview}>
        <ViewShot ref={shotRef} options={{ format: 'png', quality: 1 }}>
          <Current data={data} />
        </ViewShot>
      </View>

      {/* Actions */}
      <View style={[styles.bar, { paddingBottom: insets.bottom + spacing.lg }]}>
        <TouchableOpacity onPress={onDownload} style={styles.outlineBtn} activeOpacity={0.85} disabled={busy}>
          <Icon name="download" size={18} color={colors.text.primary} />
          <Text style={styles.outlineText}>{t('common.download')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onShare} style={styles.shareBtn} activeOpacity={0.85} disabled={busy}>
          <LinearGradient colors={gradients.amber} style={styles.shareGradient}>
            <Icon name="share" size={18} color="#fff" />
            <Text style={styles.shareText}>{busy ? t('common.loading') : t('common.share')}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: { paddingHorizontal: spacing.lg, paddingBottom: spacing.sm, gap: spacing.xs },
  backBtn: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6 },
  backText: { color: colors.text.secondary, fontSize: typography.sizes.base, fontFamily: fonts.body },
  title: { fontSize: typography.sizes['2xl'], fontFamily: fonts.displayBold, color: colors.text.primary },
  chips: { paddingHorizontal: spacing.lg, gap: spacing.sm, paddingVertical: spacing.sm },
  chip: { paddingHorizontal: 16, paddingVertical: 9, borderRadius: radius.full, backgroundColor: colors.bg.card, borderWidth: 1, borderColor: colors.border.DEFAULT },
  chipActive: { backgroundColor: colors.brand.DEFAULT, borderColor: colors.brand.DEFAULT },
  chipText: { fontSize: typography.sizes.sm, fontFamily: fonts.bodySemibold, color: colors.text.secondary },
  chipTextActive: { color: '#fff' },
  preview: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  bar: { flexDirection: 'row', gap: spacing.md, paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  outlineBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingHorizontal: spacing.lg, height: 54, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border.DEFAULT, backgroundColor: colors.bg.card },
  outlineText: { fontSize: typography.sizes.sm, fontFamily: fonts.bodySemibold, color: colors.text.primary },
  shareBtn: { flex: 1, borderRadius: radius.xl, overflow: 'hidden', height: 54 },
  shareGradient: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  shareText: { fontSize: typography.sizes.base, fontFamily: fonts.bodySemibold, color: '#fff' },
});
