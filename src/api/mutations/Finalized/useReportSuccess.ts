import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { STATUSES } from '../../../constants/constants';
import { QUERY_KEYS } from '../../../constants/query_keys';
import { ROUTES } from '../../../constants/routes';
import { useSessionContext } from '../../../contexts/SessionProvider';
import { supabase } from '../../../database/supabase';
import { createEventToSupabase } from '../Clients/mutationHelpers';
import { NewClient } from '../Clients/useAddClientToSupabase';

export interface SuccessReportObj {
  agentEmail: string;
  bank: string;
  clientName: string;
  clientPhoneNumber: string;
  clientSurname: string;
  commission: string | number;
  intrest: string | number;
  loanAmount: string | number;
  loanPeriod: string | number;
}

export const useReportSuccess = (data: NewClient) => {
  const { id } = data;
  const { loggedInUserDbData } = useSessionContext();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const invalidateQueries = () => {
    const invalidationQueries: any = [ //eslint-disable-line
       

      { queryKey: [`${QUERY_KEYS.getClients}_${STATUSES.chance}`] },
      { queryKey: [`${QUERY_KEYS.getClients}_all`] },
    ];
    queryClient.invalidateQueries(invalidationQueries);
  };

  const { mutate: reportSuccess } = useMutation({
    mutationFn: async (obj: SuccessReportObj) =>
      await supabase.from('finalized').insert(obj).select(),
    onSuccess: async () => {
      await supabase.from('clients').update({ clientStatus: STATUSES.reported }).eq('id', id);
      const eventObj = createEventToSupabase(data, 'reported success of', loggedInUserDbData);
      await supabase.from('events').insert(eventObj).select();
      toast({
        title: 'Success reported',
        description: `success reporting`,
      });
      navigate(ROUTES.finalized);
      invalidateQueries();
    },
    onError: (error) => console.error(error), //eslint-disable-line
  });
  return { reportSuccess };
};
