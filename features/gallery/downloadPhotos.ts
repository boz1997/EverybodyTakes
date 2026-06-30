import * as MediaLibrary from 'expo-media-library/legacy';
import * as FileSystem from 'expo-file-system/legacy';
import { Photo } from '@features/events/services/eventService';

// How many downloads run at once. A small pool finishes bulk saves far faster
// than one-at-a-time without flooding the network or the photo library.
const CONCURRENCY = 4;

// Burns the "GuestCam" stamp into a remote photo, returning a local file uri.
// Supplied on free plans (see useWatermarkBaker); omitted on paid (clean saves).
export type Watermarker = (remoteUri: string) => Promise<string>;

export interface DownloadResult {
  saved: number;
  failed: number;
  lastError: unknown;
}

async function saveOne(photo: Photo, watermark?: Watermarker): Promise<void> {
  // Free image downloads are baked with the watermark first; videos (paid-only)
  // and clean paid saves take the plain download path.
  if (watermark && photo.mediaType !== 'video') {
    const stamped = await watermark(photo.imageUrl);
    await MediaLibrary.saveToLibraryAsync(stamped);
    return;
  }
  const ext = photo.mediaType === 'video' ? 'mp4' : 'jpg';
  const target = FileSystem.cacheDirectory + `${photo.id}.${ext}`;
  const { uri } = await FileSystem.downloadAsync(photo.imageUrl, target);
  await MediaLibrary.saveToLibraryAsync(uri);
}

// Saves a single photo to the camera roll. Throws on failure so callers can
// surface the reason.
export async function savePhotoToLibrary(photo: Photo, watermark?: Watermarker): Promise<void> {
  await saveOne(photo, watermark);
}

// Saves many photos with a bounded concurrency pool, reporting progress as each
// item settles. Never throws — failures are counted and returned. A watermark
// baker, when given, runs the saves one at a time (the off-screen compositor is
// a shared single slot) — see savePhotosToLibrary's worker count below.
export async function savePhotosToLibrary(
  photos: Photo[],
  onProgress?: (done: number, total: number) => void,
  watermark?: Watermarker,
): Promise<DownloadResult> {
  const total = photos.length;
  let saved = 0;
  let failed = 0;
  let lastError: unknown = null;
  let cursor = 0;

  const worker = async (): Promise<void> => {
    while (cursor < total) {
      const photo = photos[cursor++];
      try {
        await saveOne(photo, watermark);
        saved += 1;
      } catch (e) {
        failed += 1;
        lastError = e;
      }
      onProgress?.(saved + failed, total);
    }
  };

  // The watermark baker is a single off-screen slot, so those saves must run
  // serially; clean saves use the full pool.
  const lanes = watermark ? 1 : Math.min(CONCURRENCY, total);
  await Promise.all(Array.from({ length: lanes }, worker));
  return { saved, failed, lastError };
}
