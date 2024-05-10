import { useMutation } from '@tanstack/react-query';

import { supabase } from '../../../database/supabase';

export interface UserSupabase {
  email: string;
  fullName: string;
  id?: string;
  picture: string;
}

export const useAddUserToSupabase = () => {
  //   const queryclient = useQueryClient()

  const { mutate: addUser } = useMutation({
    mutationFn: async (user: UserSupabase) => await supabase.from('users').insert(user),
    onSuccess: async () => {},
    onError: (error) => console.error(error), //eslint-disable-line
  });
  return { addUser };
};
