import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { FormEvent, useCallback, useState } from "react";
import { selectSendMessage, useChatStore } from "@/stores/chat.store";

const ChatForm = () => {
  const [message, setMessage] = useState<string>("");
  const submit = useChatStore(selectSendMessage);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault;
      submit(message);
      setMessage("");
    },
    [message]
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
        <PaperPlaneIcon />
      </Button>
    </form>
  );
};

export default ChatForm;
