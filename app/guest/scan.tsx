import { useEffect, useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView,
  Platform, Dimensions, Alert, Linking,
} from 'react-native';
import { router } from 'expo-router';
import { CameraView, useCameraPermissions, scanFromURLAsync } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import * as Clipboard from 'expo-clipboard';
import * as ImagePicker from 'expo-image-picker';
import { CodeInput, extractCode } from '@shared/components/CodeInput';
import { PrimaryButton } from '@shared/components/PrimaryButton';
import { Icon } from '@shared/components/Icon';
import { colors, typography, spacing, radius, fonts, gradients } from '@constants/theme';

const { width, height } = Dimensions.get('window');
const FRAME_SIZE = width * 0.7;

export default function ScanScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const [mode, setMode] = useState<'scan' | 'code'>('scan');

  // Ask iOS for camera access automatically — don't pre-empt the system prompt
  // with a Settings redirect (App Store 5.1.1).
  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) requestPermission();
  }, [permission?.granted, permission?.canAskAgain]);
  const [code, setCode] = useState('');
  const [scanned, setScanned] = useState(false);

  const scanLine = useSharedValue(0);
  const scanLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scanLine.value }],
  }));

  const startScanAnimation = () => {
    scanLine.value = withRepeat(
      withSequence(
        withTiming(FRAME_SIZE - 4, { duration: 2000 }),
        withTiming(0, { duration: 2000 }),
      ),
      -1,
    );
  };

  const handleBarcode = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    const eventCode = extractCode(data);
    if (!eventCode) { setScanned(false); return; }
    router.push({ pathname: '/guest/join', params: { code: eventCode } });
  };

  const handleManualCode = () => {
    if (code.length !== 6) return;
    router.push({ pathname: '/guest/join', params: { code } });
  };

  const handlePaste = async () => {
    const text = await Clipboard.getStringAsync();
    if (text) setCode(extractCode(text));
  };

  // Pick a saved invite image from the library and decode its QR.
  const handleAlbum = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 1 });
    if (res.canceled || !res.assets?.[0]?.uri) return;
    try {
      const found = await scanFromURLAsync(res.assets[0].uri, ['qr']);
      const data = found?.[0]?.data;
      const eventCode = data ? extractCode(data) : '';
      if (eventCode.length === 6) router.push({ pathname: '/guest/join', params: { code: eventCode } });
      else Alert.alert(t('errors.invalidQR'));
    } catch {
      Alert.alert(t('errors.invalidQR'));
    }
  };

  if (!permission) {
    return <LinearGradient colors={gradients.page} style={styles.container} />;   // resolving
  }
  // Only the scan tab needs the camera — the code tab works without it.
  if (!permission.granted && mode === 'scan') {
    const canAsk = permission.canAskAgain;
    return (
      <LinearGradient colors={gradients.page} style={styles.container}>
        <View style={[styles.permContent, { paddingTop: insets.top + spacing.lg }]}>
          <Icon name="camera" size={56} color={colors.brand.light} strokeWidth={1.6} />
          <Text style={styles.permTitle}>{t('errors.cameraPermission')}</Text>
          <Text style={styles.permDesc}>{canAsk ? t('errors.cameraPermissionAsk') : t('errors.cameraPermissionDesc')}</Text>
          <PrimaryButton
            label={canAsk ? t('errors.cameraGrant') : t('errors.openSettings')}
            onPress={canAsk ? requestPermission : () => Linking.openSettings()}
          />
          {/* The camera isn't a hard gate — let guests type the code instead. */}
          <TouchableOpacity onPress={() => setMode('code')} style={styles.permCodeBtn}>
            <Icon name="keyboard" size={18} color={colors.brand.DEFAULT} />
            <Text style={styles.permCodeText}>{t('guest.enterCode')}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      {/* Camera */}
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        onBarcodeScanned={mode === 'scan' ? handleBarcode : undefined}
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onCameraReady={startScanAnimation}
      />

      {/* Overlay */}
      <LinearGradient
        colors={['rgba(10,10,15,0.8)', 'transparent', 'transparent', 'rgba(10,10,15,0.95)']}
        locations={[0, 0.2, 0.6, 1]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      {/* Top Bar */}
      <View style={[styles.topBar, { paddingTop: insets.top + spacing.sm }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.topIconBtn}>
          <Icon name="arrowLeft" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.topTitle}>{t('guest.scanQR')}</Text>
        <TouchableOpacity onPress={() => setMode(mode === 'scan' ? 'code' : 'scan')} style={styles.topIconBtn}>
          <Icon name={mode === 'scan' ? 'keyboard' : 'camera'} size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {mode === 'scan' && (
        <>
          {/* Scan Frame */}
          <View style={styles.frameWrapper}>
            <View style={styles.frame}>
              {/* Corners */}
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />

              {/* Scan line */}
              <Animated.View style={[styles.scanLine, scanLineStyle]} />
            </View>
          </View>

          {/* Instructions */}
          <View style={[styles.bottomInstructions, { paddingBottom: insets.bottom + spacing.xl }]}>
            <Text style={styles.instrText}>{t('guest.scanInstructions')}</Text>
            <View style={styles.scanActions}>
              <TouchableOpacity onPress={() => setMode('code')} style={styles.scanPill} activeOpacity={0.85}>
                <Icon name="keyboard" size={16} color="#fff" />
                <Text style={styles.scanPillText}>{t('guest.enterCode')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAlbum} style={styles.scanPill} activeOpacity={0.85}>
                <Icon name="image" size={16} color="#fff" />
                <Text style={styles.scanPillText}>{t('guest.fromAlbum')}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => router.push('/guest/joined')} style={styles.myEventsBtn} activeOpacity={0.85}>
              <Icon name="gallery" size={18} color={colors.text.inverse} />
              <Text style={styles.myEventsText}>{t('guest.myEvents')}</Text>
              <Icon name="arrowRight" size={16} color={colors.text.inverse} />
            </TouchableOpacity>
          </View>
        </>
      )}

      {mode === 'code' && (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.codeContainer}>
          <View style={[styles.codeSheet, { paddingBottom: insets.bottom + spacing.xl }]}>
            <View style={styles.codeSheetHandle} />
            <Text style={styles.codeSheetTitle}>{t('guest.enterCode')}</Text>
            <Text style={styles.codeSheetHint}>{t('guest.enterCodeOrLink')}</Text>
            <CodeInput value={code} onChange={setCode} autoFocus />
            <TouchableOpacity onPress={handlePaste} style={styles.pasteBtn} activeOpacity={0.7}>
              <Icon name="copy" size={15} color={colors.brand.DEFAULT} />
              <Text style={styles.pasteText}>{t('guest.pasteCode')}</Text>
            </TouchableOpacity>
            <PrimaryButton label={t('guest.joinEvent')} onPress={handleManualCode} disabled={code.length !== 6} />
          </View>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  permContent: { flex: 1, paddingHorizontal: spacing.lg, alignItems: 'center', justifyContent: 'center', gap: spacing.lg },
  permTitle: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.text.primary, textAlign: 'center' },
  permDesc: { fontSize: typography.sizes.sm, color: colors.text.muted, textAlign: 'center' },
  permCodeBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: spacing.sm },
  permCodeText: { fontSize: typography.sizes.base, fontFamily: fonts.bodySemibold, color: colors.brand.DEFAULT },
  topBar: {
    position: 'absolute', top: 0, left: 0, right: 0,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingBottom: spacing.md, zIndex: 10,
  },
  topIconBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  topTitle: { fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, color: '#fff' },
  frameWrapper: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  frame: { width: FRAME_SIZE, height: FRAME_SIZE, overflow: 'hidden' },
  corner: { position: 'absolute', width: 28, height: 28, borderColor: colors.brand.DEFAULT, borderWidth: 3 },
  cornerTL: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 8 },
  cornerTR: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 8 },
  cornerBL: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 8 },
  cornerBR: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 8 },
  scanLine: { position: 'absolute', left: 0, right: 0, top: 2, height: 2, backgroundColor: colors.brand.DEFAULT, shadowColor: colors.brand.DEFAULT, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 6 },
  bottomInstructions: { position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center', gap: spacing.md, paddingHorizontal: spacing.lg },
  instrText: { color: 'rgba(255,255,255,0.7)', fontSize: typography.sizes.sm, textAlign: 'center' },
  scanActions: { flexDirection: 'row', gap: spacing.sm, alignSelf: 'stretch' },
  scanPill: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.16)', borderRadius: radius.full, paddingVertical: 13 },
  scanPillText: { color: '#fff', fontSize: typography.sizes.sm, fontFamily: fonts.bodySemibold },
  myEventsBtn: { alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, backgroundColor: colors.brand.DEFAULT, borderRadius: radius.full, paddingVertical: 16, marginTop: spacing.xs },
  myEventsText: { color: colors.text.inverse, fontSize: typography.sizes.base, fontFamily: fonts.bodyBold },
  codeContainer: { position: 'absolute', bottom: 0, left: 0, right: 0 },
  codeSheet: { backgroundColor: colors.bg.secondary, borderTopLeftRadius: radius['2xl'], borderTopRightRadius: radius['2xl'], padding: spacing.lg, gap: spacing.lg, borderTopWidth: 1, borderColor: colors.border.DEFAULT },
  codeSheetHandle: { width: 36, height: 4, borderRadius: 2, backgroundColor: colors.border.DEFAULT, alignSelf: 'center', marginBottom: spacing.sm },
  codeSheetTitle: { fontSize: typography.sizes.xl, fontFamily: fonts.displayBold, color: colors.text.primary },
  codeSheetHint: { fontSize: typography.sizes.sm, fontFamily: fonts.body, color: colors.text.muted, marginTop: -spacing.sm },
  pasteBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: spacing.xs },
  pasteText: { fontSize: typography.sizes.sm, fontFamily: fonts.bodyMedium, color: colors.brand.DEFAULT },
});
