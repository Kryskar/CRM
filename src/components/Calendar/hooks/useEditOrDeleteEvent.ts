import { useEffect } from 'react';
import { Event } from 'react-big-calendar';
import { Session } from '@supabase/supabase-js';
import { useFormik } from 'formik';

import { useDeleteEventFromGoogleCalendar } from '../../../api/mutations/Calendar/useDeleteEventFromGoogleCalendar';
import { PostEvent } from '../../../api/mutations/Calendar/usePostEventToGoogleCalendar';
import {  usePutEventToGoogleCalendar } from '../../../api/mutations/Calendar/usePutEventToGoogleCalendar';
import { MINUTES_IN_HOUR } from '../../../constants/constants';

export const useEditOrDeleteEvent = (
  session: Session | null,
  event: Event | null,
  setMode: React.Dispatch<React.SetStateAction<string>>,
  onClose: () => void,
) => {
  
  const { mutate: editEvent } = usePutEventToGoogleCalendar();
  const { mutate: deleteEvent } = useDeleteEventFromGoogleCalendar();

  const parseDateToLocal = (date: Date) => {
    const LOCAL_TIME_ZONE_OFFSET = date.getTimezoneOffset()/MINUTES_IN_HOUR*-1; 
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
      description:'',
      start: '',
      end: '',
    },
    onSubmit: (values) => {
      const start = parseDateToISO(values.start);
      const end = parseDateToISO(values.end);
      const editedEvent : PostEvent = {
        start: { dateTime: start },
        end: { dateTime: end },
        summary: values.title,
      };
      if (session && event && event.id){
      editEvent({session, id:event.id, editedEvent});
      }
      setMode('');
      onClose();
    },
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
        title: event.title || '',
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
    if(session && event && event.id){
      deleteEvent({session,id:event.id});
    }
    onClose();
    setMode('');
    
  };
  return { formik, handleEditClick, handleDeleteClick };
};
