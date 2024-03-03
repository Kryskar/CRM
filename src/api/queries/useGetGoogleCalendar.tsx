import { Session } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

import { formatEvents } from '../../components/Calendar/hooks/events';
import { CALENDAR_TIME_MIN } from '../../constants/constants';
import { QUERY_KEYS } from '../../constants/query_keys';
import { createGoogleCalendarClient } from '../axios_instances/googleCalendarClient';
import { GoogleCalendarEventsList } from '../types/googleCalendarEventsTypes';

const getEvents = async (session: Session | null) => {
 
  if (session) {
  const googleCalendarClient=createGoogleCalendarClient(session)
  const {data} = await googleCalendarClient.get("", {
      params: {
        'timeMin': CALENDAR_TIME_MIN,
      },
    });
    
    return data;
  }
};

export const useGetGoogleCalendarEvents = (session: Session|null) => {
  const { data, error, isLoading } = useQuery<GoogleCalendarEventsList>({
    queryKey: [QUERY_KEYS.getEvents],
    queryFn: () => getEvents(session),
    enabled: !!session,
  });
  if(data){
    return {
      data: formatEvents(data),
      error,
      isLoading
    }
  }
  return { data, isLoading, error };
};
