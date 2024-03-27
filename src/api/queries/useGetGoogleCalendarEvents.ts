import { Session } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

import { formatEvents } from '../../components/Calendar/hooks/events';
import {
  CALENDAR_TIME_MAX,
  CALENDAR_TIME_MIN,
} from '../../constants/constants';
import { createGoogleCalendarClient } from '../axios_instances/googleCalendarClient';
import { Item } from '../types/googleCalendarEventsTypes';

const getEvents = async (
  session: Session | null,
  timeMin = CALENDAR_TIME_MIN,
  timeMax = CALENDAR_TIME_MAX,
) => {
  try {
    if (session) {
      const googleCalendarClient = createGoogleCalendarClient(session);
      const allEvents:Item[] = [];

     
      const fetchEvents = async (pageToken?: string) => {
        const { data } = await googleCalendarClient.get('', {
          params: {
            timeMin: timeMin,
            timeMax: timeMax,
            pageToken: pageToken
          },
        });

        allEvents.push(...data.items);

        if (data.nextPageToken) {
          await fetchEvents(data.nextPageToken);
        }
      };

      await fetchEvents();
      return allEvents;
    }
  } catch (error) {
    console.error('Error getting events:', error); // eslint-disable-line
  }
};

export const useGetGoogleCalendarEvents = (
  session: Session | null,
  queryKey:string,
  timeMin?: string,
  timeMax?: string,
  
) => {
 
  const { data, error, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: () => getEvents(session, timeMin, timeMax),
    enabled: !!session,
  });

  if (data) {
    return {
      data: formatEvents(data),
      error,
      isLoading,
    };
  }
  return { data: null, isLoading, error };
};