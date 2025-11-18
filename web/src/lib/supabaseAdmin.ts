import { createClient } from "@supabase/supabase-js";
import { serverEnv } from "@/lib/env.server";

const { supabaseUrl, supabaseServiceRoleKey } = serverEnv;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
