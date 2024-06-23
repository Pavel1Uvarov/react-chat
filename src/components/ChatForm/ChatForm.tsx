import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { FormEvent, useCallback, useState } from "react";
import { selectSavingLoader, selectSendMessage } from "@/stores/chat.store";
import { Loader2 } from "lucide-react";
import { useBoundStore } from "@/stores/useBoundStore";
import { useShallow } from "zustand/react/shallow";
import { useStoresSelectors } from "@/hooks/_storesSelectors.hook";

const ChatForm = () => {
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

  return (
    <form className="flex gap-4" onSubmit={handleSubmit}>
      <Input
        className="bg-white shadow-md"
        placeholder="Enter a message"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button className="shadow-md" disabled={!message.length}>
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <PaperPlaneIcon />
        )}
      </Button>
    </form>
  );
};

export default ChatForm;
