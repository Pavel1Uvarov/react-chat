import supabase from "@/services/supabaseClient";
import { TCMutators, TMutators } from "../useBoundStore";
import { StateCreator } from "zustand";
import { IUserSlice } from "./user.store";
import { IChatSlice } from "./chat.store";

export interface IAuthSlice {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
  logout: () => void;
}

export const createAuthSlice: StateCreator<
  IAuthSlice & IUserSlice & IChatSlice,
  TMutators,
  TCMutators,
  IAuthSlice
> = (set, get) => ({
  token: null,
  setToken: (token) => {
    set((state) => {
      state.token = token;
    });
  },
  clearToken: () => {
    set((state) => {
      state.token = null;
    });
  },
  logout: async () => {
    try {
      await supabase.auth.signOut();
      await get().clearUser();
      await get().clearMessages();

      get().setToken(null);
    } catch (error) {
      // @TODO: add push notification
      console.log(error)
    }
  },
});

export const selectToken = (state: IAuthSlice) => state.token;
export const selectSetToken = (state: IAuthSlice) => state.setToken;
export const selectLogout = (state: IAuthSlice) => state.logout;
