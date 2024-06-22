import supabase from "@/services/supabaseClient";
import { IMessage } from "@/types/message.interface";
import { AuthError } from "@supabase/supabase-js";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { useUserStore } from "./user.store";

interface IChatStore {
  messages: IMessage[];
  loading: boolean;
  fetchMessages: () => void,
  sendMessage: (message: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useChatStore = createWithEqualityFn<IChatStore>()(devtools(immer(persist((set, get) => ({
  messages: [],
  loading: false,
  fetchMessages: async () => {
    try {
      const { data } = await supabase.from('messages').select('*');
      
      set((state) => {
        state.messages = data as IMessage[];
      });
    } catch (error) {
      if (error instanceof AuthError) {
        console.log(error);
        
      }
    }
  },
  setLoading: (loading: boolean) => {
    set((state) => {
      state.loading = loading
    })
  },
  sendMessage: async (message) => {
    get().setLoading(true)
    try {
      if (useUserStore.getState().user?.id !== null) {
        await supabase.from('messages').insert([{
          text: message,
          user_id: useUserStore.getState().user?.id,
          username: useUserStore.getState().user?.username || 'Anonymous'
        }]);
      }
    } catch (error) {
      if (error instanceof AuthError) {
        console.log(error);
      }
    }
    get().setLoading(false)
  }
}), {name: 'chat-store'}))), shallow)

export const selectMessages = (state: IChatStore) => state.messages
export const selectLoading = (state: IChatStore) => state.loading
export const selectFetchMessages = (state: IChatStore) => state.fetchMessages
export const selectSendMessage = (state: IChatStore) => state.sendMessage