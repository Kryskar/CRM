import { supabase } from '../database/supabase';

export const emailSignIn = async (email:string, password:string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  
  if (error) {
    alert('Error logging in to Supabase');
    console.error(error);  //eslint-disable-line
    return;
  }
};