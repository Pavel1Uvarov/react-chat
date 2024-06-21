import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useCallback, useState } from "react";
import { selectSendMessage, useChatStore } from "@/stores/chat.store";

const ChatForm = () => {
  const [message, setMessage] = useState<string>("");
  const submit = useChatStore(selectSendMessage);

  const handleSubmit = useCallback(
    (message: string) => {
      submit(message);
      setMessage("");
    },
    [message]
  );

  return (
    <div className="flex gap-4">
      <Input
        className="bg-white shadow-md"
        placeholder="Enter a message"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        className="shadow-md"
        disabled={!message.length}
        onClick={() => handleSubmit(message)}
      >
        <PaperPlaneIcon />
      </Button>
    </div>
  );
};

export default ChatForm;
