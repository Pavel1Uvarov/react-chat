import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useChatForm } from "./_chatForm.hook";
import Spinner from "../Spinner/Spinner";

const ChatForm = () => {
  const { message, handleSubmit, setMessage, isPending } = useChatForm();

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
        {isPending ? <Spinner className="h-4 w-4"/> : <PaperPlaneIcon/>}
      </Button>
    </form>
  );
};

export default ChatForm;
