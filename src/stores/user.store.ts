import supabase from "@/services/supabaseClient";
import { IUser } from "@/types/user.interface";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

interface IUserStore {
  user: IUser | null;
  fetchCurrentUser: () => void;
  clearUser: () => void;
  setUser: (user: IUser | null) => void;
}

export const useUserStore = createWithEqualityFn<IUserStore>()(devtools(immer(persist((set, get) => ({
  user: null,
  fetchCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser()

    get().setUser(user as IUser | null)
  },
  setUser: (user) => {
    set((state) => {
      state.user = user
    })
  },
  clearUser: () => {
    set((state) => {
      state.user = null
    })
  }
}), {name: 'user'}))), shallow);

export const selectUser = (state: IUserStore) => state.user;
export const selectFetchCurrentUser = (state: IUserStore) => state.fetchCurrentUser
export const selectClearUser = (state: IUserStore) => state.clearUser