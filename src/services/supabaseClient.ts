import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase.types.ts";

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

let supabase;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
}

export default supabase as SupabaseClient;
