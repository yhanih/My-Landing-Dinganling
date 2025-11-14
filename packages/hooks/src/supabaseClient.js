import { createClient } from '@supabase/supabase-js';
import { getClientEnv } from '../../../config/env/client.js';

let supabaseSingleton;

export const getSupabaseClient = () => {
  if (!supabaseSingleton) {
    const { SUPABASE_URL, SUPABASE_ANON_KEY } = getClientEnv();
    supabaseSingleton = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }

  return supabaseSingleton;
};

export const supabaseClient = getSupabaseClient();

export default supabaseClient;
