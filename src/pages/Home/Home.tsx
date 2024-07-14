import Chat from "@/components/Chat/Chat";
import ChatForm from "@/components/ChatForm/ChatForm";
import NotificationSound from "@/components/NotificationSound/NotificationSound";
import { useStoresSelectors } from "@/hooks/useStoresSelectors.hook.ts";
import { selectMessages, } from "@/stores/slices/chat.store";
import { useBoundStore } from "@/stores/useBoundStore";
import { useShallow } from "zustand/react/shallow";
import useMessagesHook from "@/hooks/useMessages.hook.ts";
import { useSubscribeToMessages } from "@/hooks/useSubscribeToMessages.hook.ts";

const Home = () => {
  const { user } = useStoresSelectors();
  const messages = useBoundStore(useShallow(selectMessages));
  const { isLoading } = useMessagesHook()

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
