import { useBoundStore } from "@/stores/useBoundStore";
import { selectUser } from "@/stores/user.store";
import { useShallow } from "zustand/react/shallow";

export const useStoresSelectors = () => {
  const user = useBoundStore(useShallow(selectUser))

  return {
    user,
  };
};
