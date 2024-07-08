import supabase from "@/services/supabaseClient";
import { AuthError } from "@supabase/supabase-js";

export interface IAuthFormInterface {
  email: string;
  password: string;
}

export const signInUser = async ({ email, password }: IAuthFormInterface) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error instanceof AuthError) throw error.message;

  return data;
};

export const signUpUser = async ({ email, password }: IAuthFormInterface) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error instanceof AuthError) throw error.message;

  return data;
};
