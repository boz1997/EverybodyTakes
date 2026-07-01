import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useAudioPlayer, useAudioPlayerStatus, setAudioModeAsync } from 'expo-audio';
import { EventService, Voice } from '@features/events/services/eventService';
import { createVoicesZip } from '@features/events/services/exportService';
import { shareVoice } from '@features/voices/downloadVoice';
import { formatDuration } from '@shared/utils/formatDuration';
import { Icon } from '@shared/components/Icon';
import { colors, typography, spacing, radius, fonts, gradients } from '@constants/theme';

interface Props {
  visible: boolean;
  onClose: () => void;
  eventId: string;
}

// Host-facing "Voice memories": a live, name → clip list. Plays one at a time
// (shared player), downloads a single clip or all of them as a named ZIP.
// Subscribes only while open.
export function VoicesModal({ visible, onClose, eventId }: Props) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const player = useAudioPlayer(undefined, { updateInterval: 300 });
  const status = useAudioPlayerStatus(player);
  const loadedRef = useRef<string | null>(null);
  const [voices, setVoices] = useState<Voice[] | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [zipping, setZipping] = useState(false);

  useEffect(() => {
    if (!visible) return;
    setVoices(null);
    setAudioModeAsync({ playsInSilentMode: true }).catch(() => {});
    const unsub = EventService.subscribeToVoices(eventId, setVoices);
    return () => { unsub(); player.pause(); };
  }, [visible, eventId]);

  const togglePlay = (v: Voice) => {
    Haptics.selectionAsync();
    if (playingId === v.id && status.playing) { player.pause(); return; }
    if (loadedRef.current !== v.audioUrl) { player.replace(v.audioUrl); loadedRef.current = v.audioUrl; }
    setPlayingId(v.id);
    player.seekTo(0);
    player.play();
  };

  const downloadOne = async (v: Voice) => {
    try { await shareVoice(v.audioUrl, v.authorName); } catch { Alert.alert(t('common.error')); }
  };

  const downloadAll = async () => {
    if (!voices?.length || zipping) return;
    try {
      setZipping(true);
      const { url } = await createVoicesZip(eventId);
      await Linking.openURL(url);
    } catch {
      Alert.alert(t('common.error'));
    } finally {
      setZipping(false);
    }
  };

  const confirmDelete = (v: Voice) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(t('voices.deleteConfirm'), undefined, [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.delete'), style: 'destructive', onPress: () => {
        if (playingId === v.id) player.pause();
        EventService.deleteVoice(eventId, v.id).catch(() => {});
      } },
    ]);
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} presentationStyle="pageSheet">
      <LinearGradient colors={gradients.page} style={styles.container}>
        <View style={[styles.head, { paddingTop: spacing.lg }]}>
          <View style={styles.titleWrap}>
            <Icon name="mic" size={22} color={colors.brand.DEFAULT} strokeWidth={2.2} />
            <Text style={styles.title}>{t('voices.bookTitle')}</Text>
          </View>
          <TouchableOpacity onPress={onClose} hitSlop={12} style={styles.closeBtn} activeOpacity={0.7}>
            <Icon name="close" size={18} color={colors.text.secondary} strokeWidth={2.4} />
          </TouchableOpacity>
        </View>

        {voices == null ? (
          <ActivityIndicator color={colors.brand.DEFAULT} style={{ marginTop: spacing['2xl'] }} />
        ) : voices.length === 0 ? (
          <View style={styles.empty}>
            <View style={styles.emptyIcon}><Icon name="mic" size={28} color={colors.brand.light} strokeWidth={1.6} /></View>
            <Text style={styles.emptyText}>{t('voices.empty')}</Text>
          </View>
        ) : (
          <>
            <TouchableOpacity onPress={downloadAll} disabled={zipping} style={styles.dlBtn} activeOpacity={0.85}>
              <Icon name="download" size={16} color={colors.brand.DEFAULT} />
              <Text style={styles.dlText}>{zipping ? t('common.loading') : t('voices.download')}</Text>
            </TouchableOpacity>
            <Text style={styles.hint}>{t('voices.deleteHint')}</Text>
            <ScrollView contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + spacing.xl }]} showsVerticalScrollIndicator={false}>
              {voices.map((v) => {
                const isPlaying = playingId === v.id && status.playing;
                return (
                  <TouchableOpacity key={v.id} style={styles.row} onLongPress={() => confirmDelete(v)} delayLongPress={350} activeOpacity={0.9}>
                    <TouchableOpacity onPress={() => togglePlay(v)} style={styles.playBtn} activeOpacity={0.85}>
                      <Icon name={isPlaying ? 'pause' : 'play'} size={18} color="#fff" fill="#fff" />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.author}>{v.authorName?.trim() || t('common.anonymous')}</Text>
                      <Text style={styles.dur}>{formatDuration(v.durationMs)}</Text>
                    </View>
                    <TouchableOpacity onPress={() => downloadOne(v)} hitSlop={10} style={styles.rowDl} activeOpacity={0.7}>
                      <Icon name="download" size={18} color={colors.brand.DEFAULT} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </>
        )}
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingBottom: spacing.md },
  titleWrap: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  title: { fontSize: typography.sizes['2xl'], fontFamily: fonts.displayBold, color: colors.text.primary },
  closeBtn: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg.card, borderWidth: 1, borderColor: colors.border.DEFAULT },
  dlBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, alignSelf: 'center', marginBottom: spacing.md, paddingHorizontal: spacing.lg, paddingVertical: 8, borderRadius: radius.full, borderWidth: 1, borderColor: colors.brand.DEFAULT, backgroundColor: colors.brand.glow },
  dlText: { fontSize: typography.sizes.sm, fontFamily: fonts.bodySemibold, color: colors.brand.DEFAULT },
  hint: { textAlign: 'center', fontSize: typography.sizes.xs, fontFamily: fonts.body, color: colors.text.muted, marginBottom: spacing.sm },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md, paddingHorizontal: spacing.xl, paddingBottom: spacing['2xl'] },
  emptyIcon: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.brand.glow },
  emptyText: { fontSize: typography.sizes.base, fontFamily: fonts.body, color: colors.text.muted, textAlign: 'center', lineHeight: 22 },
  list: { paddingHorizontal: spacing.lg, gap: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.bg.card, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border.DEFAULT, padding: spacing.md },
  playBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.brand.DEFAULT },
  author: { fontSize: typography.sizes.base, fontFamily: fonts.bodySemibold, color: colors.brand.dark },
  dur: { fontSize: typography.sizes.sm, fontFamily: fonts.body, color: colors.text.muted, marginTop: 2 },
  rowDl: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
});
