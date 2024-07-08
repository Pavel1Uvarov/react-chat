import { FormEvent, useCallback, useState } from "react";
import useMessageHook from "@/hooks/useMessage.hook.ts";

export const useChatForm = () => {
  const [message, setMessage] = useState<string>("");
  const { isPending, mutate } = useMessageHook()

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      mutate(message)
      setMessage("");
    },
    [message, mutate]
  );

  return {
    message,
    setMessage,
    isPending,
    handleSubmit,
  };
};
