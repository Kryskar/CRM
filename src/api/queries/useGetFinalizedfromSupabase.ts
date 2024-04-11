import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../constants/query_keys';
import { supabase } from '../../database/supabase';

export interface FinalizedRecord {
  agentEmail: string;
  bank: string;
  clientName: string;
  clientPhoneNumber: string;
  clientSurname: string;
  commission: number;
  created_at: string;
  id: string;
  intrest: number;
  loanAmount: number;
  loanPeriod: number;
}

export const useGetFinalizedFromSupabase = (
  agentEmail?: string,
  fromDate?: string,
  toDate?: string,
) => {
  const { data, error, isLoading } = useQuery({
    queryKey: [
      agentEmail || fromDate || toDate
        ? `${QUERY_KEYS.getFinalized}_${agentEmail}_${fromDate}_${toDate}`
        : QUERY_KEYS.getFinalized,
    ],
    queryFn: async () => {
      let query = supabase.from('finalized').select('*').order('created_at', { ascending: false });

      if (agentEmail !== undefined && agentEmail !== null && agentEmail !== '') {
        query = query.eq('agentEmail', agentEmail);
      }

      if (fromDate && toDate) {
        query = query.gte('created_at', fromDate).lte('created_at', toDate);
      }

      const { data, error } = await query;

      if (error) {
        console.error(error); //eslint-disable-line
      }
      if (data) {
        return data as FinalizedRecord[];
      }
    },
  });

  if (data) {
    return { data, error, isLoading };
  } else return { data: [], error, isLoading };
};
