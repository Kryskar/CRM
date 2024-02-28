import { useCallback, useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';

import {
  PostEvent,
  usePostEventsToGoogleCalendar,
} from '../../../api/mutations/usePostEventToGoogleCalendar';
import { useGetGoogleCalendarEvents } from '../../../api/queries/useGetGoogleCalendar';
import { useGetSession } from '../../../hooks/useGetSession';

export const useAddNewEvent = () => {
  const { session } = useGetSession();
  const { data, error, isLoading } = useGetGoogleCalendarEvents(session);
  const [newEvent, setNewEvent] = useState<PostEvent | null>(null);
  const { mutate } = usePostEventsToGoogleCalendar(session, newEvent);
  const toast = useToast();

  useEffect(() => {
    if (isLoading) return;
    if (error) throw new Error('Error getting events from google calendar');
  }, [error, isLoading]);

  const handleSelectSlot = useCallback(
    ({ end, start }: { end: Date; start: Date }) => {
      const title = window.prompt('New Event name');
      if (title) {
        setNewEvent({
          start: { dateTime: start.toISOString() },
          end: { dateTime: end.toISOString() },
          summary: title,
        });
        mutate();
        toast({
          title: 'Event Posted',
          description: `success posting event "${title}"`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    },
    [mutate, toast],
  );
  return { data, handleSelectSlot };
};
