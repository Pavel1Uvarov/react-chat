import { cn, formatDate } from "@/lib/utils";
import { selectUser, useUserStore } from "@/stores/user.store";
import { IMessage } from "@/types/message.interface";

const Message = ({ message }: { message: IMessage }) => {
  const userId = useUserStore(selectUser)?.id;
  return (
    <div
      className={cn(
        "w-full flex",
        userId === message.user_id ? "justify-end" : ""
      )}
    >
      <div className="flex flex-col bg-gradient-to-r from-indigo-500 to-indigo-600 rounded p-4 w-[70%] text-white">
        <div className="break-all font-light">{message.text}</div>
        <time
          className="text-xs flex justify-end text-slate-200 mt-3 font-bold"
          dateTime="message.timestamp"
        >
          {formatDate(message.timestamp)}
        </time>
      </div>
    </div>
  );
};

export default Message;
