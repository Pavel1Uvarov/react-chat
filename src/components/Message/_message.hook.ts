import { useMemo } from "react";
import type { IMessageProps } from "@/components/Message/Message";
import { useStoresSelectors } from "@/hooks/useStoresSelectors.hook.ts";

export const useMessage = ({ message }: IMessageProps) => {
  const { user } = useStoresSelectors();

  const isCurrentUser = useMemo(() => user?.id === message.user_id, [user, message]);

  return {
    isCurrentUser,
  };
};