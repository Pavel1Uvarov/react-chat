import { IMessage } from "@/types/message.interface";
import Message from "../Message/Message";
import { useScrollToBottom } from "@/hooks/_scrollToBottom.hook";
import { Button } from "../ui/button";
import { DoubleArrowDownIcon } from "@radix-ui/react-icons";

const Chat = ({ messages }: { messages: IMessage[] }) => {
  const { sectionRef, showButton, scrollToBottom } = useScrollToBottom();

  return (
    <div
      className="bg-white shadow-md rounded-md p-3 overflow-y-auto gap-4 flex flex-col h-[80vh] scrollbar-thin scrollbar-thumb-hover scrollbar-track scrollbar-rounded relative"
      ref={sectionRef}
    >
      {messages.map((message: IMessage) => (
        <Message message={message} key={message.id} />
      ))}
      {showButton && (
        <Button
          variant="secondary"
          className="sticky bottom-1 w-10 border border-gray-800 p-3 shadow-md ml-auto"
          onClick={scrollToBottom}
        >
          <DoubleArrowDownIcon />
        </Button>
      )}
    </div>
  );
};

export default Chat;
