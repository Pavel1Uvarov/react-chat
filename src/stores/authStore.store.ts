import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import supabase from "@/services/supabaseClient";
import { AuthError, User } from "@supabase/supabase-js";
import { Session } from "inspector";
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

interface IAuthStore {
  loading: boolean;
  token: string | null;
  error: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  signUp: ({ email, password }: { email: string, password: string }) => void;
  signIn: ({ email, password }: { email: string, password: string }) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

interface ISignUpResponse {
  data: {
    user: User
    session: Session,
  };
  error: any;
}

export const useAuthStore = createWithEqualityFn<IAuthStore>()(devtools(immer(persist((set, get) => ({
  loading: false,
  token: null,
  error: null,
  setToken: (token) => {
    set((state) => {
      state.token = token
    })
  },
  clearToken: () => {
    set((state) => {
      state.token = null
    })
  },
  setLoading: (loading) => {
    set((state) => {
      state.loading = loading
    })
  },
  setError: (error) => {
    set((state) => {
      state.error = error
    })
  },
  signUp: async ({ email, password }) => {
    get().setLoading(true)
    get().setError(null)

    if (typeof supabase !== 'undefined') {
      try {
        const { data } = await supabase.auth.signUp({
          email,
          password
        })

        if (data && data.session) {
          get().setToken(data.session.access_token)
        }
      } catch(error) {
        if (error instanceof AuthError) get().setError(error.message)
      }
      get().setLoading(false)
    }
  },
  signIn: async ({ email, password }) => {
    get().setLoading(true)
    get().setError(null)

    if (typeof supabase !== 'undefined') {
      try {
        const { data } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        if (data && data.session) {
          get().setToken(data.session.access_token)
        }
      } catch(error) {
        if (error instanceof AuthError) get().setError(error.message)
      }
      get().setLoading(false)
    }
  }
}),  { name: 'auth' }))), shallow)

export const selectToken = (state: IAuthStore) => state.token
export const selectSignUp = (state: IAuthStore) => state.signUp
export const selectSignIn = (state: IAuthStore) => state.signIn
export const selectError = (state: IAuthStore) => state.error
export const selectLoading = (state: IAuthStore) => state.loading