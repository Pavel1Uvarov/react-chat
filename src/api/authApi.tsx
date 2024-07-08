import supabase from "@/services/supabaseClient";
import { AuthError } from "@supabase/supabase-js";

export interface IAuthInterface {
  email: string;
  password: string;
}

export const signInUser = async ({ email, password }: IAuthInterface) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error instanceof AuthError) throw error.message;

  return data;
};

export const signUpUser = async ({ email, password }: IAuthInterface) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error instanceof AuthError) throw error.message;

  return data;
};
