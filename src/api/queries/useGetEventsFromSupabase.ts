import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../constants/query_keys';
import { supabase } from '../../database/supabase';

export interface NewEvent {
  client: string;
  clientId: string;
  dateTime: string;
  eventName: string;
  googleCalendarEventId: string | null;
  id: string;
  user: string;
}

export const useGetEventsFromSupabase = () => {
  const {
    data: events,
    error,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.getTaskEvents],
    queryFn: async () =>
      await supabase.from('events').select('*').order('dateTime', { ascending: false }),
  });

  if (events && events.data) {
    const data: NewEvent[] = events.data;
    return { data, isLoading, error };
  }
  return { data: [], isLoading, error };
};
