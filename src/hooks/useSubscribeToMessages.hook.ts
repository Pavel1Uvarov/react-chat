import { useCallback, useEffect } from "react";
import { IUser } from "@/types/user.interface";
import supabase from "@/services/supabaseClient";
import { useBoundStore } from "@/stores/useBoundStore";
import { selectTogglePlaySoundNotification } from "@/stores/slices/notifications.store";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { IMessage } from "@/types/message.interface";
import { useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

export const useSubscribeToMessages = (user: IUser | null) => {
  const client = useQueryClient()
  const playNotificationSound = useBoundStore(
    useShallow(selectTogglePlaySoundNotification)
  );

  const handleNewMessage = useCallback(async (
    val: RealtimePostgresChangesPayload<never>
  ) => {
    const newVal = val.new as IMessage;

    await client.invalidateQueries({ queryKey: ['messages'] })

    if (newVal.user_id !== user?.id) {
      playNotificationSound();
    }
  }, [client, playNotificationSound, user?.id]);

  const subscribeToMessages = useCallback(() => {
    return supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        handleNewMessage
      )
      .subscribe();
  }, [handleNewMessage]);


  useEffect(() => {
    const subscription = subscribeToMessages();

    return () => {
      subscription.unsubscribe();
    };
  }, [subscribeToMessages, user]);
};
