import { useMutation } from "@tanstack/react-query";
import { useStoresSelectors } from "@/hooks/useStoresSelectors.hook.ts";
import { sendMessage } from "@/api/chatApi.ts";

const useMessageHook = () => {
  const { user } = useStoresSelectors()
  return useMutation({
    mutationFn: async (message: string) => {
      return await sendMessage(message, user)
    }
  })
}

export default useMessageHook;