import { Event } from 'react-big-calendar';
import { Session } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface PostEvent {
  end: { dateTime: string };
  start: { dateTime: string };
  summary: string;
}

const putEvents = async (session: Session | null, event: Event | null, editedEvent?:PostEvent) => {
  const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${event?.id}`);
  if (session) {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + session.provider_token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedEvent),
    });
    const data = await res.json();
    return data;
  }
};

export const usePutEventsToGoogleCalendar = (session: Session | null, event: Event | null) => {
  const queryclient = useQueryClient();
  const { mutate } = useMutation<void, unknown, PostEvent>({
    mutationFn: (editedEvent:PostEvent) => putEvents(session, event, editedEvent),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['GET_EVENTS'] });
    },
  });
  return { mutate };
};
