import { useAddUserToSupabase } from '../api/mutations/Users/useAddUserToSupabase';
import { supabase } from '../database/supabase';

import { useGetSession } from './useGetSession';

export const useCheckDbForUser = () => {
  const { decodedData, session } = useGetSession();
  const { addUser } = useAddUserToSupabase();

  const syncDbData = async () => {
    const { data: users } = await supabase.from('users').select('*');
    if (decodedData && users && session?.user.app_metadata.provider==="google") {
      const {
        user_metadata: { avatar_url, email, full_name },
      } = decodedData;
      const checkDbDataForUserEmail = users.some((user) => user.email === email);
      if (!checkDbDataForUserEmail) {
        const user = { fullName: full_name, email: email, picture: avatar_url };
        addUser(user);
      }
    }
  };

  return { syncDbData };
};
