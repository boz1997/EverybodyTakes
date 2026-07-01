import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import { useAudioPlayer, useAudioPlayerStatus, setAudioModeAsync } from 'expo-audio';
import { EventService, Voice, VOICE_MAX_MS } from '@features/events/services/eventService';
import { useVoiceRecorder } from '@features/voices/useVoiceRecorder';
import { formatDuration } from '@shared/utils/formatDuration';
import { PrimaryButton } from '@shared/components/PrimaryButton';
import { Icon } from '@shared/components/Icon';
import { colors, typography, spacing, radius, fonts } from '@constants/theme';

interface Props {
  visible: boolean;
  onClose: () => void;
  eventId: string;
  authorId: string;
  authorName: string | null;
  onChanged?: (hasVoice: boolean) => void;
}

// Guest-facing "leave a voice" composer. Each guest has ONE voice (keyed by uid):
// the modal loads their existing clip so recording again replaces it, never adds
// a second. Record → preview → send; or play / delete the saved one.
export function RecordVoiceModal({ visible, onClose, eventId, authorId, authorName, onChanged }: Props) {
  const { t } = useTranslation();
  const recorder = useVoiceRecorder();
  const player = useAudioPlayer(undefined, { updateInterval: 300 });
  const status = useAudioPlayerStatus(player);
  const loadedRef = useRef<string | null>(null);
  const [existing, setExisting] = useState<Voice | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  // A fresh recording (not yet saved) wins over the saved clip for playback + save.
  const freshUri = recorder.uri;
  const playableUri = freshUri ?? existing?.audioUrl ?? null;
  const clipMs = freshUri ? recorder.durationMs : existing?.durationMs ?? 0;

  useEffect(() => {
    if (!visible) return;
    setLoading(true);
    recorder.clear();
    loadedRef.current = null;
    setAudioModeAsync({ playsInSilentMode: true }).catch(() => {});
    let active = true;
    EventService.getMyVoice(eventId, authorId)
      .then((v) => { if (active) setExisting(v); })
      .catch(() => {})
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; player.pause(); };
  }, [visible, eventId, authorId]);

  const togglePlay = () => {
    if (!playableUri) return;
    if (status.playing) { player.pause(); return; }
    if (loadedRef.current !== playableUri) { player.replace(playableUri); loadedRef.current = playableUri; }
    player.seekTo(0);
    player.play();
  };

  const beginRecord = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    player.pause();
    const r = await recorder.start();
    if (r === 'denied') Alert.alert(t('voices.permissionTitle'), t('voices.permissionBody'));
    else if (r === 'error') Alert.alert(t('common.error'));
  };

  const stopRecord = async () => { Haptics.selectionAsync(); await recorder.stop(); };

  const submit = async () => {
    if (!freshUri || busy) return;
    try {
      setBusy(true);
      await EventService.saveVoice(eventId, authorId, authorName, freshUri, recorder.durationMs);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      onChanged?.(true);
      onClose();
      Alert.alert(t('voices.sent'));
    } catch {
      Alert.alert(t('common.error'));
    } finally {
      setBusy(false);
    }
  };

  const removeExisting = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(t('voices.deleteConfirm'), undefined, [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.delete'), style: 'destructive', onPress: async () => {
        player.pause();
        await EventService.deleteVoice(eventId, authorId).catch(() => {});
        setExisting(null);
        onChanged?.(false);
      } },
    ]);
  };

  // While recording, the only way out is Stop — so a stray backdrop tap can't
  // discard a half-recorded clip.
  const close = () => { if (busy || recorder.isRecording) return; player.pause(); onClose(); };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={close} statusBarTranslucent>
      <View style={styles.overlay}>
        <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={close} />
        <View style={styles.card}>
          <View style={styles.head}>
            <View style={styles.iconWrap}><Icon name="mic" size={20} color={colors.brand.DEFAULT} strokeWidth={2.2} /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{existing && !freshUri ? t('voices.editTitle') : t('voices.leave')}</Text>
              <Text style={styles.subtitle}>{t('voices.subtitle')}</Text>
            </View>
          </View>

          {loading ? (
            <ActivityIndicator color={colors.brand.DEFAULT} style={{ paddingVertical: spacing.xl }} />
          ) : recorder.isRecording ? (
            <View style={styles.stage}>
              <View style={styles.recDot} />
              <Text style={styles.timer}>{formatDuration(recorder.elapsedMs)}</Text>
              <Text style={styles.cap}>{t('voices.maxHint', { s: Math.round(VOICE_MAX_MS / 1000) })}</Text>
              <TouchableOpacity onPress={stopRecord} style={styles.stopBtn} activeOpacity={0.85}>
                <Icon name="stop" size={20} color="#fff" fill="#fff" />
                <Text style={styles.stopText}>{t('voices.stop')}</Text>
              </TouchableOpacity>
            </View>
          ) : playableUri ? (
            <View style={styles.stage}>
              <View style={styles.playerRow}>
                <TouchableOpacity onPress={togglePlay} style={styles.playBtn} activeOpacity={0.85}>
                  <Icon name={status.playing ? 'pause' : 'play'} size={22} color="#fff" fill="#fff" />
                </TouchableOpacity>
                <Text style={styles.dur}>{formatDuration(clipMs)}</Text>
              </View>
              <TouchableOpacity onPress={beginRecord} style={styles.secondary} activeOpacity={0.7}>
                <Icon name="refresh" size={15} color={colors.brand.DEFAULT} />
                <Text style={styles.secondaryText}>{t('voices.rerecord')}</Text>
              </TouchableOpacity>
              {freshUri ? (
                <PrimaryButton label={existing ? t('voices.update') : t('voices.send')} onPress={submit} loading={busy} icon="mic" />
              ) : (
                <TouchableOpacity onPress={removeExisting} style={styles.deleteBtn} activeOpacity={0.7}>
                  <Icon name="trash" size={15} color={colors.error} />
                  <Text style={styles.deleteText}>{t('voices.delete')}</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View style={styles.stage}>
              <TouchableOpacity onPress={beginRecord} style={styles.recordBtn} activeOpacity={0.85}>
                <Icon name="mic" size={30} color="#fff" strokeWidth={2.2} />
              </TouchableOpacity>
              <Text style={styles.cap}>{t('voices.tapToRecord')}</Text>
            </View>
          )}

          {!recorder.isRecording && (
            <TouchableOpacity onPress={close} style={styles.cancel}><Text style={styles.cancelText}>{t('common.cancel')}</Text></TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', paddingHorizontal: spacing.lg, backgroundColor: 'rgba(0,0,0,0.45)' },
  card: { backgroundColor: colors.bg.primary, borderRadius: radius['2xl'], padding: spacing.lg, gap: spacing.md },
  head: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  iconWrap: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.brand.glow },
  title: { fontSize: typography.sizes.xl, fontFamily: fonts.displayBold, color: colors.text.primary },
  subtitle: { fontSize: typography.sizes.sm, fontFamily: fonts.body, color: colors.text.muted },
  stage: { alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm },
  recDot: { width: 16, height: 16, borderRadius: 8, backgroundColor: colors.error },
  timer: { fontSize: 44, fontFamily: fonts.displayBold, color: colors.text.primary, letterSpacing: 1 },
  cap: { fontSize: typography.sizes.sm, fontFamily: fonts.body, color: colors.text.muted, textAlign: 'center' },
  stopBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: spacing.xl, paddingVertical: 12, borderRadius: radius.full, backgroundColor: colors.error },
  stopText: { fontSize: typography.sizes.base, fontFamily: fonts.bodySemibold, color: '#fff' },
  playerRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.xs },
  playBtn: { width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.brand.DEFAULT },
  dur: { fontSize: typography.sizes['2xl'], fontFamily: fonts.displayBold, color: colors.text.primary, minWidth: 64 },
  recordBtn: { width: 88, height: 88, borderRadius: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.brand.DEFAULT },
  secondary: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: spacing.xs },
  secondaryText: { fontSize: typography.sizes.sm, fontFamily: fonts.bodySemibold, color: colors.brand.DEFAULT },
  deleteBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: spacing.xs },
  deleteText: { fontSize: typography.sizes.sm, fontFamily: fonts.bodySemibold, color: colors.error },
  cancel: { alignSelf: 'center', paddingVertical: spacing.xs },
  cancelText: { color: colors.brand.DEFAULT, fontSize: typography.sizes.sm, fontFamily: fonts.bodySemibold },
});
