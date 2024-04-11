import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { STATUSES } from '../../../constants/constants';
import { ROUTES } from '../../../constants/routes';
import { supabase } from '../../../database/supabase';
import { useGetSession } from '../../../hooks/useGetSession';
import { createEventToSupabase, useInvalidateMultipleQueries } from '../Clients/mutationHelpers';
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

export const useReportSuccess = (data:NewClient) => {
  const {id} = data
  const {decodedData} = useGetSession()
  const toast = useToast();
  const invalidateQueries = useInvalidateMultipleQueries()
  const navigate = useNavigate()

  const { mutate: reportSuccess } = useMutation({
    mutationFn: async (obj: SuccessReportObj) =>
      await supabase.from('finalized').insert(obj).select(),
    onSuccess: async () => {
        await supabase
          .from('clients')
          .update({ clientStatus: STATUSES.reported })
          .eq('id', id)

          if (decodedData) {
            const eventObj = createEventToSupabase(data, 'reported success of', decodedData);
            await supabase.from('events').insert(eventObj).select();
          }

        toast({
          title: 'Success reported',
          description: `success reporting`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate(ROUTES.finalized)
        invalidateQueries()
    },
    onError: (error) => console.error(error), //eslint-disable-line
  });
  return { reportSuccess };
};
