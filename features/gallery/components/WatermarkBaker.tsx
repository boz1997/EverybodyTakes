import { useCallback, useRef, useState, ReactNode } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { WatermarkOverlay } from './WatermarkOverlay';

// Longest edge of the baked file. Uploads are already compressed to ~1920px, so
// this only guards the rare oversized original from blowing up memory.
const MAX_EDGE = 1920;

interface BakeTarget {
  uri: string;
  aspect: number;
  width: number;
  height: number;
  resolve: (localUri: string) => void;
  reject: (err: unknown) => void;
}

export interface WatermarkBaker {
  /** Hidden compositor node — mount once near the gallery root. */
  node: ReactNode;
  /** Downloads the remote photo with the watermark burned in; returns a file uri. */
  bake: (remoteUri: string) => Promise<string>;
}

// Off-screen compositor: renders one photo + the watermark into a ViewShot and
// captures it to a JPG, so a free download carries the "GuestCam" stamp (the
// gallery overlay alone wouldn't survive a save). Photos are baked one at a time.
export function useWatermarkBaker(): WatermarkBaker {
  const shotRef = useRef<View>(null);
  const [target, setTarget] = useState<BakeTarget | null>(null);

  const bake = useCallback((remoteUri: string) => new Promise<string>((resolve, reject) => {
    Image.getSize(
      remoteUri,
      (w, h) => setTarget({ uri: remoteUri, aspect: w / h, width: w, height: h, resolve, reject }),
      (err) => reject(err),
    );
  }), []);

  const capture = useCallback(async () => {
    if (!target) return;
    const t = target;
    try {
      const scale = Math.min(1, MAX_EDGE / Math.max(t.width, t.height));
      const out = await captureRef(shotRef, {
        format: 'jpg',
        quality: 0.95,
        width: Math.round(t.width * scale),
        height: Math.round(t.height * scale),
      });
      t.resolve(out);
    } catch (e) {
      t.reject(e);
    } finally {
      setTarget(null);
    }
  }, [target]);

  const node = target ? (
    // Pushed off-screen but still laid out + painted — view-shot can't capture a
    // zero-size or display:none view. The capture waits a frame after the image
    // paints so layout has settled.
    <View style={styles.offscreen} pointerEvents="none">
      <View ref={shotRef} collapsable={false} style={[styles.canvas, { aspectRatio: target.aspect }]}>
        <Image
          source={{ uri: target.uri }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          onLoadEnd={() => requestAnimationFrame(capture)}
        />
        <WatermarkOverlay size="lg" />
      </View>
    </View>
  ) : null;

  return { node, bake };
}

const styles = StyleSheet.create({
  offscreen: { position: 'absolute', left: -10000, top: 0 },
  canvas: { width: 320 },
});
