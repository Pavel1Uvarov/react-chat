import { IMessage } from "@/types/message.interface";
import Message from "../Message/Message";
import { useScrollToBottom } from "@/hooks/useScrollToBottom.hook.ts";
import { Button } from "../ui/button";
import { DoubleArrowDownIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import Spinner from "../Spinner/Spinner";

const Chat = ({
                messages,
                isLoading,
              }: {
  messages: IMessage[];
  isLoading: boolean;
}) => {
  const { sectionRef, showButton, scrollToBottom } = useScrollToBottom();

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <div
      className="bg-white shadow-md rounded-md p-3 overflow-y-auto gap-4 flex flex-col h-[80vh] scrollbar-thin scrollbar-thumb-hover scrollbar-track scrollbar-rounded relative"
      ref={sectionRef}
    >
      {isLoading && <Spinner className="w-10 h-10 mx-auto my-auto"/>}
      {messages.map((message: IMessage) => (
        <Message message={message} key={message.id}/>
      ))}
      {showButton && (
        <Button
          variant="secondary"
          className="sticky bottom-1 w-10 border border-gray-800 p-3 shadow-md ml-auto"
          onClick={scrollToBottom}
        >
          <DoubleArrowDownIcon/>
        </Button>
      )}
    </div>
  );
};

export default Chat;
