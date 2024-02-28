import { Session } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface PostEvent {
  end: { dateTime: string };
  start: { dateTime: string };
  summary: string;
}

const postEvents = async (session: Session | null, event: PostEvent | null) => {
  const url = new URL('https://www.googleapis.com/calendar/v3/calendars/primary/events');

  if (session) {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + session.provider_token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    const data = await res.json();
    return data;
  }
};

export const usePostEventsToGoogleCalendar = (session: Session | null, event: PostEvent | null) => {
  const queryclient = useQueryClient();
  const { mutate } = useMutation<PostEvent>({
    mutationFn: () => postEvents(session, event),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['GET_EVENTS'] });
    },
  });
  return { mutate };
};
