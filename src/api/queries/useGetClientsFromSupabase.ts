import { useQuery } from '@tanstack/react-query';

import { STATUSES } from '../../constants/constants';
import { QUERY_KEYS } from '../../constants/query_keys';
import { supabase } from '../../database/supabase';
import { NewClient } from '../mutations/Clients/useAddClientToSupabase';

export const useGetClientsFromSupabase = (clientStatusToFilter:string) => {
  const {
    data: clients,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`${QUERY_KEYS.getClients}_${clientStatusToFilter}`],
    queryFn: async () => {
      let query = supabase.from('clients').select('*').order('updated_at', { ascending: false });

      if (clientStatusToFilter === STATUSES.chance) {
        query = query
          .not('clientStatus', 'eq', STATUSES.callClient)
          .not('clientStatus', 'eq', STATUSES.notDoable);
      } else if (
        clientStatusToFilter === STATUSES.notDoable ||
        clientStatusToFilter === STATUSES.callClient
      ) {
        query = query.eq('clientStatus', clientStatusToFilter);
      }

      return await query;
    },
  });

  if (clients && clients.data) {
    const data: NewClient[] = clients.data;
    return { data, isLoading, error };
  }
  return { data: [], isLoading, error };
};
