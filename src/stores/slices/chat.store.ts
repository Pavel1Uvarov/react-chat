import type { IMessage } from "@/types/message.interface";
import type { TCMutators, TMutators } from "@/stores/useBoundStore";
import type { StateCreator } from "zustand";

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
export const selectClearMessages = (state: IChatSlice) => state.clearMessages;
