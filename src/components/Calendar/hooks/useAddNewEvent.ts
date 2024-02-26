import { useCallback, useEffect, useState } from 'react';

import {
  PostEvent,
  usePostEventsToGoogleCalendar,
} from '../../../api/mutations/usePutEventToGoogleCalendar';
import { useGetGoogleCalendarEvents } from '../../../api/queries/useGetGoogleCalendar';
import { useGetSession } from '../../../hooks/useGetSession';

export const useAddNewEvent = () => {
  const { session } = useGetSession();
  const { data, error, isLoading } = useGetGoogleCalendarEvents(session);
  const [newEvent, setNewEvent] = useState<PostEvent | null>(null);
  const { mutate } = usePostEventsToGoogleCalendar(session, newEvent);

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
      }
    },
    [mutate],
  );
  return { data, handleSelectSlot };
};
