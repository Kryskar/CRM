import { useQuery } from '@tanstack/react-query';

import { STATUSES } from '../../constants/constants';
import { QUERY_KEYS } from '../../constants/query_keys';
import { supabase } from '../../database/supabase';
import { NewClient } from '../mutations/Clients/useAddClientToSupabase';

export const useGetClientsFromSupabase = (clientStatusToFilter: string, agentEmail?: string) => {
  const {
    data: clients,
    error,
    isLoading,
  } = useQuery({
    queryKey: [
      agentEmail
        ? `${QUERY_KEYS.getClients}_${clientStatusToFilter}_${agentEmail}`
        : `${QUERY_KEYS.getClients}_${clientStatusToFilter}`,
    ],
    queryFn: async () => {
      let query = supabase.from('clients').select('*').order('updated_at', { ascending: false });

      if (clientStatusToFilter === STATUSES.chance) {
        if (agentEmail) {
          query = query.eq('agentEmail', agentEmail);
        }
        query = query
          .not('clientStatus', 'eq', STATUSES.callClient)
          .not('clientStatus', 'eq', STATUSES.notDoable)
          .not('clientStatus', 'eq', STATUSES.reported);
      } else if (
        [STATUSES.notDoable, STATUSES.callClient, STATUSES.reported].includes(clientStatusToFilter)
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
