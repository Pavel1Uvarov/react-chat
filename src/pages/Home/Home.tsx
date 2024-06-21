import Chat from "@/components/Chat/Chat";
import ChatForm from "@/components/ChatForm/ChatForm";
import supabase from "@/services/supabaseClient";
import {
  selectFetchMessages,
  selectMessages,
  useChatStore,
} from "@/stores/chat.store";
import { useEffect } from "react";

const Home = () => {
  const fetchMessages = useChatStore(selectFetchMessages);
  const messages = useChatStore(selectMessages);

  useEffect(() => {
    const subscription = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        () => {
          fetchMessages();
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
      <ChatForm />
    </div>
  );
};

export default Home;
