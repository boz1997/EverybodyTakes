import { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  Modal, KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import { EventService, NOTE_MAX } from '@features/events/services/eventService';
import { PrimaryButton } from '@shared/components/PrimaryButton';
import { colors, typography, spacing, radius, fonts } from '@constants/theme';

interface Props {
  visible: boolean;
  onClose: () => void;
  eventId: string;
  authorId: string;
  authorName: string | null;
  onSaved?: () => void;
}

// Guest-facing "leave a memory" composer. Each guest has ONE note (keyed by uid):
// the modal loads their existing note so this becomes an edit, never a second one.
export function LeaveNoteModal({ visible, onClose, eventId, authorId, authorName, onSaved }: Props) {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [existing, setExisting] = useState(false);
  const [busy, setBusy] = useState(false);
  const remaining = NOTE_MAX - text.length;

  useEffect(() => {
    if (!visible) return;
    let active = true;
    EventService.getMyNote(eventId, authorId)
      .then((n) => { if (active) { setText(n?.text ?? ''); setExisting(!!n); } })
      .catch(() => {});
    return () => { active = false; };
  }, [visible, eventId, authorId]);

  const close = () => { if (!busy) onClose(); };

  const submit = async () => {
    if (!text.trim() || busy) return;
    try {
      setBusy(true);
      await EventService.saveNote(eventId, authorId, authorName, text);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      onClose();
      onSaved?.();
      Alert.alert(t('notes.sent'));
    } catch {
      Alert.alert(t('common.error'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={close} statusBarTranslucent>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.overlay}>
        <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={close} />
        <View style={styles.card}>
          <View style={styles.head}>
            <View style={styles.iconWrap}><Text style={styles.headEmoji}>📖</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{existing ? t('notes.editTitle') : t('notes.leave')}</Text>
              <Text style={styles.subtitle}>{t('notes.subtitle')}</Text>
            </View>
          </View>

          <TextInput
            value={text}
            onChangeText={(v) => setText(v.slice(0, NOTE_MAX))}
            placeholder={t('notes.placeholder')}
            placeholderTextColor={colors.text.muted}
            style={styles.input}
            multiline
            maxLength={NOTE_MAX}
            autoFocus
            textAlignVertical="top"
          />
          <Text style={[styles.counter, remaining <= 20 && styles.counterLow]}>{remaining}</Text>

          <PrimaryButton label={existing ? t('notes.update') : t('notes.send')} onPress={submit} loading={busy} disabled={!text.trim()} icon="heart" />
          <TouchableOpacity onPress={close} style={styles.cancel}>
            <Text style={styles.cancelText}>{t('common.cancel')}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', paddingHorizontal: spacing.lg, backgroundColor: 'rgba(0,0,0,0.45)' },
  card: { backgroundColor: colors.bg.primary, borderRadius: radius['2xl'], padding: spacing.lg, gap: spacing.md },
  head: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  iconWrap: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.brand.glow },
  headEmoji: { fontSize: 20 },
  title: { fontSize: typography.sizes.xl, fontFamily: fonts.displayBold, color: colors.text.primary },
  subtitle: { fontSize: typography.sizes.sm, fontFamily: fonts.body, color: colors.text.muted },
  input: {
    minHeight: 110, borderWidth: 1.5, borderColor: colors.border.DEFAULT, borderRadius: radius.lg,
    backgroundColor: colors.bg.card, paddingHorizontal: spacing.md, paddingVertical: spacing.md,
    fontSize: typography.sizes.base, fontFamily: fonts.body, color: colors.text.primary,
  },
  counter: { alignSelf: 'flex-end', marginTop: -spacing.xs, fontSize: typography.sizes.xs, fontFamily: fonts.body, color: colors.text.muted },
  counterLow: { color: colors.brand.dark },
  cancel: { alignSelf: 'center', paddingVertical: spacing.xs },
  cancelText: { color: colors.brand.DEFAULT, fontSize: typography.sizes.sm, fontFamily: fonts.bodySemibold },
});
