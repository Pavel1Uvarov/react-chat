import { useQuery } from "@tanstack/react-query";
import { fetchMessages } from "@/api/chatApi.ts";
import { useBoundStore } from "@/stores/useBoundStore.ts";
import { useShallow } from "zustand/react/shallow";
import { selectSetMessages } from "@/stores/slices/chat.store.ts";

const useMessagesHook = () => {
  const setMessages = useBoundStore(useShallow(selectSetMessages))

  return useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const messages = await fetchMessages()
      setMessages(messages);
      return messages;
    },
  });
};

export default useMessagesHook;