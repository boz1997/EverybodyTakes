import * as MediaLibrary from 'expo-media-library/legacy';
import * as FileSystem from 'expo-file-system/legacy';
import { Photo } from '@features/events/services/eventService';

// How many downloads run at once. A small pool finishes bulk saves far faster
// than one-at-a-time without flooding the network or the photo library.
const CONCURRENCY = 4;

export interface DownloadResult {
  saved: number;
  failed: number;
  lastError: unknown;
}

async function saveOne(photo: Photo): Promise<void> {
  const ext = photo.mediaType === 'video' ? 'mp4' : 'jpg';
  const target = FileSystem.cacheDirectory + `${photo.id}.${ext}`;
  const { uri } = await FileSystem.downloadAsync(photo.imageUrl, target);
  await MediaLibrary.saveToLibraryAsync(uri);
}

// Saves a single photo to the camera roll. Throws on failure so callers can
// surface the reason.
export async function savePhotoToLibrary(photo: Photo): Promise<void> {
  await saveOne(photo);
}

// Saves many photos with a bounded concurrency pool, reporting progress as each
// item settles. Never throws — failures are counted and returned.
export async function savePhotosToLibrary(
  photos: Photo[],
  onProgress?: (done: number, total: number) => void,
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
        await saveOne(photo);
        saved += 1;
      } catch (e) {
        failed += 1;
        lastError = e;
      }
      onProgress?.(saved + failed, total);
    }
  };

  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, total) }, worker));
  return { saved, failed, lastError };
}
