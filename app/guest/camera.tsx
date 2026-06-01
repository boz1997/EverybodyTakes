import { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Dimensions,
  Alert, Platform, Image,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { CameraView, CameraType, FlashMode, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue, useAnimatedStyle, withSequence, withTiming, withSpring, FadeIn, FadeOut,
} from 'react-native-reanimated';
import * as ImageManipulator from 'expo-image-manipulator';
import { EventService, LimitError } from '@features/events/services/eventService';
import { useAuthStore } from '@store/authStore';
import { useEventStore } from '@store/eventStore';
import { getSavedNickname } from '@store/guestEvents';
import { Icon } from '@shared/components/Icon';
import { colors, typography, spacing, radius } from '@constants/theme';

const { width, height } = Dimensions.get('window');

export default function CameraScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuthStore();
  const { shotsRemaining, decrementShots } = useEventStore();
  const [nickname, setNickname] = useState<string | null>(null);
  const [videoAllowed, setVideoAllowed] = useState(false);
  const [mode, setMode] = useState<'photo' | 'video'>('photo');

  useEffect(() => { getSavedNickname().then((n) => setNickname(n || null)); }, []);
  useEffect(() => { if (id) EventService.getById(id).then((e) => setVideoAllowed(!!e?.video)); }, [id]);

  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const [pending, setPending] = useState(0);        // in-flight background uploads
  const [lastPhoto, setLastPhoto] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  const shutterScale = useSharedValue(1);
  const flashOverlay = useSharedValue(0);

  const shutterStyle = useAnimatedStyle(() => ({ transform: [{ scale: shutterScale.value }] }));
  const flashStyle = useAnimatedStyle(() => ({ opacity: flashOverlay.value }));

  // Capture feels instant: grab the frame, decrement optimistically, and run
  // compress+upload in the background so the guest can keep shooting.
  const selectMode = (m: 'photo' | 'video') => {
    if (m === 'video' && !videoAllowed) { Alert.alert(t('guest.videoLocked'), t('guest.videoLockedDesc')); return; }
    setMode(m);
  };

  const handleCapture = async () => {
    if (!cameraRef.current || shotsRemaining <= 0 || !user) return;
    if (mode === 'video') { Alert.alert(t('guest.videoSoon')); return; }

    shutterScale.value = withSequence(withTiming(0.85, { duration: 70 }), withSpring(1));
    flashOverlay.value = withSequence(withTiming(0.9, { duration: 50 }), withTiming(0, { duration: 180 }));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    let photo;
    try {
      photo = await cameraRef.current.takePictureAsync({
        quality: 0.9,
        skipProcessing: Platform.OS === 'android',
      });
    } catch {
      return;
    }
    if (!photo?.uri) return;

    decrementShots();              // optimistic; server transaction is the source of truth
    setLastPhoto(photo.uri);
    setPending((p) => p + 1);
    const uri = photo.uri;

    void (async () => {
      try {
        await EventService.decrementShots(id!, user.uid);
        const compressed = await ImageManipulator.manipulateAsync(
          uri, [{ resize: { width: 1920 } }],
          { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG },
        );
        await EventService.uploadPhoto(id!, user.uid, nickname, compressed.uri);
      } catch (e) {
        if (__DEV__) console.warn('upload failed:', e);
        if (e instanceof LimitError) {
          const msg = e.code === 'photo_cap' ? t('guest.eventPhotoCapReached')
            : e.code === 'event_ended' ? t('errors.eventExpired')
            : t('guest.noShotsRemaining');
          Alert.alert(msg);
        }
      } finally {
        setPending((p) => Math.max(0, p - 1));
      }
    })();
  };

  if (!permission?.granted) {
    return (
      <LinearGradient colors={['#0A0A0F', '#160A2E', '#0A0A0F']} style={styles.container}>
        <View style={styles.permContent}>
          <Icon name="camera" size={56} color={colors.brand.light} strokeWidth={1.6} />
          <Text style={styles.permTitle}>{t('errors.cameraPermission')}</Text>
          <TouchableOpacity onPress={requestPermission} style={styles.permBtn}>
            <Text style={styles.permBtnText}>{t('errors.cameraPermissionDesc')}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  const isLast = shotsRemaining === 1;
  const isEmpty = shotsRemaining === 0;

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing={facing}
        flash={flash}
      />

      {/* Flash overlay */}
      <Animated.View style={[StyleSheet.absoluteFill, styles.flashOverlay, flashStyle]} pointerEvents="none" />

      {/* Top Bar */}
      <View style={[styles.topBar, { paddingTop: insets.top + spacing.sm }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.topBtn}>
          <Icon name="close" size={22} color="#fff" />
        </TouchableOpacity>

        {/* Shot Counter — Film Roll */}
        <View style={styles.shotCounter}>
          <Icon name="film" size={22} color="#fff" />
          <Text style={styles.shotCounterText}>{shotsRemaining}</Text>
          {isLast && (
            <Animated.View entering={FadeIn} style={styles.lastShotBadge}>
              <Text style={styles.lastShotText}>{t('guest.lastShot')}</Text>
            </Animated.View>
          )}
        </View>

        <TouchableOpacity
          onPress={() => setFlash(f => f === 'off' ? 'on' : 'off')}
          style={[styles.topBtn, flash === 'on' && styles.topBtnActive]}
        >
          <Icon name="flash" size={20} color={flash === 'on' ? '#000' : '#fff'} />
        </TouchableOpacity>
      </View>

      {/* Upload Status */}
      {/* Subtle background-upload indicator (non-blocking) */}
      {pending > 0 && (
        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.uploadBanner}>
          <Icon name="download" size={15} color="#fff" />
          <Text style={styles.uploadBannerText}>{t('guest.uploadingCount', { count: pending })}</Text>
        </Animated.View>
      )}

      {/* PHOTO / VIDEO mode toggle */}
      <View style={[styles.modeRow, { bottom: insets.bottom + 120 }]}>
        <TouchableOpacity onPress={() => selectMode('photo')} style={[styles.modePill, mode === 'photo' && styles.modePillActive]}>
          <Text style={[styles.modeText, mode === 'photo' && styles.modeTextActive]}>{t('guest.photoMode')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selectMode('video')} style={[styles.modePill, mode === 'video' && styles.modePillActive]}>
          {!videoAllowed && <Icon name="lock" size={12} color="rgba(255,255,255,0.7)" />}
          <Text style={[styles.modeText, mode === 'video' && styles.modeTextActive]}>{t('guest.videoMode')}</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Controls */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + spacing.lg }]}>

        {/* Gallery — shows the last shot as a film-strip thumbnail */}
        <TouchableOpacity onPress={() => router.back()} style={styles.galleryBtn} activeOpacity={0.85}>
          {lastPhoto ? (
            <Image source={{ uri: lastPhoto }} style={styles.galleryThumb} />
          ) : (
            <Icon name="gallery" size={22} color="#fff" />
          )}
        </TouchableOpacity>

        {/* Shutter */}
        <Animated.View style={shutterStyle}>
          <TouchableOpacity
            onPress={handleCapture}
            disabled={isEmpty}
            style={[styles.shutter, isEmpty && styles.shutterDisabled]}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={isEmpty ? ['#333', '#222'] : ['#fff', '#ddd']}
              style={styles.shutterInner}
            >
              {isEmpty && <Icon name="lock" size={26} color="#888" />}
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Flip Camera */}
        <TouchableOpacity
          onPress={() => setFacing(f => f === 'back' ? 'front' : 'back')}
          style={styles.sideBtn}
        >
          <Icon name="flip" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Empty state overlay */}
      {isEmpty && (
        <View style={styles.emptyOverlay} pointerEvents="none">
          <Icon name="film" size={44} color="rgba(255,255,255,0.7)" strokeWidth={1.6} />
          <Text style={styles.emptyTitle}>{t('guest.noShotsLeft')}</Text>
          <Text style={styles.emptySubtitle}>{t('guest.viewGallery')}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  permContent: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.lg, padding: spacing.lg },
  permTitle: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: '#fff', textAlign: 'center' },
  permBtn: { backgroundColor: colors.brand.DEFAULT, borderRadius: radius.xl, paddingHorizontal: spacing.xl, paddingVertical: 14 },
  permBtnText: { color: '#fff', fontWeight: typography.weights.semibold },
  flashOverlay: { backgroundColor: '#fff', zIndex: 5 },
  topBar: {
    position: 'absolute', top: 0, left: 0, right: 0,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingBottom: spacing.md, zIndex: 10,
  },
  topBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
  topBtnActive: { backgroundColor: colors.gold.DEFAULT },
  shotCounter: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: radius.full, paddingHorizontal: 20, paddingVertical: 11 },
  shotCounterText: { fontSize: typography.sizes['2xl'], fontWeight: typography.weights.bold, color: '#fff' },
  lastShotBadge: { backgroundColor: colors.warning, borderRadius: radius.full, paddingHorizontal: 8, paddingVertical: 2 },
  lastShotText: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, color: '#000' },
  uploadBanner: {
    position: 'absolute', top: '40%', alignSelf: 'center',
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.85)', borderRadius: radius.full,
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md, zIndex: 20,
    borderWidth: 1, borderColor: colors.border.DEFAULT,
  },
  uploadBannerText: { color: '#fff', fontSize: typography.sizes.sm, fontWeight: typography.weights.medium },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',
    paddingTop: spacing.lg, zIndex: 10,
  },
  sideBtn: { width: 52, height: 52, borderRadius: 26, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
  galleryBtn: { width: 56, height: 56, borderRadius: 14, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderWidth: 2, borderColor: 'rgba(255,255,255,0.7)' },
  galleryThumb: { width: '100%', height: '100%' },
  modeRow: { position: 'absolute', alignSelf: 'center', flexDirection: 'row', gap: spacing.sm, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: radius.full, padding: 4 },
  modePill: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 16, paddingVertical: 7, borderRadius: radius.full },
  modePillActive: { backgroundColor: 'rgba(255,255,255,0.9)' },
  modeText: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, color: 'rgba(255,255,255,0.8)', letterSpacing: 1 },
  modeTextActive: { color: '#000' },
  shutter: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: '#fff', overflow: 'hidden', padding: 4 },
  shutterDisabled: { opacity: 0.4, borderColor: '#555' },
  shutterInner: { flex: 1, borderRadius: 34, alignItems: 'center', justifyContent: 'center' },
  emptyOverlay: {
    position: 'absolute', bottom: 160, left: 0, right: 0,
    alignItems: 'center', gap: spacing.sm, zIndex: 5,
  },
  emptyTitle: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: '#fff', marginTop: spacing.sm },
  emptySubtitle: { fontSize: typography.sizes.sm, color: 'rgba(255,255,255,0.6)' },
});
