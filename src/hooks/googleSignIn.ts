import { supabase } from '../database/supabase';

export const googleSignIn = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      scopes: 'https://www.googleapis.com/auth/calendar',
    },
  });
  if (error) {
    alert('error logging to supabase');
  }
};
