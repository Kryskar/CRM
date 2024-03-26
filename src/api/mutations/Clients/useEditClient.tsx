import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NewClient } from '../../../components/AddClient/AddClient_Container/AddClient_Contaier';
import {
  endOfProvidedDay,
  INDEX_OF_FIRST_ITEM,
  startOfProvidedDay,
  STATUSES,
} from '../../../constants/constants';
import { QUERY_KEYS } from '../../../constants/query_keys';
import { supabase } from '../../../database/supabase';
import { useGetSession } from '../../../hooks/useGetSession';
import { useDeleteEventFromGoogleCalendar } from '../Calendar/useDeleteEventFromGoogleCalendar';
import { usePostEventToGoogleCalendar } from '../Calendar/usePostEventToGoogleCalendar';
import { usePutEventToGoogleCalendar } from '../Calendar/usePutEventToGoogleCalendar';

import { createEventToCalendar } from './mutationHelpers';

export const useEditClient = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { session } = useGetSession();
  const { mutate: deleteGoogleCalendarEvent } = useDeleteEventFromGoogleCalendar();
  const { mutate: editGoogleCalendarEvent } = usePutEventToGoogleCalendar();
  const { mutate: postEventToGoogleCalendar } = usePostEventToGoogleCalendar();

  const { mutate: editClient } = useMutation({
    mutationFn: async ({ editedData, id }:{editedData:NewClient, id:string}) => {
      
      return await supabase.from('clients').update(editedData).eq('id', id).select();
    },
    onSuccess: async (data) => {
      if (data.data){
      const {
        chance,
        clientStatus,
        googleCalendarEventId,
        id,
        name,
        nextContactDate,
        phoneNumber,
        requestedAmount,
        surname,
      } = data.data[INDEX_OF_FIRST_ITEM];
      

      if (googleCalendarEventId && !chance && clientStatus === STATUSES.notDoable && session) {
        deleteGoogleCalendarEvent({ session, id: googleCalendarEventId }); //delete if client is not doable
        await supabase.from('clients').update({ googleCalendarEventId: '' }).eq('id', id);
      } else if (chance && session) {
        const startTime = startOfProvidedDay(nextContactDate);
        const endTime = endOfProvidedDay(nextContactDate);
        const eventToCalendar = createEventToCalendar(
          clientStatus,
          name,
          surname,
          phoneNumber,
          requestedAmount,
          id,
          '',
          startTime,
          endTime,
        );
        if (googleCalendarEventId) {
          editGoogleCalendarEvent({
            editedEvent: eventToCalendar,
            id: googleCalendarEventId,
            session,
          });
        } else if (!googleCalendarEventId) {
          /// come back from 'not doable' when googleCalendarId were deleted case
          postEventToGoogleCalendar({ session, event: eventToCalendar });
        }
      }
      const invalidationQueries: any = [ //eslint-disable-line
        { queryKey: [`${QUERY_KEYS.getClients}_${STATUSES.callClient}`] },
        { queryKey: [`${QUERY_KEYS.getClients}_${STATUSES.chance}`] },
        { queryKey: [`${QUERY_KEYS.getClients}_${STATUSES.notDoable}`] },
        { queryKey: [`${QUERY_KEYS.getClients}_all`] },
    ];
      queryClient.invalidateQueries(invalidationQueries);
      toast({
        title: 'Client Edited',
        description: `success editing client`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
    },
    onError: (error) => console.error(error), //eslint-disable-line
  });
  return { editClient };
};
