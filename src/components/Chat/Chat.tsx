import type { IMessage } from "@/types/message.interface";
import { useScrollToBottom } from "@/hooks/useScrollToBottom.hook.ts";
import { DoubleArrowDownIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";
import Message from "@/components/Message/Message.tsx";
import Spinner from "@/components/Spinner/Spinner.tsx";
import { Button } from "@/components/ui/button.tsx";

interface IChatProps {
  messages: IMessage[];
  isLoading: boolean;
}

const Chat = ({ messages, isLoading }: IChatProps) => {
  const { sectionRef, showButton, scrollToBottom } = useScrollToBottom();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(scrollToBottom, [sectionRef]);

  return (
    <div
      className="bg-white shadow-md rounded-md p-3 overflow-y-auto gap-4 flex flex-col h-[80vh] scrollbar-thin scrollbar-thumb-hover scrollbar-track scrollbar-rounded relative"
      data-testid="chat-section"
      ref={sectionRef}
    >
      {isLoading ? (
        <Spinner
          data-testid="loading-spinner"
          className="w-10 h-10 mx-auto my-auto"
        />
      ) : (
        messages.map((message: IMessage) => (
          <Message message={message} key={message.id} />
        ))
      )}

      {showButton && (
        <Button
          variant="secondary"
          className="sticky bottom-1 w-10 border border-gray-800 p-3 shadow-md ml-auto"
          data-testid="scroll-to-bottom-button"
          disabled={isLoading}
          onClick={scrollToBottom}
        >
          <DoubleArrowDownIcon />
        </Button>
      )}
    </div>
  );
};

export default Chat;
