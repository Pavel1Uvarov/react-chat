import type { StateCreator } from "zustand";
import type { IUserSlice } from "@/stores/slices/user.store";
import type { IChatSlice } from "@/stores/slices/chat.store";
import type { TCMutators, TMutators } from "@/stores/useBoundStore.ts";

export interface IAuthSlice {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
}

export const createAuthSlice: StateCreator<
  IAuthSlice & IUserSlice & IChatSlice,
  TMutators,
  TCMutators,
  IAuthSlice
> = (set) => ({
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
});

export const selectToken = (state: IAuthSlice) => state.token;
export const selectSetToken = (state: IAuthSlice) => state.setToken;
