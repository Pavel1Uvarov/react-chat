import { selectPlaySoundNotification } from "@/stores/slices/notifications.store";
import { useBoundStore } from "@/stores/useBoundStore";
import { useEffect, useRef } from "react";

export const useSoundNotification = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const isPlaySound = useBoundStore(selectPlaySoundNotification);

  useEffect(() => {
    if (isPlaySound) playSound();
  }, [isPlaySound]);

  const playSound = () => {
    if (audioRef?.current) audioRef.current.play();
  };

  return {
    playSound,
    audioRef,
    isPlaySound,
  };
};
