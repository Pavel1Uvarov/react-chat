import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { FormEvent, useCallback, useState } from "react";
import { selectSavingLoader, selectSendMessage, useChatStore } from "@/stores/chat.store";
import { Loader2 } from "lucide-react";

const ChatForm = () => {
  const [message, setMessage] = useState<string>("");
  const submit = useChatStore(selectSendMessage);
  const loading = useChatStore(selectSavingLoader);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      submit(message);
      setMessage("");
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
        { loading ? <Loader2 className="h-4 w-4 animate-spin" /> :  <PaperPlaneIcon />}
        
      </Button>
    </form>
  );
};

export default ChatForm;
