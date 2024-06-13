import { useEffect } from 'react';
import { Event } from 'react-big-calendar';
import { useToast } from '@chakra-ui/react';
import { Session } from '@supabase/supabase-js';
import { useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';

import { useDeleteEventFromGoogleCalendar } from '../../../api/mutations/Calendar/useDeleteEventFromGoogleCalendar';
import { PostEvent } from '../../../api/mutations/Calendar/usePostEventToGoogleCalendar';
import { usePutEventToGoogleCalendar } from '../../../api/mutations/Calendar/usePutEventToGoogleCalendar';
import { MINUTES_IN_HOUR } from '../../../constants/constants';
import { QUERY_KEYS } from '../../../constants/query_keys';
import { supabase } from '../../../database/supabase';
import { calendarEditEventValidations } from '../../../schemas/validations';

export const useEditOrDeleteEvent = (
  session: Session | null,
  event: Event | null,
  setMode: React.Dispatch<React.SetStateAction<string>>,
  onClose: () => void,
) => {
  const { mutate: editEvent } = usePutEventToGoogleCalendar();
  const { mutate: deleteEvent } = useDeleteEventFromGoogleCalendar();
  const toast = useToast();
  const queryclient = useQueryClient();
  const editOrDeletePresentationModeEvent = async (
    mode: 'edit' | 'delete',
    id:string,
    eventPresentationEditedData = {},
  ) => {
    if (mode === 'edit') {
      await supabase.from('presentation').update([eventPresentationEditedData]).eq('id', id);
    } else if (mode === 'delete') {
      await supabase.from('presentation').delete().eq('id', id);
    }
    queryclient.invalidateQueries({ queryKey: [QUERY_KEYS.getEvents] });
    toast({
      title: mode === 'edit'
? 'Event Edited'
: 'Event Deleted',
      description: mode === 'edit'
? `success editing event`
: `success deleting event`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const parseDateToLocal = (date: Date) => {
    const LOCAL_TIME_ZONE_OFFSET = (date.getTimezoneOffset() / MINUTES_IN_HOUR) * -1;
    const SLICE_START = 0;
    const SLICE_END = -5;
    date.setHours(date.getHours() + LOCAL_TIME_ZONE_OFFSET);
    const formattedDate = date.toISOString().slice(SLICE_START, SLICE_END);
    return formattedDate;
  };

  const parseDateToISO = (date: string) => {
    const localDate = new Date(date);
    const ISODate = localDate.toISOString();
    return ISODate;
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      start: '',
      end: '',
    },
    onSubmit: (values) => {
      const start = parseDateToISO(values.start);
      const end = parseDateToISO(values.end);
      if (session?.user.app_metadata.provider === 'google') {
        const editedEvent: PostEvent = {
          start: { dateTime: start },
          end: { dateTime: end },
          summary: values.title,
        };
        if (session && event && event.id) {
          editEvent({ session, id: event.id, editedEvent });
        }
      } else {
        const editedData = {
          start: start,
          end: end,
          title: values.title,
        };
        
        if (event && event.id) {
          editOrDeletePresentationModeEvent('edit', event.id, editedData);
        }
      }
      setMode('');
      onClose();
    },
    validationSchema: calendarEditEventValidations,
  });

  const updateFormValues = () => {
    if (event) {
      const start = event.start
? parseDateToLocal(event.start)
: '';
      const end = event.end
? parseDateToLocal(event.end)
: '';
      const updatedFormValues = {
        title: typeof event.title === 'string'
? event.title
: '',
        description: event.description || '',
        start,
        end,
      };
      formik.setValues(updatedFormValues);
    }
  };

  useEffect(() => {
    updateFormValues();
  }, [event]); // eslint-disable-line

  const handleEditClick = () => setMode('edit');

  const handleDeleteClick = () => {
    if (session && event && event.id && session.user.app_metadata.provider === 'google') {
      deleteEvent({ session, id: event.id });
    } else if (session && event && event.id && session.user.app_metadata.provider !== 'google') {
      editOrDeletePresentationModeEvent('delete', event.id);
    }
    onClose();
    setMode('');
  };
  return { formik, handleEditClick, handleDeleteClick };
};
