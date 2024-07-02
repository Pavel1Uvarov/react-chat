import supabase from "@/services/supabaseClient";
import { IMessage } from "@/types/message.interface";
import { AuthError } from "@supabase/supabase-js";
import { TCMutators, TMutators } from "../useBoundStore";
import { StateCreator } from "zustand";
import { sortMessages } from "@/services/messageService";
import { IUser } from "@/types/user.interface";

export interface IChatSlice {
  messages: IMessage[];
  saving: boolean;
  loading: boolean;
  fetchMessages: (preloading?: boolean) => void;
  sendMessage: (message: string, user: IUser) => void;
  setLoading: (loading: boolean) => void;
  setSaving: (loading: boolean) => void;
  clearMessages: () => void;
}

export const createChatStore: StateCreator<
  IChatSlice,
  TMutators,
  TCMutators
> = (set, get) => ({
  messages: [],
  saving: false,
  loading: false,
  fetchMessages: async (preloading = true) => {
    if (preloading) get().setLoading(true);

    try {
      let { data } = await supabase.from("messages").select("*");

      if (data) data = sortMessages(data as IMessage[]);

      set((state) => {
        state.messages = data ? (data as IMessage[]) : [];
      });
    } catch (error) {
      if (error instanceof AuthError) console.log(error);
    }
    get().setLoading(false);
  },
  setSaving: (saving: boolean) => {
    set((state) => {
      state.saving = saving;
    });
  },
  setLoading: (loading: boolean) => {
    set((state) => {
      state.loading = loading;
    });
  },
  sendMessage: async (message, user) => {
    get().setSaving(true);

    try {
      if (user?.id !== null) {
        await supabase.from("messages").insert([
          {
            text: message,
            user_id: user?.id,
            user_email: user?.email,
            username: user?.username || "Anonymous",
          },
        ]);
      }
    } catch (error) {
      if (error instanceof AuthError) console.log(error);
    }
    get().setSaving(false);
  },
  clearMessages: () => {
    set((state) => {
      state.messages = [];
    });
  },
});

export const selectMessages = (state: IChatSlice) => state.messages;
export const selectSavingLoader = (state: IChatSlice) => state.saving;
export const selectChatLoading = (state: IChatSlice) => state.loading;
export const selectFetchMessages = (state: IChatSlice) => state.fetchMessages;
export const selectSendMessage = (state: IChatSlice) => state.sendMessage;
export const selectChatLoadingMessages = (state: IChatSlice) => state.loading;
