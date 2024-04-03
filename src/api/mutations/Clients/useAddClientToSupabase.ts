import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { INDEX_OF_FIRST_ITEM } from '../../../constants/constants';
import { QUERY_KEYS } from '../../../constants/query_keys';
import { supabase } from '../../../database/supabase';
import { useGetSession } from '../../../hooks/useGetSession';
import { usePostEventToGoogleCalendar } from '../Calendar/usePostEventToGoogleCalendar';

import { createEventToCalendar, createEventToSupabase } from './mutationHelpers';

export interface NewClient {
  addedTime: string;
  address: string;
  chance:string;
  clientStatus?: string;
  comment:string;
  googleCalendarEventId?:string;
  id: string;
  name: string;
  nextContactDate:string;
  phoneNumber: string;
  requestedAmount: string | number;
  surname: string;
  updated_at?:string
}

export const useAddClientToSupabase = () => {
  const { session } = useGetSession();
  const { mutate } = usePostEventToGoogleCalendar();
  const toast = useToast();
  const { decodedData } = useGetSession();
  const queryClient = useQueryClient();
  const { mutate: addClient } = useMutation({
    mutationFn: async (
      newClient: Pick<
        NewClient,
        'name' | 'surname' | 'phoneNumber' | 'address' | 'requestedAmount'
      >,
    ) => {
      const { data } = await supabase.from('clients').insert(newClient).select();

      if (decodedData && data) {
        const client = data[INDEX_OF_FIRST_ITEM];

        const eventObj = createEventToSupabase(client, 'added client', decodedData);
        await supabase.from('events').insert(eventObj).select();

        const eventToCalendar = createEventToCalendar(client);

        if (session) {
          mutate({ session, event: eventToCalendar });
        }
      }

      return { data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getClients] });
      toast({
        title: 'Client Added',
        description: `success adding client`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error) => console.error(error), //eslint-disable-line
  });
  return { addClient };
};
