import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/query_keys';
import { supabase } from '../../../database/supabase';

interface UpdateUserData {
  fullName: string;
  picture: string;
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUser } = useMutation({
    mutationFn: async ({ email, values }: { email: string; values: UpdateUserData }) =>
      await supabase.from('users').update(values).eq('email', email),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getUsers] });
    },
    onError: (error) => console.error(error), //eslint-disable-line
  });
  return { updateUser };
};
