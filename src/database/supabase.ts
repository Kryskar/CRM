import { createClient } from '@supabase/supabase-js';

const URL = import.meta.env.VITE_SUPABASE_URL;
if (!URL) {
  throw new Error('add env url');
}

const KEY = import.meta.env.VITE_SUPABASE_KEY;
if (!KEY) {
  throw new Error('add env key');
}

export const supabase = createClient(URL, KEY);
