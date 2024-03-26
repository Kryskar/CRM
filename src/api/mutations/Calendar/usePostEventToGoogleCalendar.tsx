import { useToast } from '@chakra-ui/react';
import { Session } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/query_keys';
import { supabase } from '../../../database/supabase';
import { createGoogleCalendarClient } from '../../axios_instances/googleCalendarClient';
import { Item } from '../../types/googleCalendarEventsTypes';

export interface PostEvent {
  clientId?:string;
  end: { dateTime: string };
  eventTableId?: string;
  start: { dateTime: string };
  summary: string;
}

export const postEvent = async (session: Session, event: PostEvent) => {
  try {
    const googleCalendarClient = createGoogleCalendarClient(session);

    const { data } = await googleCalendarClient.post('', event);

    return data;
  } catch (error) {
    console.error('Error posting event:', error); // eslint-disable-line
  }
};

export type PostEventProps = {
  event: PostEvent;
  session: Session;
};

export const usePostEventToGoogleCalendar = () => {
  const queryclient = useQueryClient();
  const toast = useToast();

  const updateGoogleCalendarEventInSupabase = async (data:Item, tableName:string, id:string) => {
    const googleCalendarEventId = { googleCalendarEventId: data.id };
        await supabase.from(tableName).update(googleCalendarEventId).eq('id', id);
  }

  const { mutate } = useMutation({
    mutationFn: ({ event, session }: PostEventProps) => postEvent(session, event),
    onSuccess: async (data, variables) => {
  
      const { event } = variables;
  
      if (event.eventTableId) { //condition for updating googleCalendar eventId in supabase
        updateGoogleCalendarEventInSupabase(data, "events", event.eventTableId)
      }
      if (event.clientId) { //condition for updating googleCalendar eventId in supabase
        updateGoogleCalendarEventInSupabase(data, "clients", event.clientId)
      }
      queryclient.invalidateQueries({ queryKey: [QUERY_KEYS.getEvents] });
      toast({
        title: 'Event Posted',
        description: `success posting event`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
  });
  return { mutate};
};
