
import { useState, useCallback, useRef, useEffect } from 'react';

// Helper functions for audio decoding
function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}


export const useAudio = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const sourceRef = useRef<AudioBufferSourceNode | null>(null);

    useEffect(() => {
        // Initialize AudioContext
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        
        // Cleanup on unmount
        return () => {
            if (sourceRef.current) {
                sourceRef.current.stop();
            }
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
               // audioContextRef.current.close(); // Don't close, reuse it
            }
        };
    }, []);

    const play = useCallback(async (base64Audio: string) => {
        if (!audioContextRef.current) return;

        if (sourceRef.current) {
            sourceRef.current.stop();
        }

        setIsPlaying(true);
        
        try {
            const decodedBytes = decode(base64Audio);
            const audioBuffer = await decodeAudioData(decodedBytes, audioContextRef.current, 24000, 1);

            if (audioContextRef.current.state === 'suspended') {
              await audioContextRef.current.resume();
            }

            const source = audioContextRef.current.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContextRef.current.destination);
            source.onended = () => {
                setIsPlaying(false);
                sourceRef.current = null;
            };
            source.start();
            sourceRef.current = source;
        } catch (error) {
            console.error("Failed to play audio:", error);
            setIsPlaying(false);
        }
    }, []);

    return { play, isPlaying };
};
