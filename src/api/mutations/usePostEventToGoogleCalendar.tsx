import { useToast } from '@chakra-ui/react';
import { Session } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../constants/query_keys';
import { createGoogleCalendarClient } from '../axios_instances/googleCalendarClient';

export interface PostEvent {
  end: { dateTime: string };
  start: { dateTime: string };
  summary: string;
}

const postEvent = async (session: Session, event: PostEvent) => {
  try {
    const googleCalendarClient = createGoogleCalendarClient(session);

    const { data } = await googleCalendarClient.post('', event);

    return data;
  } catch (error) {
    console.error('Error posting event:', error); // eslint-disable-line
  }
};

type AddEventProps = {
  event: PostEvent;
  session: Session;
};

export const usePostEventToGoogleCalendar = () => {
  const queryclient = useQueryClient();
  const toast = useToast();

  const { mutate } = useMutation({
    mutationFn: ({ event, session }: AddEventProps) => postEvent(session, event),
    onSuccess: () => {
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
  return { mutate };
};
