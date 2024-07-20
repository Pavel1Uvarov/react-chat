import { useCallback, useEffect } from "react";
import supabase from "@/services/supabaseClient";
import { useBoundStore } from "@/stores/useBoundStore";
import { selectTogglePlaySoundNotification } from "@/stores/slices/notifications.store";
import type { RealtimePostgresChangesPayload, User } from "@supabase/supabase-js";
import type { IMessage } from "@/types/message.interface";
import { useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import { QUERY_KEYS } from "@/constants/api.ts";

export const useSubscribeToMessages = (user: User | null) => {
  const client = useQueryClient()
  const playNotificationSound = useBoundStore(
    useShallow(selectTogglePlaySoundNotification)
  );

  const handleNewMessage = useCallback(async (
    val: RealtimePostgresChangesPayload<never>
  ) => {
    const newVal = val.new as IMessage;

    await client.invalidateQueries({ queryKey: [QUERY_KEYS.MESSAGES] })

    if (newVal.user_id !== user?.id) playNotificationSound();
  }, [client, playNotificationSound, user]);

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


  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const subscription = subscribeToMessages();

    return () => {
      subscription.unsubscribe();
    };
  }, [subscribeToMessages, user]);
};
