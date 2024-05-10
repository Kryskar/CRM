import { useToast } from '@chakra-ui/react';
import { Session } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/query_keys';
import { GOOGLE_CALENDAR_API_BASE_URL } from '../../../constants/urls';
import { createGoogleCalendarClient } from '../../axios_instances/googleCalendarClient';

const deleteEvent = async (session: Session, id: string) => {
  const url = `${GOOGLE_CALENDAR_API_BASE_URL}/${id}`;

  const googleCalendarClient = createGoogleCalendarClient(session);

  const { data } = await googleCalendarClient.delete(url);

  return data;
};

type DeleteProps = {
  id: string;
  session: Session;
};

export const useDeleteEventFromGoogleCalendar = () => {
  const queryclient = useQueryClient();
  const toast = useToast();
  const { mutate } = useMutation({
    mutationFn: ({ id, session }: DeleteProps) => deleteEvent(session, id),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: [QUERY_KEYS.getEvents] });
      toast({
        title: 'Event Deleted',
        description: `success deleting event`,
      });
    },
  });
  return { mutate };
};
