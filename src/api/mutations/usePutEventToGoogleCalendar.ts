import { Event } from 'react-big-calendar';
import { useToast } from '@chakra-ui/react';
import { Session } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../constants/query_keys';
import { GOOGLE_CALENDAR_API_BASE_URL } from '../../constants/urls';
import { createGoogleCalendarClient } from '../axios_instances/googleCalendarClient';

export interface PostEvent {
  end: { dateTime: string };
  start: { dateTime: string };
  summary: string;
}

const putEvent = async (session: Session, event: Event, editedEvent:PostEvent) => {
  const url = `${GOOGLE_CALENDAR_API_BASE_URL}/${event?.id}`;
  const googleCalendarClient = createGoogleCalendarClient(session)
  try{
    const {data} = await googleCalendarClient.put(url, editedEvent)
    return data;
  }catch (error){
    console.error('Error posting event:', error); // eslint-disable-line
    throw error;
  }
  
};

type PutEventProps = {
  editedEvent:PostEvent, event: Event; session: Session;
}

export const usePutEventToGoogleCalendar = () => {
  const queryclient = useQueryClient();
  const toast = useToast();
  const { mutate } = useMutation({
    mutationFn: ({editedEvent, event, session}:PutEventProps) => putEvent(session, event, editedEvent),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: [QUERY_KEYS.getEvents] });
      toast({
        title: 'Event Edited',
        description: `success editing event`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
  });
  return { mutate };
};
