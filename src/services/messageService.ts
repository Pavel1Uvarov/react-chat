import { IMessage } from "@/types/message.interface";

export const sortMessages = (messages: IMessage[]): IMessage[] =>
  messages.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
