import { useEffect } from 'react';
import { SlotInfo } from 'react-big-calendar';
import { useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { setHours, setMinutes } from 'date-fns';

import {
  PostEvent,
  usePostEventToGoogleCalendar,
} from '../../../api/mutations/Calendar/usePostEventToGoogleCalendar';
import { PresentationEvent } from '../../../api/mutations/Clients/mutationHelpers';
import { useGetGoogleCalendarEvents } from '../../../api/queries/useGetGoogleCalendarEvents';
import { getHoursAndMinutes } from '../../../constants/constants';
import { QUERY_KEYS } from '../../../constants/query_keys';
import { supabase } from '../../../database/supabase';
import { useGetSession } from '../../../hooks/useGetSession';
import { AddEventValues } from '../Calendar_Items/AddEventModalPart';

export const useAddNewEvent = () => {
  const { session } = useGetSession();
  const { data, error, isLoading } = useGetGoogleCalendarEvents(session, QUERY_KEYS.getEvents);
  const { mutate } = usePostEventToGoogleCalendar();
  const queryclient = useQueryClient();
  const toast = useToast();
  const addPresentationModeEvent = async (inputData: PresentationEvent) => {
    await supabase.from('presentation').insert([inputData]).select();
    queryclient.invalidateQueries({ queryKey: [QUERY_KEYS.getEvents] });
    toast({
      title: 'Event Posted',
      description: `success posting event`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  useEffect(() => {
    if (isLoading) return;
    if (error) throw new Error('Error getting events from google calendar');
  }, [error, isLoading]);

  const handleSelectSlot = (
    e: SlotInfo,
    onOpen: () => void,
    setSelectedSlot: React.Dispatch<React.SetStateAction<SlotInfo | null>>,
  ) => {
    setSelectedSlot(e);
    onOpen();
  };

  const handleAddNewEvent = (values: AddEventValues, event: SlotInfo) => {
    const { title } = values;
    const { start } = event;

    const startTime = setMinutes(
      setHours(start, getHoursAndMinutes(values.start).hours),
      getHoursAndMinutes(values.start).minutes,
    ).toISOString();
    const endTime = setMinutes(
      setHours(start, getHoursAndMinutes(values.end).hours),
      getHoursAndMinutes(values.end).minutes,
    ).toISOString();
    if (title) {
      if (session?.user.app_metadata.provider === 'google') {
        const newEvent: PostEvent = {
          start: { dateTime: startTime },
          end: { dateTime: endTime },
          summary: title,
        };
        if (session) {
          mutate({ session, event: newEvent });
        }
      } else {
        //presentation mode
        const presentationModeNewEvent: PresentationEvent = {
          start: startTime,
          end: endTime,
          title: title,
        };
        addPresentationModeEvent(presentationModeNewEvent);
      }
    }
  };
  return { data, handleSelectSlot, handleAddNewEvent };
};
