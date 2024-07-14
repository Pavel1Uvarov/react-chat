import { useQuery } from "@tanstack/react-query";
import { fetchMessages } from "@/api/chatApi.ts";
import { useBoundStore } from "@/stores/useBoundStore.ts";
import { useShallow } from "zustand/react/shallow";
import { selectSetMessages } from "@/stores/slices/chat.store.ts";
import { QUERY_KEYS } from "@/constants/api.ts";
import { sortMessages } from "@/services/messageService.ts";

const useMessagesHook = () => {
  const setMessages = useBoundStore(useShallow(selectSetMessages))

  return useQuery({
    queryKey: [QUERY_KEYS.MESSAGES],
    queryFn: async () => {
      const messages = await fetchMessages()
      const sortedMessages = sortMessages(messages);

      setMessages(sortedMessages);

      return sortedMessages;
    },
  });
};

export default useMessagesHook;