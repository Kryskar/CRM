import { useEffect } from 'react';

import {
  PostEvent,
  usePostEventsToGoogleCalendar,
} from '../../../api/mutations/usePostEventToGoogleCalendar';
import { useGetGoogleCalendarEvents } from '../../../api/queries/useGetGoogleCalendar';
import { useGetSession } from '../../../hooks/useGetSession';

export const useAddNewEvent = () => {
  const { session } = useGetSession();
  const { data, error, isLoading } = useGetGoogleCalendarEvents(session);
  const { mutate } = usePostEventsToGoogleCalendar();

  useEffect(() => {
    if (isLoading) return;
    if (error) throw new Error('Error getting events from google calendar');
  }, [error, isLoading]);

  const handleSelectSlot = ({ end, start }: { end: Date; start: Date }) => {
    const title = window.prompt('New Event name');
    if (title) {
      const newEvent: PostEvent = {
        start: { dateTime: start.toISOString() },
        end: { dateTime: end.toISOString() },
        summary: title,
      };
      if (session) {
        mutate({ session, event: newEvent });
      }
    }
  };
  return { data, handleSelectSlot };
};
