import Chat from "@/components/Chat/Chat";
import ChatForm from "@/components/ChatForm/ChatForm";
import NotificationSound from "@/components/NotificationSound/NotificationSound";
import { useStoresSelectors } from "@/hooks/_storesSelectors.hook";
import supabase from "@/services/supabaseClient";
import { selectFetchMessages, selectMessages } from "@/stores/chat.store";
import { selectTogglePlaySoundNotification } from "@/stores/notifications.store";
import { useBoundStore } from "@/stores/useBoundStore";
import { IMessage } from "@/types/message.interface";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

const Home = () => {
  const fetchMessages = useBoundStore(selectFetchMessages);
  const { userId } = useStoresSelectors();
  const messages = useBoundStore(useShallow(selectMessages));
  const playNotificationSound = useBoundStore(
    selectTogglePlaySoundNotification
  );

  useEffect(() => {
    const subscription = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        async (val) => {
          const newVal = val.new as IMessage;
          await fetchMessages();

          if (newVal.user_id !== userId) {
            await playNotificationSound();
          }
        }
      )
      .subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="flex flex-col h-full gap-4 w-[30rem] px-4">
      <Chat messages={messages} />
      <div className="flex-1">
        <ChatForm />
      </div>
      <NotificationSound />
    </div>
  );
};

export default Home;
