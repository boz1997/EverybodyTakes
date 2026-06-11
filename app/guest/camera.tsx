import { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Alert, Platform, Image, Linking,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { CameraView, CameraType, FlashMode, CameraMode, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue, useAnimatedStyle, withSequence, withTiming, withSpring, FadeIn,
} from 'react-native-reanimated';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { EventService, LimitError } from '@features/events/services/eventService';
import { useAuthStore } from '@store/authStore';
import { useEventStore } from '@store/eventStore';
import { getSavedNickname } from '@store/guestEvents';
import { startShotsActivity, updateShotsActivity, stopShotsActivity } from '@shared/liveActivity';
import { Icon } from '@shared/components/Icon';
import { colors, typography, spacing, radius } from '@constants/theme';

const MAX_VIDEO_SECS = 15;   // keep clips short — storage-friendly & on-brand

export default function CameraScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuthStore();
  const { shotsRemaining, decrementShots } = useEventStore();
  const [nickname, setNickname] = useState<string | null>(null);
  const [videoAllowed, setVideoAllowed] = useState(false);
  const [disposable, setDisposable] = useState(true);       // disposable = instant, no preview
  const [galleryUpload, setGalleryUpload] = useState(false);
  const [mode, setMode] = useState<'photo' | 'video'>('photo');
  const [eventName, setEventName] = useState('');
  const [totalShots, setTotalShots] = useState(0);

  useEffect(() => { getSavedNickname().then((n) => setNickname(n || null)); }, []);
  useEffect(() => {
    if (!id) return;
    EventService.getById(id).then((e) => {
      setVideoAllowed(!!e?.video);
      setDisposable(e?.disposableMode ?? true);
      setGalleryUpload(!!e?.allowGalleryUpload);
      setEventName(e?.name ?? '');
      setTotalShots(e?.shotsPerGuest ?? 0);
    });
  }, [id]);

  const [permission, requestPermission] = useCameraPermissions();
  const [micPermission, requestMicPermission] = useMicrophonePermissions();

  // Show the system permission prompt automatically when undetermined — never
  // send the user to Settings before iOS has even asked (App Store 5.1.1).
  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) requestPermission();
  }, [permission?.granted, permission?.canAskAgain]);
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const [lastPhoto, setLastPhoto] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);   // non-disposable: confirm before upload
  const [recording, setRecording] = useState(false);
  const [recordSecs, setRecordSecs] = useState(0);
  const cameraRef = useRef<CameraView>(null);
  const recordTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const activityId = useRef<string | null>(null);
  const activityState = useRef({ title: '', subtitle: '', progress: 0 });
  // Serialize background uploads so rapid shutter taps don't fire overlapping
  // Firestore transactions on the same docs (which caused failed-precondition
  // conflicts). Capture stays instant; uploads just drain in order.
  const uploadChain = useRef<Promise<void>>(Promise.resolve());

  // CameraView needs mode="video" to record; switching to it on demand keeps
  // photo capture as the fast default.
  const cameraMode: CameraMode = mode === 'video' ? 'video' : 'picture';

  const shutterScale = useSharedValue(1);
  const flashOverlay = useSharedValue(0);
  const counterScale = useSharedValue(1);

  const shutterStyle = useAnimatedStyle(() => ({ transform: [{ scale: shutterScale.value }] }));
  const flashStyle = useAnimatedStyle(() => ({ opacity: flashOverlay.value }));
  const counterStyle = useAnimatedStyle(() => ({ transform: [{ scale: counterScale.value }] }));

  // Fun counter: bounce the big number each time a shot is consumed.
  useEffect(() => {
    counterScale.value = withSequence(withTiming(1.3, { duration: 110 }), withSpring(1, { damping: 6 }));
  }, [shotsRemaining]);

  // Lock-screen Live Activity: event name + shots remaining, updated as you
  // shoot. Starts when the event is known; ends when leaving the camera.
  useEffect(() => {
    if (!eventName) return;
    const subtitle = t('guest.shotsRemaining', { count: shotsRemaining });
    const progress = totalShots ? shotsRemaining / totalShots : undefined;
    activityState.current = { title: eventName, subtitle, progress: progress ?? 0 };
    if (!activityId.current) {
      activityId.current = startShotsActivity(eventName, subtitle, progress);
    } else {
      updateShotsActivity(activityId.current, eventName, subtitle, progress);
    }
  }, [eventName, shotsRemaining, totalShots]);

  useEffect(() => () => {
    if (activityId.current) {
      const s = activityState.current;
      stopShotsActivity(activityId.current, s.title, s.subtitle, s.progress);
      activityId.current = null;
    }
  }, []);

  // Compress + upload silently in the background — the guest never waits and
  // never sees an "uploading" stage. The server transaction is the source of truth.
  // Videos are uploaded as-is (no client compression).
  const uploadInBackground = (uri: string, kind: 'image' | 'video' = 'image') => {
    if (!user) return;
    decrementShots();              // optimistic
    setLastPhoto(uri);
    // Chain onto the previous upload so they run one-at-a-time per device.
    uploadChain.current = uploadChain.current.then(async () => {
      try {
        await EventService.decrementShots(id!, user.uid);
        let upload = uri;
        if (kind === 'image') {
          const compressed = await ImageManipulator.manipulateAsync(
            uri, [{ resize: { width: 1920 } }],
            { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG },
          );
          upload = compressed.uri;
        }
        await EventService.uploadPhoto(id!, user.uid, nickname, upload, kind);
      } catch (e) {
        if (__DEV__) console.warn('upload failed:', e);
        if (e instanceof LimitError) {
          if (e.code === 'photo_cap') Alert.alert(t('guest.eventCapTitle'), t('guest.eventCapBody'));
          else if (e.code === 'event_ended') Alert.alert(t('errors.eventExpired'));
          else Alert.alert(t('guest.limitReachedTitle'), t('guest.limitReachedBody'));
        }
      }
    });
  };

  const selectMode = (m: 'photo' | 'video') => {
    if (recording) return;
    if (m === 'video' && !videoAllowed) { Alert.alert(t('guest.videoLocked'), t('guest.videoLockedDesc')); return; }
    setMode(m);
  };

  const stopTimer = () => {
    if (recordTimer.current) { clearInterval(recordTimer.current); recordTimer.current = null; }
  };
  useEffect(() => stopTimer, []);

  const handleCapturePhoto = async () => {
    if (!cameraRef.current) return;
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

    // Disposable → instant, no second-guessing. Otherwise show a preview to confirm.
    if (disposable) uploadInBackground(photo.uri);
    else setPreview(photo.uri);
  };

  const toggleRecording = async () => {
    if (!cameraRef.current) return;

    // Stop an in-progress recording — the recordAsync promise below resolves.
    if (recording) { cameraRef.current.stopRecording(); return; }

    // Need microphone access for sound; ask once.
    if (!micPermission?.granted) {
      const res = await requestMicPermission();
      if (!res.granted) { Alert.alert(t('guest.micPermission'), t('guest.micPermissionDesc')); return; }
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setRecording(true);
    setRecordSecs(0);
    recordTimer.current = setInterval(() => setRecordSecs((s) => s + 1), 1000);

    try {
      const video = await cameraRef.current.recordAsync({ maxDuration: MAX_VIDEO_SECS });
      // Video always uploads silently in the background — recording itself is
      // the feedback, so there's no separate confirm step to slow things down.
      if (video?.uri) uploadInBackground(video.uri, 'video');
    } catch (e: unknown) {
      if (__DEV__) console.warn('record failed:', e);
      const msg = String((e as { message?: string })?.message ?? '');
      // The iOS Simulator has no camera hardware, so recording can't work there.
      if (msg.includes('simulator')) Alert.alert(t('guest.videoSimulator'));
    } finally {
      stopTimer();
      setRecording(false);
      setRecordSecs(0);
    }
  };

  const handleCapture = () => {
    if (shotsRemaining <= 0 || !user) return;
    if (mode === 'video') { void toggleRecording(); return; }
    void handleCapturePhoto();
  };

  const pickFromLibrary = async () => {
    if (shotsRemaining <= 0) return;
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.9,
    });
    if (res.canceled || !res.assets?.[0]?.uri) return;
    setPreview(res.assets[0].uri);   // gallery uploads are only enabled in non-disposable mode
  };

  const confirmPreview = () => {
    if (!preview) return;
    uploadInBackground(preview);
    setPreview(null);
  };

  if (!permission) {
    return <View style={[styles.container, { backgroundColor: '#0A0A0F' }]} />;   // resolving
  }
  if (!permission.granted) {
    const canAsk = permission.canAskAgain;
    return (
      <LinearGradient colors={['#0A0A0F', '#160A2E', '#0A0A0F']} style={styles.container}>
        <View style={styles.permContent}>
          <Icon name="camera" size={56} color={colors.brand.light} strokeWidth={1.6} />
          <Text style={styles.permTitle}>{t('errors.cameraPermission')}</Text>
          <Text style={styles.permDesc}>{canAsk ? t('errors.cameraPermissionAsk') : t('errors.cameraPermissionDesc')}</Text>
          <TouchableOpacity onPress={canAsk ? requestPermission : () => Linking.openSettings()} style={styles.permBtn}>
            <Text style={styles.permBtnText}>{canAsk ? t('errors.cameraGrant') : t('errors.openSettings')}</Text>
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
        mode={cameraMode}
        videoQuality="1080p"
      />

      {/* Flash overlay */}
      <Animated.View style={[StyleSheet.absoluteFill, styles.flashOverlay, flashStyle]} pointerEvents="none" />

      {/* Top Bar */}
      <View style={[styles.topBar, { paddingTop: insets.top + spacing.sm }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.topBtn}>
          <Icon name="close" size={22} color="#fff" />
        </TouchableOpacity>

        {/* Fun shot counter — big number that bounces & shrinks as you shoot */}
        <Animated.View style={[styles.shotCounter, isLast && styles.shotCounterLast, counterStyle]}>
          <Icon name="film" size={18} color={isLast ? '#000' : '#fff'} />
          <Text style={[styles.shotCounterNum, isLast && styles.shotCounterNumLast]}>{shotsRemaining}</Text>
          <Text style={[styles.shotCounterLabel, isLast && styles.shotCounterLabelLast]}>
            {isLast ? t('guest.lastShot') : t('guest.shotsLeftLabel')}
          </Text>
        </Animated.View>

        <TouchableOpacity
          onPress={() => setFlash(f => f === 'off' ? 'on' : 'off')}
          style={[styles.topBtn, flash === 'on' && styles.topBtnActive]}
        >
          <Icon name="flash" size={20} color={flash === 'on' ? '#000' : '#fff'} />
        </TouchableOpacity>
      </View>

      {/* Recording indicator */}
      {recording && (
        <Animated.View entering={FadeIn} style={[styles.recPill, { top: insets.top + 70 }]}>
          <View style={styles.recDot} />
          <Text style={styles.recText}>{`0:${String(recordSecs).padStart(2, '0')}`}</Text>
        </Animated.View>
      )}

      {/* PHOTO / VIDEO mode toggle — hidden while recording */}
      {!recording && (
        <View style={[styles.modeRow, { bottom: insets.bottom + 120 }]}>
          <TouchableOpacity onPress={() => selectMode('photo')} style={[styles.modePill, mode === 'photo' && styles.modePillActive]}>
            <Text style={[styles.modeText, mode === 'photo' && styles.modeTextActive]}>{t('guest.photoMode')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => selectMode('video')} style={[styles.modePill, mode === 'video' && styles.modePillActive]}>
            {!videoAllowed && <Icon name="lock" size={12} color="rgba(255,255,255,0.7)" />}
            <Text style={[styles.modeText, mode === 'video' && styles.modeTextActive]}>{t('guest.videoMode')}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom Controls */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + spacing.lg }]}>

        {/* Left: pick from gallery (non-disposable) or jump to the event gallery */}
        {galleryUpload && !disposable ? (
          <TouchableOpacity onPress={pickFromLibrary} disabled={isEmpty} style={styles.galleryBtn} activeOpacity={0.85}>
            {lastPhoto ? (
              <Image source={{ uri: lastPhoto }} style={styles.galleryThumb} />
            ) : (
              <Icon name="gallery" size={22} color="#fff" />
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => router.back()} style={styles.galleryBtn} activeOpacity={0.85}>
            {lastPhoto ? (
              <Image source={{ uri: lastPhoto }} style={styles.galleryThumb} />
            ) : (
              <Icon name="gallery" size={22} color="#fff" />
            )}
          </TouchableOpacity>
        )}

        {/* Shutter — circle for photo, red dot for video, red square while recording */}
        <Animated.View style={shutterStyle}>
          <TouchableOpacity
            onPress={handleCapture}
            disabled={isEmpty}
            style={[styles.shutter, mode === 'video' && styles.shutterVideo, isEmpty && styles.shutterDisabled]}
            activeOpacity={0.8}
          >
            {mode === 'video' ? (
              <View style={[styles.recInner, recording && styles.recInnerStop]} />
            ) : (
              <LinearGradient
                colors={isEmpty ? ['#333', '#222'] : ['#fff', '#ddd']}
                style={styles.shutterInner}
              >
                {isEmpty && <Icon name="lock" size={26} color="#888" />}
              </LinearGradient>
            )}
          </TouchableOpacity>
        </Animated.View>

        {/* Flip Camera — disabled mid-recording */}
        <TouchableOpacity
          onPress={() => !recording && setFacing(f => f === 'back' ? 'front' : 'back')}
          style={[styles.sideBtn, recording && styles.disabledBtn]}
          disabled={recording}
        >
          <Icon name="flip" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Empty state overlay — per-guest limit reached, thank-you */}
      {isEmpty && (
        <View style={styles.emptyOverlay} pointerEvents="none">
          <Icon name="film" size={44} color="rgba(255,255,255,0.7)" strokeWidth={1.6} />
          <Text style={styles.emptyTitle}>{t('guest.limitReachedTitle')}</Text>
          <Text style={styles.emptySubtitle}>{t('guest.limitReachedBody')}</Text>
        </View>
      )}

      {/* Preview & confirm (non-disposable mode) */}
      {preview && (
        <Animated.View entering={FadeIn} style={styles.previewOverlay}>
          <Image source={{ uri: preview }} style={StyleSheet.absoluteFill} resizeMode="contain" />
          <View style={[styles.previewBar, { paddingBottom: insets.bottom + spacing.lg, paddingTop: insets.top + spacing.sm }]}>
            <TouchableOpacity onPress={() => setPreview(null)} style={styles.previewRetake} activeOpacity={0.85}>
              <Icon name="close" size={20} color="#fff" />
              <Text style={styles.previewRetakeText}>{t('guest.retake')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmPreview} style={styles.previewUse} activeOpacity={0.85}>
              <Icon name="check" size={20} color="#000" strokeWidth={2.6} />
              <Text style={styles.previewUseText}>{t('guest.usePhoto')}</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  permContent: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.lg, padding: spacing.lg },
  permTitle: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: '#fff', textAlign: 'center' },
  permDesc: { fontSize: typography.sizes.sm, color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginTop: -spacing.sm },
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
  shotCounter: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: radius.full,
    paddingLeft: 16, paddingRight: 18, paddingVertical: 8,
  },
  shotCounterLast: { backgroundColor: colors.warning },
  shotCounterNum: { fontSize: 30, fontWeight: typography.weights.bold, color: '#fff', lineHeight: 34 },
  shotCounterNumLast: { color: '#000' },
  shotCounterLabel: { fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, color: 'rgba(255,255,255,0.7)', letterSpacing: 1 },
  shotCounterLabelLast: { color: '#000' },
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
  shutter: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: '#fff', overflow: 'hidden', padding: 4, alignItems: 'center', justifyContent: 'center' },
  shutterVideo: { borderColor: '#fff' },
  shutterDisabled: { opacity: 0.4, borderColor: '#555' },
  shutterInner: { flex: 1, alignSelf: 'stretch', borderRadius: 34, alignItems: 'center', justifyContent: 'center' },
  recInner: { width: 58, height: 58, borderRadius: 29, backgroundColor: '#FF3B30' },
  recInnerStop: { width: 32, height: 32, borderRadius: 8 },
  disabledBtn: { opacity: 0.4 },
  recPill: {
    position: 'absolute', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: radius.full, paddingHorizontal: 14, paddingVertical: 7, zIndex: 11,
  },
  recDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FF3B30' },
  recText: { color: '#fff', fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, letterSpacing: 1 },
  emptyOverlay: {
    position: 'absolute', bottom: 160, left: 0, right: 0,
    alignItems: 'center', gap: spacing.sm, zIndex: 5,
  },
  emptyTitle: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: '#fff', marginTop: spacing.sm },
  emptySubtitle: { fontSize: typography.sizes.sm, color: 'rgba(255,255,255,0.6)' },
  previewOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#000', zIndex: 30, justifyContent: 'flex-end' },
  previewBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.xl, gap: spacing.md,
    position: 'absolute', bottom: 0, left: 0, right: 0,
  },
  previewRetake: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: radius.full,
    paddingHorizontal: spacing.lg, paddingVertical: 14,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)',
  },
  previewRetakeText: { color: '#fff', fontSize: typography.sizes.base, fontWeight: typography.weights.semibold },
  previewUse: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm,
    backgroundColor: '#fff', borderRadius: radius.full, paddingVertical: 14,
  },
  previewUseText: { color: '#000', fontSize: typography.sizes.base, fontWeight: typography.weights.bold },
});
