import supabase from "@/services/supabaseClient.ts";
import { IUser } from "@/types/user.interface.ts";

export const fetchMessages = async () => {
  const { data, error } = await supabase.from("messages").select("*");

  if (error) throw error.message;

  return data || [];
}

export const sendMessage = async (message: string, user: IUser | null) => {
  const { data, error } = await supabase.from("messages").insert([
    {
      text: message,
      user_id: user?.id,
      user_email: user?.email,
      username: user?.username || "Anonymous",
    },
  ]);

  if (error) throw error.message;

  return data || {};
}