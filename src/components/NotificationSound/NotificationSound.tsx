import notificationSound from "@/assets/notification/notificationSound.mp3";
import { useSoundNotification } from "@/components/NotificationSound/_notificationSound.hook";
import notificationCaptions from "./captions.vtt";

const NotificationSound = () => {
  const { audioRef } = useSoundNotification();

  return (
    <audio ref={audioRef} src={notificationSound} preload="auto">
      <track
        kind="captions"
        src={notificationCaptions}
        srcLang="en"
        label="English captions"
        default
      />
    </audio>
  );
};

export default NotificationSound;
