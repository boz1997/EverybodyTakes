import { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ActivityIndicator,
  Dimensions, NativeSyntheticEvent, NativeScrollEvent,
} from 'react-native';
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
import { orderedTemplates, TemplateMeta, ShareData, CARD_W } from '@features/share/templates';
import { EventType } from '@store/eventStore';
import { Icon } from '@shared/components/Icon';
import { LINKS } from '@constants/links';
import { colors, typography, spacing, radius, fonts, gradients } from '@constants/theme';

const SCREEN_W = Dimensions.get('window').width;
const GAP = 16;
const STRIDE = CARD_W + GAP;
const SIDE = (SCREEN_W - CARD_W) / 2 - GAP / 2;   // centers the active card, peeks neighbours

export default function ShareCardScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [event, setEvent] = useState<Event | null>(null);
  const [templates, setTemplates] = useState<TemplateMeta[]>([]);
  const [active, setActive] = useState(0);
  const [busy, setBusy] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shotRefs = useRef<any[]>([]);

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

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / STRIDE);
    const clamped = Math.max(0, Math.min(templates.length - 1, i));
    if (clamped !== active) { setActive(clamped); Haptics.selectionAsync(); }
  };

  const capture = async (): Promise<string | null> => {
    try {
      return await captureRef(shotRefs.current[active], { format: 'png', quality: 1 });
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

      {/* Swipeable card carousel */}
      <View style={styles.carousel}>
        <FlatList
          data={templates}
          keyExtractor={(tpl) => tpl.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={STRIDE}
          decelerationRate="fast"
          disableIntervalMomentum
          contentContainerStyle={{ paddingHorizontal: SIDE }}
          onMomentumScrollEnd={onScrollEnd}
          renderItem={({ item, index }) => {
            const Card = item.comp;
            return (
              <View style={styles.page}>
                <View style={styles.cardShadow}>
                  {/* Capture on a solid paper frame so the rounded card has no
                      transparent corners (which showed as white/black blocks
                      when the saved PNG was viewed in Photos). */}
                  <ViewShot ref={(el) => { shotRefs.current[index] = el; }} options={{ format: 'png', quality: 1 }}>
                    <View style={styles.captureFrame}>
                      <Card data={data} />
                    </View>
                  </ViewShot>
                </View>
              </View>
            );
          }}
        />
      </View>

      {/* Page dots */}
      <View style={styles.dots}>
        {templates.map((tpl, i) => (
          <View key={tpl.key} style={[styles.dot, i === active && styles.dotActive]} />
        ))}
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
  carousel: { flex: 1, justifyContent: 'center' },
  page: { width: CARD_W, marginHorizontal: GAP / 2, justifyContent: 'center' },
  cardShadow: {
    borderRadius: 24,
    shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 24, shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  captureFrame: { backgroundColor: colors.bg.primary, padding: 18, borderRadius: 24 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 7, paddingVertical: spacing.md },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.border.DEFAULT },
  dotActive: { backgroundColor: colors.brand.DEFAULT, width: 22 },
  bar: { flexDirection: 'row', gap: spacing.md, paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  outlineBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingHorizontal: spacing.lg, height: 54, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border.DEFAULT, backgroundColor: colors.bg.card },
  outlineText: { fontSize: typography.sizes.sm, fontFamily: fonts.bodySemibold, color: colors.text.primary },
  shareBtn: { flex: 1, borderRadius: radius.xl, overflow: 'hidden', height: 54 },
  shareGradient: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  shareText: { fontSize: typography.sizes.base, fontFamily: fonts.bodySemibold, color: '#fff' },
});
