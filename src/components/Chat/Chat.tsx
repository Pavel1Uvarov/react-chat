import { IMessage } from "@/types/message.interface";
import Message from "../Message/Message";

const Chat = ({ messages }: { messages: IMessage[] }) => {
  return (
    <div className="bg-white shadow md rounded-md p-3 overflow-y-auto gap-4 flex flex-col h-[80vh] scrollbar-thin scrollbar-thumb-hover scrollbar-track scrollbar-rounded">
      {messages.map((message: IMessage) => (
        <Message message={message} key={message.id} />
      ))}
    </div>
  );
};

export default Chat;
