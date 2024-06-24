import supabase from "@/services/supabaseClient";
import { IUser } from "@/types/user.interface";
import { StateCreator } from "zustand";
import { TCMutators, TMutators } from "./useBoundStore";

export interface IUserSlice {
  user: IUser | null;
  fetchCurrentUser: () => void;
  clearUser: () => void;
  setUser: (user: IUser | null) => void;
}

export const createUserSlice: StateCreator<
  IUserSlice,
  TMutators,
  TCMutators
> = (set, get) => ({
  user: null,
  fetchCurrentUser: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    get().setUser(user as IUser | null);
  },
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

export const selectFetchCurrentUser = (state: IUserSlice) =>
  state.fetchCurrentUser;

export const selectClearUser = (state: IUserSlice) => state.clearUser;
