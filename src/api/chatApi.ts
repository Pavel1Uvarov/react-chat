import supabase from "@/services/supabaseClient.ts";
import type { IMessage } from "@/types/message.interface.ts";
import type { User } from "@supabase/supabase-js";

export const fetchMessages = async (): Promise<IMessage[]> => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .returns<IMessage[]>();

  if (error) throw error;

  return data || [];
};

export const sendMessage = async (
  message: string,
  user: User | null
): Promise<null> => {
  const { data, error } = await supabase.from("messages").insert([
    {
      text: message,
      user_id: user?.id,
      user_email: user?.email,
      username: "Anon",
    },
  ]);

  if (error) throw error;

  return data;
};
