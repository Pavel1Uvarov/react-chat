import { selectSetUser } from "@/stores/slices/user.store.ts";
import { useBoundStore } from "@/stores/useBoundStore.ts";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "@/api/userApi.ts";
import { IUser } from "@/types/user.interface.ts";

const useUserHook = () => {
  const setUser = useBoundStore(selectSetUser);

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const resp = await fetchCurrentUser();

      if (resp) setUser(resp as IUser | null);
      
      return resp;
    },
  })
}

export default useUserHook;