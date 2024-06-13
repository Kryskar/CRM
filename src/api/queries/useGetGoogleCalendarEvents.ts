import { Session } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

import { formatEvents, formatEventsPresentationMode } from '../../components/Calendar/hooks/events';
import { CALENDAR_TIME_MAX, CALENDAR_TIME_MIN } from '../../constants/constants';
import { supabase } from '../../database/supabase';
import { createGoogleCalendarClient } from '../axios_instances/googleCalendarClient';
import { GoogleCalendarEventsListItem } from '../types/googleCalendarEventsTypes';

const getEvents = async (
  session: Session | null,
  timeMin = CALENDAR_TIME_MIN,
  timeMax = CALENDAR_TIME_MAX,
) => {
  try {
    if (session && session.user.app_metadata.provider === 'google') {
      const googleCalendarClient = createGoogleCalendarClient(session);
      const allEvents: GoogleCalendarEventsListItem[] = [];

      const fetchEvents = async (pageToken?: string) => {
        const { data } = await googleCalendarClient.get('', {
          params: {
            timeMin: timeMin,
            timeMax: timeMax,
            pageToken: pageToken,
          },
        });

        allEvents.push(...data.items);

        if (data.nextPageToken) {
          await fetchEvents(data.nextPageToken);
        }
      };

      await fetchEvents();
      return allEvents;
    } else {
      const { data, error } = await supabase.from('presentation').select('*');

      if (error) {
        console.error('Error fetching events:', error); //eslint-disable-line
        return [];
      } else {
        return data;
      }
    }
  } catch (error) {
    console.error('Error getting events:', error); // eslint-disable-line
  }
};

export const useGetGoogleCalendarEvents = (
  session: Session | null,
  queryKey: string,
  timeMin?: string,
  timeMax?: string,
) => {
  const { data, error, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: () => getEvents(session, timeMin, timeMax),
    enabled: !!session,
  });
  if (data && session?.user.app_metadata.provider === 'google') {
    return {
      data: formatEvents(data),
      error,
      isLoading,
    };
  } else if (data && session?.user.app_metadata.provider !== 'google') {
    return { data: formatEventsPresentationMode(data), isLoading, error };
  }

  return { data: null, isLoading, error };
};
