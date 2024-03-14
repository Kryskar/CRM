import { Event } from 'react-big-calendar';
import { useToast } from '@chakra-ui/react';
import { Session } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/query_keys';
import { GOOGLE_CALENDAR_API_BASE_URL } from '../../../constants/urls';
import { createGoogleCalendarClient } from '../../axios_instances/googleCalendarClient';

const deleteEvent = async (session: Session, event: Event) => {
  try {
    const url = `${GOOGLE_CALENDAR_API_BASE_URL}/${event.id}`;

    const googleCalendarClient = createGoogleCalendarClient(session);

    const { data } = await googleCalendarClient.delete(url);
    return data;
  } catch (error) {
    console.error('Error deleting event:', error); // eslint-disable-line
  }
};

type DeleteProps = {
  event: Event;
  session: Session;
};

export const useDeleteEventFromGoogleCalendar = () => {
  const queryclient = useQueryClient();
  const toast = useToast();
  const { mutate } = useMutation({
    mutationFn: ({ event, session }: DeleteProps) => deleteEvent(session, event),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: [QUERY_KEYS.getEvents] });
      toast({
        title: 'Event Deleted',
        description: `success deleting event`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
  });
  return { mutate };
};
