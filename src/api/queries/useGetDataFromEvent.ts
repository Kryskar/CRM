import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../constants/query_keys';
import { supabase } from '../../database/supabase';

export interface NewEvent {
  client: string;
  dateTime: string;
  eventName: string;
  id: string;
  user: string;
}

export const useGetDataFromEvent = (id: string) => {
  const {
    data: event,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`${QUERY_KEYS.getEvent}_${id}`],
    queryFn: async () => await supabase.from('events').select('*').eq('clientId', id),
  });

  if (event && event.data && event.data.length > 0) { //eslint-disable-line
    const data = event.data[0]; //eslint-disable-line
    const { clientId, googleCalendarEventId } = data;
    return { clientId, googleCalendarEventId, isLoading, error };
  } else {

    return { clientId: undefined, googleCalendarEventId: undefined, isLoading, error };
  }
};
