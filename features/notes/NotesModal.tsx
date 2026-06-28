import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { EventService, Note } from '@features/events/services/eventService';
import { exportNotesPdf } from '@features/notes/exportNotesPdf';
import { Icon } from '@shared/components/Icon';
import { colors, typography, spacing, radius, fonts, gradients } from '@constants/theme';

interface Props {
  visible: boolean;
  onClose: () => void;
  eventId: string;
  eventName: string;
}

// Host-facing "Memory book": a live, name → note list, downloadable as a PDF.
// Subscribes only while open.
export function NotesModal({ visible, onClose, eventId, eventName }: Props) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [notes, setNotes] = useState<Note[] | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!visible) return;
    setNotes(null);
    return EventService.subscribeToNotes(eventId, setNotes);
  }, [visible, eventId]);

  const download = async () => {
    if (!notes?.length || downloading) return;
    try {
      setDownloading(true);
      await exportNotesPdf({ eventName, bookTitle: t('notes.bookTitle'), anonymous: t('common.anonymous'), notes });
    } catch {
      Alert.alert(t('common.error'));
    } finally {
      setDownloading(false);
    }
  };

  // The host can prune notes (e.g. before exporting) by long-pressing one.
  const confirmDelete = (note: Note) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(t('notes.deleteConfirm'), undefined, [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.delete'), style: 'destructive', onPress: () => { EventService.deleteNote(eventId, note.id).catch(() => {}); } },
    ]);
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} presentationStyle="pageSheet">
      <LinearGradient colors={gradients.page} style={styles.container}>
        <View style={[styles.head, { paddingTop: spacing.lg }]}>
          <View style={styles.titleWrap}>
            <Text style={styles.titleEmoji}>📖</Text>
            <Text style={styles.title}>{t('notes.bookTitle')}</Text>
          </View>
          <TouchableOpacity onPress={onClose} hitSlop={12} style={styles.closeBtn} activeOpacity={0.7}>
            <Icon name="close" size={18} color={colors.text.secondary} strokeWidth={2.4} />
          </TouchableOpacity>
        </View>

        {notes == null ? (
          <ActivityIndicator color={colors.brand.DEFAULT} style={{ marginTop: spacing['2xl'] }} />
        ) : notes.length === 0 ? (
          <View style={styles.empty}>
            <View style={styles.emptyIcon}><Icon name="heart" size={28} color={colors.brand.light} strokeWidth={1.6} /></View>
            <Text style={styles.emptyText}>{t('notes.empty')}</Text>
          </View>
        ) : (
          <>
            <TouchableOpacity onPress={download} disabled={downloading} style={styles.dlBtn} activeOpacity={0.85}>
              <Icon name="download" size={16} color={colors.brand.DEFAULT} />
              <Text style={styles.dlText}>{downloading ? t('common.loading') : t('notes.download')}</Text>
            </TouchableOpacity>
            <Text style={styles.hint}>{t('notes.deleteHint')}</Text>
            <ScrollView contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + spacing.xl }]} showsVerticalScrollIndicator={false}>
              {notes.map((n) => (
                <TouchableOpacity key={n.id} style={styles.note} onLongPress={() => confirmDelete(n)} delayLongPress={350} activeOpacity={0.85}>
                  <Text style={styles.author}>{n.authorName?.trim() || t('common.anonymous')}</Text>
                  <Text style={styles.text}>{n.text}</Text>
                </TouchableOpacity>
              ))}
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
  titleEmoji: { fontSize: 24 },
  title: { fontSize: typography.sizes['2xl'], fontFamily: fonts.displayBold, color: colors.text.primary },
  closeBtn: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg.card, borderWidth: 1, borderColor: colors.border.DEFAULT },
  dlBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, alignSelf: 'center', marginBottom: spacing.md, paddingHorizontal: spacing.lg, paddingVertical: 8, borderRadius: radius.full, borderWidth: 1, borderColor: colors.brand.DEFAULT, backgroundColor: colors.brand.glow },
  dlText: { fontSize: typography.sizes.sm, fontFamily: fonts.bodySemibold, color: colors.brand.DEFAULT },
  hint: { textAlign: 'center', fontSize: typography.sizes.xs, fontFamily: fonts.body, color: colors.text.muted, marginBottom: spacing.sm },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md, paddingHorizontal: spacing.xl, paddingBottom: spacing['2xl'] },
  emptyIcon: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.brand.glow },
  emptyText: { fontSize: typography.sizes.base, fontFamily: fonts.body, color: colors.text.muted, textAlign: 'center', lineHeight: 22 },
  list: { paddingHorizontal: spacing.lg, gap: spacing.sm },
  note: { backgroundColor: colors.bg.card, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border.DEFAULT, padding: spacing.md, gap: 4 },
  author: { fontSize: typography.sizes.sm, fontFamily: fonts.bodySemibold, color: colors.brand.dark },
  text: { fontSize: typography.sizes.base, fontFamily: fonts.body, color: colors.text.primary, lineHeight: 22 },
});
