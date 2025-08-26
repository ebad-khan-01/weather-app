import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const databaseUrl = import.meta.env.DATABASE_URL;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, databaseUrl);
