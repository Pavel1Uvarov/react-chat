import { useStoresSelectors } from "@/hooks/_storesSelectors.hook";
import { selectSendMessage, selectSavingLoader } from "@/stores/chat.store";
import { useBoundStore } from "@/stores/useBoundStore";
import { useState, useCallback, FormEvent } from "react";
import { useShallow } from "zustand/react/shallow";

export const useChatForm = () => {
  const [message, setMessage] = useState<string>("");
  const submit = useBoundStore(useShallow(selectSendMessage));
  const loading = useBoundStore(useShallow(selectSavingLoader));
  const { user } = useStoresSelectors();

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (user !== null) {
        submit(message, user);
        setMessage("");
      }
    },
    [message, submit]
  );

  return {
    message,
    setMessage,
    submit,
    loading,
    handleSubmit
  }
}