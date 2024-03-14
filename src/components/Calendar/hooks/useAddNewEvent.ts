import { useEffect } from 'react';

import {
  PostEvent,
  usePostEventToGoogleCalendar,
} from '../../../api/mutations/Calendar/usePostEventToGoogleCalendar';
import { useGetGoogleCalendarEvents } from '../../../api/queries/useGetGoogleCalendar';
import { QUERY_KEYS } from '../../../constants/query_keys';
import { useGetSession } from '../../../hooks/useGetSession';

export const useAddNewEvent = () => {
  const { session } = useGetSession();
  const { data, error, isLoading } = useGetGoogleCalendarEvents(session, QUERY_KEYS.getEvents);
  const { mutate } = usePostEventToGoogleCalendar();

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
