import { useMutation } from "@tanstack/react-query";
import { useStoresSelectors } from "@/hooks/useStoresSelectors.hook.ts";
import { sendMessage } from "@/api/chatApi.ts";

const useMessageHook = () => {
  const { user } = useStoresSelectors()
  return useMutation({
    mutationFn: async (message: string) => {
      try {
        return await sendMessage(message, user)
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  })
}

export default useMessageHook;