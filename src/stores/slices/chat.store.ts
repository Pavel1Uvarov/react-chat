import { IMessage } from "@/types/message.interface";
import { TCMutators, TMutators } from "../useBoundStore";
import { StateCreator } from "zustand";

export interface IChatSlice {
  messages: IMessage[];
  setMessages: (messages: IMessage[]) => void;
  clearMessages: () => void;
}

export const createChatStore: StateCreator<
  IChatSlice,
  TMutators,
  TCMutators
> = (set) => ({
  messages: [],
  setMessages: (messages: IMessage[]) => {
    set((state) => {
      state.messages = messages;
    });
  },
  clearMessages: () => {
    set((state) => {
      state.messages = [];
    });
  },
});

export const selectMessages = (state: IChatSlice) => state.messages;
export const selectSetMessages = (state: IChatSlice) => state.setMessages;
