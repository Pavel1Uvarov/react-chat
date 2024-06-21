import { IMessage } from "@/types/message.interface";
import Message from "../Message/Message";

const Chat = ({ messages }: { messages: IMessage[] }) => {
  return (
    <div className="flex-1 bg-white shadow md rounded-md p-3 overflow-y-auto gap-4 flex flex-col">
      {messages.map((message: IMessage) => (
        <Message message={message} key={message.id} />
      ))}
    </div>
  );
};

export default Chat;
