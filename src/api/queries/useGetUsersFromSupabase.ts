import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../constants/query_keys';
import { supabase } from '../../database/supabase';


export const useGetUsersFromSupabase = () => {
  const {
    data: users,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.getUsers],
    queryFn: async () => await supabase.from('users').select('*'),
    gcTime: 0,
  });

  if (users && users.data) {
    const data = users.data;
    return { data, isLoading, error };
  }
  return { data: [], isLoading, error, refetch };
};

export const getUserByEmail = async (email:string) => {
  const { data: user } = await supabase.from('users').select('*').eq('email', email);
  return user ;
};

export const useGetUserFromSupabaseByEmail = (email: string) => {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`${QUERY_KEYS.getUsers}_${email}`],
    queryFn: async () => await supabase.from('users').select('*').eq('email', email),
  });

  if (user && user.data) {
    const data = user.data[0];  
    return { data, isLoading, error };
  }
  return { data: [], isLoading, error };
};
