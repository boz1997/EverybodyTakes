// Retries an async operation a few times on failure, with a small linear
// backoff. For transient network blips (e.g. a photo upload over flaky event
// wifi). Stops early if `shouldRetry` says the error isn't worth retrying.
export async function withRetry<T>(
  fn: () => Promise<T>,
  opts: { attempts?: number; delayMs?: number; shouldRetry?: (e: unknown) => boolean } = {},
): Promise<T> {
  const { attempts = 3, delayMs = 800, shouldRetry = () => true } = opts;
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e;
      if (i === attempts - 1 || !shouldRetry(e)) throw e;
      await new Promise((r) => setTimeout(r, delayMs * (i + 1)));
    }
  }
  throw lastError;
}
