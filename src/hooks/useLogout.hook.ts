import { useMutation } from "@tanstack/react-query";
import { signOutUser } from "@/api/authApi.ts";
import { useBoundStore } from "@/stores/useBoundStore.ts";
import { selectClearUser } from "@/stores/slices/user.store.ts";
import { useShallow } from "zustand/react/shallow";
import { selectClearMessages } from "@/stores/slices/chat.store.ts";
import { selectSetToken } from "@/stores/slices/auth.store.ts";

const useLogout = () => {
  const clearUser = useBoundStore(useShallow(selectClearUser));
  const clearMessages = useBoundStore(useShallow(selectClearMessages));
  const setToken = useBoundStore(useShallow(selectSetToken));

  return useMutation({
    mutationFn: async () => await signOutUser(),
    onSuccess: () => {
      clearUser();
      clearMessages();
      setToken(null);
    }
  })
}

export default useLogout;