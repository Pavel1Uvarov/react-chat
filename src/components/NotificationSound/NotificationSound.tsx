import { useEffect, useRef } from "react";
import notificationSound from "@/assets/notification/notificationSound.mp3";
import {
  selectPlaySoundNotification,
  useNotificationsStore,
} from "@/stores/notifications.store";

const NotificationSound = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const isPlaySound = useNotificationsStore(selectPlaySoundNotification);

  useEffect(() => {
    if (isPlaySound) playSound();
  }, [isPlaySound]);

  const playSound = () => {
    if (audioRef && audioRef.current) {
      audioRef.current.play();
    }
  };

  return <audio ref={audioRef} src={notificationSound} preload="auto" />;
};

export default NotificationSound;
