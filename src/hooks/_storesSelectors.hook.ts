import { selectUser, useUserStore } from "@/stores/user.store";

export const useStoresSelectors = () => {
  const userId = useUserStore(selectUser)?.id;

  return {
    userId
  }
}