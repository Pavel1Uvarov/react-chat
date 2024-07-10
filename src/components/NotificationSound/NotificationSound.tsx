import notificationSound from "@/assets/notification/notificationSound.mp3";
import { useSoundNotification } from "./_notificationSound.hook";

const NotificationSound = () => {
  const { audioRef } = useSoundNotification();

  return <audio ref={audioRef} src={notificationSound} preload="auto"/>;
};

export default NotificationSound;
