import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.VITE_SUPABASE_URL ?? "";
const supabaseAnonKey: string = process.env.VITE_SUPABASE_ANON_KEY ?? "";

let supabase;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export default supabase as SupabaseClient;
