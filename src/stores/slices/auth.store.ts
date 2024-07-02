import supabase from "@/services/supabaseClient";
import { AuthError } from "@supabase/supabase-js";
import { TCMutators, TMutators } from "../useBoundStore";
import { StateCreator } from "zustand";
import { IUserSlice } from "./user.store";
import { IChatSlice } from "./chat.store";
export interface IAuthSlice {
  loading: boolean;
  token: string | null;
  error: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
  signUp: ({ email, password }: { email: string; password: string }) => void;
  signIn: ({ email, password }: { email: string; password: string }) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const createAuthSlice: StateCreator<
  IAuthSlice & IUserSlice & IChatSlice,
  TMutators,
  TCMutators,
  IAuthSlice
> = (set, get) => ({
  loading: false,
  token: null,
  error: null,
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
  setLoading: (loading) => {
    set((state) => {
      state.loading = loading;
    });
  },
  setError: (error) => {
    set((state) => {
      state.error = error;
    });
  },
  signUp: async ({ email, password }) => {
    get().setLoading(true);
    get().setError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (data && data.session) {
      get().setToken(data.session.access_token);
    }

    if (error && error instanceof AuthError) {
      get().setError(error.message);
    }

    get().setLoading(false);
  },
  signIn: async ({ email, password }) => {
    get().setLoading(true);
    get().setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (data && data.session) {
      get().setToken(data.session.access_token);

      get().fetchCurrentUser();
    }

    if (error && error instanceof AuthError) {
      get().setError(error.message);
    }

    get().setLoading(false);
  },
  logout: async () => {
    get().setError(null);

    try {
      await supabase.auth.signOut();
      await get().clearUser();
      await get().clearMessages();

      get().setToken(null);
    } catch (error) {
      // @TODO: add push notification
      if (error instanceof AuthError) get().setError(error.message);
    }
  },
});

export const selectToken = (state: IAuthSlice) => state.token;
export const selectSignUp = (state: IAuthSlice) => state.signUp;
export const selectSignIn = (state: IAuthSlice) => state.signIn;
export const selectError = (state: IAuthSlice) => state.error;
export const selectSetError = (state: IAuthSlice) => state.setError;
export const selectLoading = (state: IAuthSlice) => state.loading;
export const selectLogout = (state: IAuthSlice) => state.logout;
