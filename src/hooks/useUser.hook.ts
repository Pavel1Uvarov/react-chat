import { selectSetUser } from "@/stores/slices/user.store.ts";
import { useBoundStore } from "@/stores/useBoundStore.ts";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "@/api/userApi.ts";
import { QUERY_KEYS } from "@/constants/api.ts";

const useUserHook = () => {
  const setUser = useBoundStore(selectSetUser);

  return useQuery({
    queryKey: [QUERY_KEYS.CURRENT_USER],
    queryFn: async () => {
      const resp = await fetchCurrentUser();

      if (resp) setUser(resp);

      return resp;
    },
  })
}

export default useUserHook;