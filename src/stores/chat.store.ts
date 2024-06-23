import supabase from "@/services/supabaseClient";
import { IMessage } from "@/types/message.interface";
import { AuthError } from "@supabase/supabase-js";
import { TCMutators, TMutators, useBoundStore } from "./useBoundStore";
import { StateCreator } from "zustand";
import { selectUser } from "./user.store";

export interface IChatSlice {
  messages: IMessage[];
  saving: boolean;
  loading: boolean;
  fetchMessages: () => void;
  sendMessage: (message: string) => void;
  setLoading: (loading: boolean) => void;
  setSaving: (loading: boolean) => void;
  sortMessages: (messages: IMessage[]) => IMessage[];
}

export const createChatStore: StateCreator<
  IChatSlice,
  TMutators,
  TCMutators
> = (set, get) => ({
  messages: [],
  saving: false,
  loading: false,
  fetchMessages: async () => {
    get().setLoading(true);
    try {
      let { data } = await supabase.from("messages").select("*");

      if (data) data = get().sortMessages(data as IMessage[]);

      set((state) => {
        state.messages = data ? (data as IMessage[]) : [];
      });
    } catch (error) {
      if (error instanceof AuthError) console.log(error);
    }
    get().setLoading(false);
  },
  sortMessages: (messages) =>
    messages.sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    ),
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
  sendMessage: async (message) => {
    get().setSaving(true);
    const user = useBoundStore(selectUser);
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
});

export const selectMessages = (state: IChatSlice) => state.messages;
export const selectSavingLoader = (state: IChatSlice) => state.saving;
export const selectChatLoading = (state: IChatSlice) => state.loading;
export const selectFetchMessages = (state: IChatSlice) => state.fetchMessages;
export const selectSendMessage = (state: IChatSlice) => state.sendMessage;
