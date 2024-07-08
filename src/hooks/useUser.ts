import { selectSetUser } from "@/stores/slices/user.store.ts";
import { useBoundStore } from "@/stores/useBoundStore.ts";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "@/api/userApi.tsx";
import { IUser } from "@/types/user.interface.ts";

const useUser = () => {
  const setUser = useBoundStore(selectSetUser);

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const resp = await fetchCurrentUser();
        if (resp) setUser(resp as IUser | null);
        return resp;
      } catch (error) {
        console.error("Error fetching user", error);
        throw error;
      }
    },
  })
}

export default useUser;