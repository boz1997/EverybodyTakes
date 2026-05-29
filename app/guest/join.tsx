import { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { EventService, Event, LimitError } from '@features/events/services/eventService';
import { AuthService } from '@features/auth/services/authService';
import { useAuthStore } from '@store/authStore';
import { useEventStore } from '@store/eventStore';
import { addJoinedEvent } from '@store/guestEvents';
import { PrimaryButton } from '@shared/components/PrimaryButton';
import { InputField } from '@shared/components/InputField';
import { Icon, EVENT_TYPE_ICON } from '@shared/components/Icon';
import { EventType } from '@store/eventStore';
import { colors, typography, spacing, radius, fonts, gradients } from '@constants/theme';
import { format } from 'date-fns';

export default function JoinScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { code } = useLocalSearchParams<{ code: string }>();
  const { user, setUser } = useAuthStore();
  const { setGuestEventId, setShotsRemaining } = useEventStore();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!code) return;
    EventService.getByShortCode(code)
      .then((ev) => {
        if (!ev) setError(t('errors.eventNotFound'));
        else if (!ev.isActive) setError(t('errors.eventExpired'));
        else setEvent(ev);
      })
      .catch(() => setError(t('errors.unknownError')))
      .finally(() => setLoading(false));
  }, [code]);

  const handleJoin = async () => {
    if (!event) return;
    try {
      setJoining(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      let currentUser = user;
      if (!currentUser) {
        currentUser = await AuthService.signInAnonymous();
        setUser(currentUser);
      }

      const shots = await EventService.joinEvent(event.id, currentUser.uid, nickname || null);
      setGuestEventId(event.id);
      setShotsRemaining(shots);
      await addJoinedEvent({
        id: event.id, code: event.shortCode, name: event.name,
        coverImageUrl: event.coverImageUrl, type: event.type, joinedAt: Date.now(),
      });

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace({ pathname: '/guest/camera', params: { id: event.id } });
    } catch (e) {
      if (e instanceof LimitError && e.code === 'event_full') {
        Alert.alert(t('errors.maxGuestsReached'));
      } else {
        Alert.alert(t('common.error'), t('errors.unknownError'));
      }
    } finally {
      setJoining(false);
    }
  };


  if (loading) {
    return (
      <LinearGradient colors={gradients.page} style={styles.container}>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={colors.brand.DEFAULT} />
          <Text style={styles.loadingText}>{t('guest.joiningEvent')}</Text>
        </View>
      </LinearGradient>
    );
  }

  if (error || !event) {
    return (
      <LinearGradient colors={gradients.page} style={styles.container}>
        <View style={styles.centerContent}>
          <View style={styles.errorIconWrap}>
            <Icon name="alert" size={36} color={colors.error} strokeWidth={1.8} />
          </View>
          <Text style={styles.errorTitle}>{error}</Text>
          <PrimaryButton label={t('common.back')} onPress={() => router.back()} variant="ghost" />
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={gradients.page} style={styles.container}>
      <View style={styles.glow} pointerEvents="none" />

      <View style={[styles.content, { paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + spacing.xl }]}>

        {/* Cover Photo or Emoji */}
        <Animated.View entering={FadeInUp.duration(600)} style={styles.coverWrap}>
          {event.coverImageUrl ? (
            <Image source={{ uri: event.coverImageUrl }} style={styles.coverImage} />
          ) : (
            <LinearGradient colors={['rgba(190,106,46,0.14)', 'rgba(190,106,46,0.05)']} style={styles.coverEmpty}>
              <Icon name={EVENT_TYPE_ICON[event.type as EventType] ?? 'party'} size={64} color={colors.brand.light} strokeWidth={1.4} />
            </LinearGradient>
          )}
          <LinearGradient
            colors={['transparent', 'rgba(10,10,15,0.9)']}
            style={styles.coverFade}
            pointerEvents="none"
          />
        </Animated.View>

        {/* Event Info */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.infoSection}>
          <Text style={styles.eventName}>{event.name}</Text>
          {event.date && (
            <Text style={styles.eventDate}>
              {format(new Date(event.date), 'd MMMM yyyy')}
            </Text>
          )}

          {/* Stats */}
          <View style={styles.stats}>
            <View style={styles.statChip}>
              <Icon name="camera" size={14} color={colors.text.secondary} />
              <Text style={styles.statText}>{event.shotsPerGuest} çekim</Text>
            </View>
            {event.disposableMode && (
              <View style={styles.statChip}>
                <Icon name="film" size={14} color={colors.text.secondary} />
                <Text style={styles.statText}>Disposable</Text>
              </View>
            )}
            {event.maxGuests && (
              <View style={styles.statChip}>
                <Icon name="users" size={14} color={colors.text.secondary} />
                <Text style={styles.statText}>{event.maxGuests} kişi</Text>
              </View>
            )}
          </View>
        </Animated.View>

        {/* Nickname Input */}
        <Animated.View entering={FadeInDown.delay(400)} style={styles.nicknameSection}>
          <InputField
            label={t('guest.nickname')}
            placeholder={t('guest.nicknamePlaceholder')}
            value={nickname}
            onChangeText={setNickname}
            maxLength={30}
          />
        </Animated.View>

        {/* CTA */}
        <Animated.View entering={FadeInDown.delay(500)} style={styles.ctaSection}>
          <PrimaryButton
            label={t('guest.enterCamera')}
            onPress={handleJoin}
            loading={joining}
          />
          <Text style={styles.anonNote}>{t('auth.anonymousNote')}</Text>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  glow: { position: 'absolute', top: 100, left: '20%', width: '60%', height: 200, borderRadius: 200, backgroundColor: 'rgba(190,106,46,0.12)' },
  centerContent: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.lg, paddingHorizontal: spacing.lg },
  loadingText: { fontSize: typography.sizes.lg, color: colors.text.secondary },
  errorIconWrap: { width: 88, height: 88, borderRadius: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(239,68,68,0.1)', borderWidth: 1, borderColor: 'rgba(239,68,68,0.3)' },
  errorTitle: { fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: colors.text.primary, textAlign: 'center' },
  content: { flex: 1, paddingHorizontal: spacing.lg, gap: spacing.lg },
  coverWrap: { height: 220, borderRadius: radius['2xl'], overflow: 'hidden' },
  coverImage: { width: '100%', height: '100%' },
  coverEmpty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  coverFade: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 80 },
  infoSection: { gap: spacing.sm },
  eventName: { fontSize: typography.sizes['3xl'], fontFamily: fonts.displayBold, color: colors.text.primary },
  eventDate: { fontSize: typography.sizes.sm, color: colors.text.muted },
  stats: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.xs },
  statChip: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.bg.card, borderRadius: radius.full, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: colors.border.DEFAULT },
  statText: { fontSize: typography.sizes.sm, color: colors.text.secondary },
  nicknameSection: {},
  ctaSection: { gap: spacing.sm, marginTop: 'auto' },
  anonNote: { textAlign: 'center', color: colors.text.muted, fontSize: typography.sizes.xs },
});
