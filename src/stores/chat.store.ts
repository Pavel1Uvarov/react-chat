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
  saving: boolean;
  loading: boolean;
  fetchMessages: () => void,
  sendMessage: (message: string) => void;
  setLoading: (loading: boolean) => void;
  setSaving: (loading: boolean) => void;
}

export const useChatStore = createWithEqualityFn<IChatStore>()(devtools(immer(persist((set, get) => ({
  messages: [],
  saving: false,
  loading: false,
  fetchMessages: async () => {
    get().setLoading(true)
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
    get().setLoading(false)
  },
  setSaving: (saving: boolean) => {
    set((state) => {
      state.saving = saving
    })
  },
  setLoading: (loading: boolean) => {
    set((state) => {
      state.loading = loading
    })
  },
  sendMessage: async (message) => {
    get().setSaving(true)
    try {
      if (useUserStore.getState().user?.id !== null) {
        await supabase.from('messages').insert([{
          text: message,
          user_id: useUserStore.getState().user?.id,
          user_email: useUserStore.getState().user?.email,
          username: useUserStore.getState().user?.username || 'Anonymous'
        }]);
      }
    } catch (error) {
      if (error instanceof AuthError) {
        console.log(error);
      }
    }
    get().setSaving(false)
  }
}), {name: 'chat-store'}))), shallow)

export const selectMessages = (state: IChatStore) => state.messages
export const selectSavingLoader = (state: IChatStore) => state.saving
export const selectChatLoading = (state: IChatStore) => state.loading
export const selectFetchMessages = (state: IChatStore) => state.fetchMessages
export const selectSendMessage = (state: IChatStore) => state.sendMessage