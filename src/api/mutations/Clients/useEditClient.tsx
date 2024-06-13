import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import {
  addOneHourToIso,
  dateToIso,
  INDEX_OF_FIRST_ITEM,
  STATUSES,
} from '../../../constants/constants';
import { useSessionContext } from '../../../contexts/SessionProvider';
import { supabase } from '../../../database/supabase';
import { useGetSession } from '../../../hooks/useGetSession';
import { useDeleteEventFromGoogleCalendar } from '../Calendar/useDeleteEventFromGoogleCalendar';
import { usePostEventToGoogleCalendar } from '../Calendar/usePostEventToGoogleCalendar';
import { usePutEventToGoogleCalendar } from '../Calendar/usePutEventToGoogleCalendar';

import {
  createEventToCalendar,
  createEventToSupabase,
  useInvalidateMultipleQueries,
} from './mutationHelpers';
import { NewClient } from './useAddClientToSupabase';

export const useEditClient = () => {
  const toast = useToast();
  const { session } = useGetSession();
  const { loggedInUserDbData } = useSessionContext();
  const { mutate: deleteGoogleCalendarEvent } = useDeleteEventFromGoogleCalendar();
  const { mutate: editGoogleCalendarEvent } = usePutEventToGoogleCalendar();
  const { mutate: postEventToGoogleCalendar } = usePostEventToGoogleCalendar();
  const invalidateQueries = useInvalidateMultipleQueries();
  const { mutate: editClient } = useMutation({
    mutationFn: async ({ editedData, id }: { editedData: NewClient; id: string }) => {
      return await supabase.from('clients').update(editedData).eq('id', id).select();
    },
    onSuccess: async (data) => {
      // if (session?.user.app_metadata.provider==="google"){
      if (data.data) {
        const client = data.data[INDEX_OF_FIRST_ITEM];
        const { chance, clientStatus, googleCalendarEventId, id, nextContactDate } = client;
       
        const eventObj = createEventToSupabase(client, 'changed status of', loggedInUserDbData);
        await supabase.from('events').insert(eventObj).select();

        if (session?.user.app_metadata.provider === 'google') {
          if (googleCalendarEventId && !chance && clientStatus === STATUSES.notDoable && session) {
            deleteGoogleCalendarEvent({ session, id: googleCalendarEventId }); //delete if client is not doable
            await supabase.from('clients').update({ googleCalendarEventId: '' }).eq('id', id);
          } else if (chance && session) {
            const startTime = dateToIso(nextContactDate);
            const endTime = addOneHourToIso(nextContactDate);
            const { eventToCalendar } = createEventToCalendar(client, startTime, endTime);
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
        } else {
          //presentation mode
          if (!chance && clientStatus === STATUSES.notDoable && session) {
            await supabase.from('presentation').delete().eq('id', id); //delete if client is not doable
            await supabase
              .from('clients')
              .update({ googleCalendarEventId: 'deleted' })
              .eq('id', id);
          } else if (chance && session) {
            const startTime = dateToIso(nextContactDate);
            const endTime = addOneHourToIso(nextContactDate);
            const { eventPresentationMode } = createEventToCalendar(client, startTime, endTime);
            if (!googleCalendarEventId) {
              await supabase.from('presentation').update(eventPresentationMode).eq('id', id);
            } else if (googleCalendarEventId) {
              /// come back from 'not doable' when googleCalendarId were deleted case
              await supabase.from('presentation').insert([eventPresentationMode]).select();
              await supabase.from('clients').update({ googleCalendarEventId: '' }).eq('id', id);
            }
          }
        }
        invalidateQueries();
        toast({
          title: 'Client Edited',
          description: `success editing client`,
        });
      }
    },
    onError: (error) => console.error(error), //eslint-disable-line
  });
  return { editClient };
};
