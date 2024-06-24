import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import { useChatForm } from "./_chatForm.hook";

const ChatForm = () => {
  const { message, handleSubmit, setMessage, loading } = useChatForm();

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
