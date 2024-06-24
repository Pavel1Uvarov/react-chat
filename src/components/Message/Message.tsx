import { useStoresSelectors } from "@/hooks/_storesSelectors.hook";
import { cn, formatDate } from "@/lib/utils";
import { IMessage } from "@/types/message.interface";
import { useMemo } from "react";

const Message = ({ message }: { message: IMessage }) => {
  const { user } = useStoresSelectors();
  const isCurrentUser = useMemo(() => {
    return user?.id === message.user_id;
  }, [user, message]);

  return (
    <div className={cn("w-full flex", isCurrentUser ? "justify-end" : "")}>
      <div
        className={cn(
          "flex flex-col rounded p-4 w-[70%] text-white bg-gradient-to-r",
          isCurrentUser
            ? "from-blue-800 to-indigo-900"
            : "from-slate-900 to-slate-700"
        )}
      >
        <div className="break-all text-sm font-bold mb-3">
          @{message.user_email}
        </div>
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
