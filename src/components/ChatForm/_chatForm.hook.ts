import { FormEvent, useCallback, useState } from "react";
import useMessage from "@/hooks/useMessage.ts";

export const useChatForm = () => {
  const [message, setMessage] = useState<string>("");
  const { isPending, mutate } = useMessage()

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
