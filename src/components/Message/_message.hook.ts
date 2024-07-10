import { useMemo } from "react";
import { IMessageProps } from "./Message";
import { useStoresSelectors } from "@/hooks/useStoresSelectors.hook.ts";

export const useMessage = ({ message }: IMessageProps) => {
  const { user } = useStoresSelectors();

  const isCurrentUser = useMemo(() => {
    return user?.id === message.user_id;
  }, [user, message]);

  return {
    isCurrentUser,
  };
};