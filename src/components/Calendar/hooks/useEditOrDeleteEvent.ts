import { useEffect } from 'react';
import { Event } from 'react-big-calendar';
import { Session } from '@supabase/supabase-js';
import { useFormik } from 'formik';

import { useDeleteEventFromGoogleCalendar } from '../../../api/mutations/Calendar/useDeleteEventFromGoogleCalendar';
import { PostEvent, usePutEventToGoogleCalendar } from '../../../api/mutations/Calendar/usePutEventToGoogleCalendar';

export const useEditOrDeleteEvent = (
  session: Session | null,
  event: Event | null,
  setMode: React.Dispatch<React.SetStateAction<string>>,
  onClose: () => void,
) => {
  
  const { mutate: editEvent } = usePutEventToGoogleCalendar();
  const { mutate: deleteEvent } = useDeleteEventFromGoogleCalendar();

  const parseDateToLocal = (date: Date) => {
    const WARSAW_TIME_ZONE = 1;
    const SLICE_START = 0;
    const SLICE_END = -5;
    date.setHours(date.getHours() + WARSAW_TIME_ZONE);
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
      const editedEvent : PostEvent = {
        start: { dateTime: start },
        end: { dateTime: end },
        summary: values.title,
      };
      if (session && event){
      editEvent({session, event, editedEvent});
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
    if(session && event){
      deleteEvent({session,event});
    }
    onClose();
    setMode('');
    
  };
  return { formik, handleEditClick, handleDeleteClick };
};
