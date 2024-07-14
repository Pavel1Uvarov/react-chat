import { StateCreator } from "zustand";
import { User } from "@supabase/supabase-js";
import { TCMutators, TMutators } from "@/stores/useBoundStore.ts";

export interface IUserSlice {
  user: User | null;
  clearUser: () => void;
  setUser: (user: User | null) => void;
}

export const createUserSlice: StateCreator<
  IUserSlice,
  TMutators,
  TCMutators
> = (set) => ({
  user: null,
  setUser: (user) => {
    set((state) => {
      state.user = user;
    });
  },
  clearUser: () => {
    set((state) => {
      state.user = null;
    });
  },
});

export const selectUser = (state: IUserSlice) => state.user;
export const selectSetUser = (state: IUserSlice) => state.setUser;
export const selectClearUser = (state: IUserSlice) => state.clearUser;
