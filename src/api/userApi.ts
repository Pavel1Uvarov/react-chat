import supabase from "@/services/supabaseClient.ts";
import { AuthError, User } from "@supabase/supabase-js";

export const fetchCurrentUser = async (): Promise<User | null> => {
  const {
    data: {
      user
    },
    error
  } = await supabase.auth.getUser();

  if (error instanceof AuthError) throw error;

  return user || null;
}