import supabase from "@/services/supabaseClient.ts";
import { AuthError } from "@supabase/supabase-js";

export const fetchCurrentUser = async () => {
  const {
    data: {
      user
    },
    error
  } = await supabase.auth.getUser();

  if (error instanceof AuthError) throw error.message;

  return user || null;
}