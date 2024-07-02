import { selectPlaySoundNotification } from "@/stores/slices/notifications.store";
import { useBoundStore } from "@/stores/useBoundStore";
import { useRef, useEffect } from "react";

export const useSoundNotification = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const isPlaySound = useBoundStore(selectPlaySoundNotification);

  useEffect(() => {
    if (isPlaySound) playSound();
  }, [isPlaySound]);

  const playSound = () => {
    if (audioRef && audioRef.current) {
      audioRef.current.play();
    }
  };

  return {
    playSound,
    audioRef,
    isPlaySound,
  };
};
