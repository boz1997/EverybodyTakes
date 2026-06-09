// Whole-gallery ZIP export. The heavy lifting happens in the createEventZip
// Cloud Function (host-only); this just calls it and returns the download URL.
import { getApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';

export interface ZipResult {
  url: string;
  count: number;
}

export async function createEventZip(eventId: string): Promise<ZipResult> {
  const fn = httpsCallable<{ eventId: string }, ZipResult>(getFunctions(getApp()), 'createEventZip');
  const res = await fn({ eventId });
  return res.data;
}
