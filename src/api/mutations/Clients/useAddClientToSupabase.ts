import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NewClient } from '../../../components/AddClient/AddClient_Container/AddClient_Contaier';
import { INDEX_OF_FIRST_ITEM } from '../../../constants/constants';
import { QUERY_KEYS } from '../../../constants/query_keys';
import { supabase } from '../../../database/supabase';
import { useGetSession } from '../../../hooks/useGetSession';
import { usePostEventToGoogleCalendar } from '../Calendar/usePostEventToGoogleCalendar';

import { createEventToCalendar } from './mutationHelpers';

export const useAddClientToSupabase = () => {
  const { session } = useGetSession();
  const { mutate } = usePostEventToGoogleCalendar();
  const toast = useToast();
  const { decodedData } = useGetSession();
  const queryClient = useQueryClient();
  const { mutate: addClient } = useMutation({
    mutationFn: async (newClient: Pick<NewClient, 'name' | 'surname' | 'phoneNumber' | 'address' | 'requestedAmount'>) => {
      const { data } = await supabase.from('clients').insert(newClient).select();

      if (decodedData && data) {
        const { clientStatus, id, name, phoneNumber, requestedAmount, surname } =
          data[INDEX_OF_FIRST_ITEM];

        const eventObj = {
          user: JSON.stringify(decodedData.user_metadata),
          client: JSON.stringify(data[INDEX_OF_FIRST_ITEM]),
          eventName: 'added client',
          clientId: id,
        };
        const { data: eventResp } = await supabase.from('events').insert(eventObj).select();

        if (eventResp) {
          const { id: eventTabId } = eventResp[INDEX_OF_FIRST_ITEM];

          const eventToCalendar = createEventToCalendar(
            clientStatus,
            name,
            surname,
            phoneNumber,
            requestedAmount,
            id,
            eventTabId,
          );

          if (session) {
            mutate({ session, event: eventToCalendar });
          }
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
