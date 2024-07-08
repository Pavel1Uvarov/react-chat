import Chat from "@/components/Chat/Chat";
import ChatForm from "@/components/ChatForm/ChatForm";
import NotificationSound from "@/components/NotificationSound/NotificationSound";
import { useStoresSelectors } from "@/hooks/useStoresSelectors.hook.ts";
import { useSubscribeToMessages } from "@/hooks/useSubscribeToMessages.hook.ts";
import { selectChatLoadingMessages, selectMessages, } from "@/stores/slices/chat.store";
import { useBoundStore } from "@/stores/useBoundStore";
import { useShallow } from "zustand/react/shallow";

const Home = () => {
  const { user } = useStoresSelectors();
  const messages = useBoundStore(useShallow(selectMessages));
  const isLoading = useBoundStore(useShallow(selectChatLoadingMessages));

  useSubscribeToMessages(user);

  return (
    <div className="flex flex-col h-full gap-4 w-[30rem] px-4">
      <Chat messages={messages} isLoading={isLoading}/>
      <div className="flex-1">
        <ChatForm/>
      </div>
      <NotificationSound/>
    </div>
  );
};

export default Home;
