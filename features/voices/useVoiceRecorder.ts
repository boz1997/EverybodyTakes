import { useEffect, useRef, useState } from 'react';
import {
  useAudioRecorder,
  useAudioRecorderState,
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
} from 'expo-audio';
import { VOICE_MAX_MS } from '@features/events/services/eventService';

// Mono, moderate-bitrate .m4a — plenty for speech and ~0.5 MB per minute, so a
// 60 s clip stays well under the Storage size cap.
const VOICE_RECORDING_OPTIONS = { ...RecordingPresets.HIGH_QUALITY, numberOfChannels: 1, bitRate: 64000 };

export type StartResult = 'ok' | 'denied' | 'error';

export interface VoiceRecorder {
  isRecording: boolean;
  elapsedMs: number;          // live length while recording
  uri: string | null;         // the finished clip, once recording stops
  durationMs: number;         // the finished clip's length (frozen at stop)
  start: () => Promise<StartResult>;
  stop: () => Promise<void>;
  clear: () => void;          // drop the finished clip (for a re-record)
}

// Wraps expo-audio's recorder: handles the mic permission, caps the clip at
// VOICE_MAX_MS (auto-stops), and surfaces the finished file uri. The recorder
// instance is released automatically when the host component unmounts.
export function useVoiceRecorder(): VoiceRecorder {
  const recorder = useAudioRecorder(VOICE_RECORDING_OPTIONS);
  const state = useAudioRecorderState(recorder, 200);
  const [uri, setUri] = useState<string | null>(null);
  const [durationMs, setDurationMs] = useState(0);
  const stoppingRef = useRef(false);

  const finish = async () => {
    if (stoppingRef.current) return;
    stoppingRef.current = true;
    // Freeze the length now — the recorder's live counter resets after stop().
    const ms = Math.round((recorder.currentTime || 0) * 1000);
    try {
      await recorder.stop();
      setUri(recorder.uri ?? null);
      setDurationMs(ms);
    } catch {
      // keep uri null — the modal treats a missing clip as "nothing recorded"
    }
  };

  // Hard cap: stop on its own once the clip reaches the max length.
  useEffect(() => {
    if (state.isRecording && state.durationMillis >= VOICE_MAX_MS) {
      void finish();
    }
  }, [state.isRecording, state.durationMillis]);

  const start = async (): Promise<StartResult> => {
    try {
      const { granted } = await requestRecordingPermissionsAsync();
      if (!granted) return 'denied';
      await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
      await recorder.prepareToRecordAsync();
      stoppingRef.current = false;
      setUri(null);
      recorder.record();
      return 'ok';
    } catch {
      return 'error';
    }
  };

  const stop = async () => {
    await finish();
    // Restore playback routing so the preview is audible even on silent mode.
    await setAudioModeAsync({ allowsRecording: false, playsInSilentMode: true }).catch(() => {});
  };

  const clear = () => {
    stoppingRef.current = false;
    setUri(null);
    setDurationMs(0);
  };

  return { isRecording: state.isRecording, elapsedMs: state.durationMillis, uri, durationMs, start, stop, clear };
}
