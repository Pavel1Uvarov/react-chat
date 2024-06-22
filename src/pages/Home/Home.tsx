import Chat from "@/components/Chat/Chat";
import ChatForm from "@/components/ChatForm/ChatForm";
import NotificationSound from "@/components/NotificationSound/NotificationSound";
import supabase from "@/services/supabaseClient";
import {
  selectFetchMessages,
  selectMessages,
  useChatStore,
} from "@/stores/chat.store";
import { selectTogglePlaySoundNotification, useNotificationsStore } from "@/stores/notifications.store";
import { useEffect } from "react";

const Home = () => {
  const fetchMessages = useChatStore(selectFetchMessages);
  const messages = useChatStore(selectMessages);
  const playNotificationSound = useNotificationsStore(selectTogglePlaySoundNotification);

  useEffect(() => {
    const subscription = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        async () => {
          await fetchMessages();
          await playNotificationSound();
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
    <div className="flex flex-col h-full gap-4 w-[30rem]">
      <Chat messages={messages} />
      <div className="flex-1">
        <ChatForm />
      </div>
      <NotificationSound />
    </div>
  );
};

export default Home;
