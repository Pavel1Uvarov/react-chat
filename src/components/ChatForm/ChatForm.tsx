import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

const ChatForm = () => {
  return (
    <div className="flex gap-4">
      <Input className="bg-white shadow-md" placeholder="Enter a message" />
      <Button className="shadow-md">
        <PaperPlaneIcon />
      </Button>
    </div>
  );
};

export default ChatForm;
