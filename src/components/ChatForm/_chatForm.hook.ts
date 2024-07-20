import { type FormEvent, useState } from "react";
import useMessageHook from "@/hooks/useMessage.hook.ts";

export const useChatForm = () => {
  const [message, setMessage] = useState<string>("");
  const { isPending, mutate } = useMessageHook();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate(message);
    setMessage("");
  };

  return {
    message,
    setMessage,
    isPending,
    handleSubmit,
  };
};
