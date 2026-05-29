import { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView,
  Platform, Dimensions, Alert,
} from 'react-native';
import { router } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { InputField } from '@shared/components/InputField';
import { PrimaryButton } from '@shared/components/PrimaryButton';
import { colors, typography, spacing, radius } from '@constants/theme';

const { width, height } = Dimensions.get('window');
const FRAME_SIZE = width * 0.7;

export default function ScanScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const [mode, setMode] = useState<'scan' | 'code'>('scan');
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

    // Extract event code from URL or use raw
    const match = data.match(/\/e\/([A-Z0-9]+)/);
    const eventCode = match ? match[1] : data.toUpperCase();

    router.push({ pathname: '/guest/join', params: { code: eventCode } });
  };

  const handleManualCode = () => {
    if (!code.trim()) return;
    router.push({ pathname: '/guest/join', params: { code: code.trim().toUpperCase() } });
  };

  if (!permission?.granted) {
    return (
      <LinearGradient colors={['#0A0A0F', '#160A2E', '#0A0A0F']} style={styles.container}>
        <View style={[styles.permContent, { paddingTop: insets.top + spacing.lg }]}>
          <Text style={styles.permEmoji}>📷</Text>
          <Text style={styles.permTitle}>{t('errors.cameraPermission')}</Text>
          <Text style={styles.permDesc}>{t('errors.cameraPermissionDesc')}</Text>
          <PrimaryButton label={t('errors.cameraPermission')} onPress={requestPermission} />
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
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>{t('guest.scanQR')}</Text>
        <TouchableOpacity onPress={() => setMode(mode === 'scan' ? 'code' : 'scan')}>
          <Text style={styles.modeToggle}>{mode === 'scan' ? '⌨️' : '📷'}</Text>
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
            <TouchableOpacity onPress={() => setMode('code')} style={styles.codeLink}>
              <Text style={styles.codeLinkText}>{t('guest.enterCode')}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {mode === 'code' && (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.codeContainer}>
          <View style={[styles.codeSheet, { paddingBottom: insets.bottom + spacing.xl }]}>
            <View style={styles.codeSheetHandle} />
            <Text style={styles.codeSheetTitle}>{t('guest.enterCode')}</Text>
            <InputField
              placeholder={t('guest.enterCodePlaceholder')}
              value={code}
              onChangeText={(v) => setCode(v.toUpperCase())}
              autoCapitalize="characters"
              autoFocus
              maxLength={12}
            />
            <PrimaryButton label={t('guest.joinEvent')} onPress={handleManualCode} disabled={!code.trim()} />
          </View>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  permContent: { flex: 1, paddingHorizontal: spacing.lg, alignItems: 'center', justifyContent: 'center', gap: spacing.lg },
  permEmoji: { fontSize: 64 },
  permTitle: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.text.primary, textAlign: 'center' },
  permDesc: { fontSize: typography.sizes.sm, color: colors.text.muted, textAlign: 'center' },
  topBar: {
    position: 'absolute', top: 0, left: 0, right: 0,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: spacing.lg, paddingBottom: spacing.md, zIndex: 10,
  },
  backText: { fontSize: 24, color: '#fff' },
  topTitle: { fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, color: '#fff' },
  modeToggle: { fontSize: 24 },
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
  codeLink: { paddingVertical: spacing.sm },
  codeLinkText: { color: colors.brand.light, fontSize: typography.sizes.base, fontWeight: typography.weights.medium },
  codeContainer: { position: 'absolute', bottom: 0, left: 0, right: 0 },
  codeSheet: { backgroundColor: colors.bg.secondary, borderTopLeftRadius: radius['2xl'], borderTopRightRadius: radius['2xl'], padding: spacing.lg, gap: spacing.lg, borderTopWidth: 1, borderColor: colors.border.DEFAULT },
  codeSheetHandle: { width: 36, height: 4, borderRadius: 2, backgroundColor: colors.border.DEFAULT, alignSelf: 'center', marginBottom: spacing.sm },
  codeSheetTitle: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.text.primary },
});
