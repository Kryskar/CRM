import { Event } from 'react-big-calendar';
import { Session } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteEventResponse {
  error?: string;
  success: boolean;
}

const deleteEvents = async (session: Session | null, event: Event | null) => {
  try {
    const url = new URL(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events/${event?.id}`,
    );

    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + session?.provider_token,
      },
    });

    const NO_CONTENT_STATUS = 204

    if (res.status === NO_CONTENT_STATUS) {
      console.log('Event deleted successfully'); // eslint-disable-line
      return { success: true };
    } else {
      console.error('Failed to delete event. Status:', res.status); // eslint-disable-line
      return { success: false, error: `Failed to delete event. Status: ${res.status}` };
    }
  } catch (error) {
    console.error('Error deleting event:', error); // eslint-disable-line
    return { success: false, error: 'An error occurred while deleting the event' };
  }
};

export const useDeleteEventFromGoogleCalendar = (session: Session | null, event: Event | null) => {
  const queryclient = useQueryClient();
  const { mutate } = useMutation<DeleteEventResponse>({
    mutationFn: () => deleteEvents(session, event),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ['GET_EVENTS'] });
    },
  });
  return { mutate };
};
