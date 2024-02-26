import { Session } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

import { GoogleCalendarEventsList } from '../types/googleCalendarEventsTypes';

const getEvents = async (session: Session | null) => {
  const TIME_MIN = '2022-01-01T00:00:00Z';
  const url = new URL('https://www.googleapis.com/calendar/v3/calendars/primary/events');
  url.searchParams.append('timeMin', TIME_MIN);

  if (session) {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + session.provider_token,
      },
    });
    const data = await res.json();
    return data;
  }
};

export const useGetGoogleCalendarEvents = (session: Session | null) => {
  const { data, error, isLoading } = useQuery<GoogleCalendarEventsList>({
    queryKey: ['GET_EVENTS'],
    queryFn: () => getEvents(session),
    enabled: !!session,
  });
  return { data, isLoading, error };
};
