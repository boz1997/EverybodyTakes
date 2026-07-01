import { describe, it, expect } from 'vitest';
import { formatDuration } from '@shared/utils/formatDuration';

describe('formatDuration', () => {
  it('formats sub-minute clips as 0:ss with a zero-padded seconds field', () => {
    expect(formatDuration(0)).toBe('0:00');
    expect(formatDuration(7000)).toBe('0:07');
    expect(formatDuration(59000)).toBe('0:59');
  });

  it('rolls over into minutes at 60 s', () => {
    expect(formatDuration(60000)).toBe('1:00');
    expect(formatDuration(63000)).toBe('1:03');
    expect(formatDuration(125000)).toBe('2:05');
  });

  it('floors partial seconds (a 7.9 s clip is still 0:07)', () => {
    expect(formatDuration(7900)).toBe('0:07');
  });

  it('clamps negative / non-finite input to 0:00', () => {
    expect(formatDuration(-5000)).toBe('0:00');
    expect(formatDuration(NaN)).toBe('0:00');
    expect(formatDuration(Infinity)).toBe('0:00');
  });
});
