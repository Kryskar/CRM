import { useToast } from '@chakra-ui/react';
import { useMutation} from '@tanstack/react-query';

import {
  endOfProvidedDay,
  INDEX_OF_FIRST_ITEM,
  startOfProvidedDay,
  STATUSES,
} from '../../../constants/constants';
import { supabase } from '../../../database/supabase';
import { useGetSession } from '../../../hooks/useGetSession';
import { useDeleteEventFromGoogleCalendar } from '../Calendar/useDeleteEventFromGoogleCalendar';
import { usePostEventToGoogleCalendar } from '../Calendar/usePostEventToGoogleCalendar';
import { usePutEventToGoogleCalendar } from '../Calendar/usePutEventToGoogleCalendar';

import { createEventToCalendar, createEventToSupabase, useInvalidateMultipleQueries } from './mutationHelpers';
import { NewClient } from './useAddClientToSupabase';

export const useEditClient = () => {
  const toast = useToast();
  const { decodedData, session } = useGetSession();
  const { mutate: deleteGoogleCalendarEvent } = useDeleteEventFromGoogleCalendar();
  const { mutate: editGoogleCalendarEvent } = usePutEventToGoogleCalendar();
  const { mutate: postEventToGoogleCalendar } = usePostEventToGoogleCalendar();
  const invalidateQueries = useInvalidateMultipleQueries()
  const { mutate: editClient } = useMutation({
    mutationFn: async ({ editedData, id }: { editedData: NewClient; id: string }) => {
      return await supabase.from('clients').update(editedData).eq('id', id).select();
    },
    onSuccess: async (data) => {
      if (data.data) {
        const client = data.data[INDEX_OF_FIRST_ITEM];
        const { chance, clientStatus, googleCalendarEventId, id, nextContactDate } = client;

        if (decodedData) {
          const eventObj = createEventToSupabase(client, 'changed status of', decodedData);
          await supabase.from('events').insert(eventObj).select();
        }

        if (googleCalendarEventId && !chance && clientStatus === STATUSES.notDoable && session) {
          deleteGoogleCalendarEvent({ session, id: googleCalendarEventId }); //delete if client is not doable
          await supabase.from('clients').update({ googleCalendarEventId: '' }).eq('id', id);
        } else if (chance && session) {
          const startTime = startOfProvidedDay(nextContactDate);
          const endTime = endOfProvidedDay(nextContactDate);
          const eventToCalendar = createEventToCalendar(client, startTime, endTime);
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
       invalidateQueries()
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
