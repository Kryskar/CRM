import { useToast } from '@chakra-ui/react';
import { Session } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../constants/query_keys';
import { GOOGLE_CALENDAR_API_BASE_URL } from '../../../constants/urls';
import { createGoogleCalendarClient } from '../../axios_instances/googleCalendarClient';

import { PostEvent } from './usePostEventToGoogleCalendar';


const putEvent = async (session: Session, id: string, editedEvent:PostEvent) => {
  const url = `${GOOGLE_CALENDAR_API_BASE_URL}/${id}`;
  const googleCalendarClient = createGoogleCalendarClient(session)
  try{
    const {data} = await googleCalendarClient.put(url, editedEvent)
    return data;
  }catch (error){
    console.error('Error posting event:', error); // eslint-disable-line
    throw error;
  }
  
};

type PutEventProps = {
  editedEvent:PostEvent, id:string; session: Session;
}

export const usePutEventToGoogleCalendar = () => {
  const queryclient = useQueryClient();
  const toast = useToast();
  const { mutate } = useMutation({
    mutationFn: ({editedEvent, id, session}:PutEventProps) => putEvent(session, id, editedEvent),
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: [QUERY_KEYS.getEvents] });
      toast({
        title: 'Event Edited',
        description: `success editing event`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
  });
  return { mutate };
};
