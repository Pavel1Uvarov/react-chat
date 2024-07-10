import { IUser } from "@/types/user.interface";
import { StateCreator } from "zustand";
import { TCMutators, TMutators } from "../useBoundStore";

export interface IUserSlice {
  user: IUser | null;
  clearUser: () => void;
  setUser: (user: IUser | null) => void;
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
