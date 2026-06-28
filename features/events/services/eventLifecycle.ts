// Event & account deletion. The teardown (Storage objects + Firestore docs +
// subcollections) runs in the deleteEvent / deleteAccountData Cloud Functions
// where the Admin SDK can bulk-delete by prefix and recurse subcollections —
// the client SDK can do neither reliably. These wrappers just invoke them.
import { getApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';

// Host-only: delete an event and everything under it.
export async function deleteEventCompletely(eventId: string): Promise<void> {
  const fn = httpsCallable<{ eventId: string }, { ok: true }>(getFunctions(getApp()), 'deleteEvent');
  await fn({ eventId });
}

// Delete all data tied to the current user. The caller deletes the auth user
// afterwards. `joinedEventIds` come from the device's "My events" list so the
// function can clean the user's uploads out of events they only joined.
export async function deleteAccountData(joinedEventIds: string[]): Promise<void> {
  const fn = httpsCallable<{ joinedEventIds: string[] }, { ok: true }>(getFunctions(getApp()), 'deleteAccountData');
  await fn({ joinedEventIds });
}
