import { useCallback, useEffect, useState } from 'react';
import { EventService, Photo } from '@features/events/services/eventService';

// Photos per page. The first page streams live; `loadMore` widens the window for
// older photos so very large galleries don't load (or re-render) all at once.
const PAGE = 90;

export interface EventPhotos {
  photos: Photo[];
  loaded: boolean;
  hasMore: boolean;
  loadMore: () => void;
}

// Live newest-first photo feed with cursor-free pagination: the realtime query
// always covers the newest `limit` photos, and `loadMore` raises that limit.
export function useEventPhotos(eventId: string | undefined): EventPhotos {
  const [limit, setLimit] = useState(PAGE);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  // Start over when the event changes so a big window doesn't carry across.
  useEffect(() => {
    setLimit(PAGE);
    setLoaded(false);
    setPhotos([]);
  }, [eventId]);

  useEffect(() => {
    if (!eventId) return;
    const unsub = EventService.subscribeToPhotos(eventId, limit, (rows, more) => {
      setPhotos(rows);
      setHasMore(more);
      setLoaded(true);
    });
    return unsub;
  }, [eventId, limit]);

  const loadMore = useCallback(() => {
    if (hasMore) setLimit((l) => l + PAGE);
  }, [hasMore]);

  return { photos, loaded, hasMore, loadMore };
}
