import { useEffect } from "react";
import { IUser } from "@/types/user.interface";
import { selectFetchMessages } from "@/stores/chat.store";
import supabase from "@/services/supabaseClient";
import { useBoundStore } from "@/stores/useBoundStore";
import { selectTogglePlaySoundNotification } from "@/stores/notifications.store";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { IMessage } from "@/types/message.interface";

export const useSubscribeToMessages = (user: IUser | null) => {
  const fetchMessages = useBoundStore(selectFetchMessages);
  const playNotificationSound = useBoundStore(
    selectTogglePlaySoundNotification
  );
  useEffect(() => {
    const handleNewMessage = async (
      val: RealtimePostgresChangesPayload<any>
    ) => {
      const newVal = val.new as IMessage;
      await fetchMessages();

      if (newVal.user_id !== user?.id) {
        await playNotificationSound();
      }
    };

    const subscribeToMessages = () => {
      return supabase
        .channel("custom-all-channel")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "messages" },
          handleNewMessage
        )
        .subscribe();
    };

    const subscription = subscribeToMessages();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);
};
