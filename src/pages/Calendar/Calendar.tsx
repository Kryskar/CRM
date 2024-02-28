import { useEffect } from 'react';

import CalendarComponent from '../../components/Calendar/Calendar_Container/CalendarComponent';
import { supabase } from '../../database/supabase';
import { useGetSession } from '../../hooks/useGetSession';

const Calendar = () => {
  const { session } = useGetSession();

  useEffect(() => {
    if (session) {
      if (!session.provider_token) {
        supabase.auth.signOut();
      }
    }
  }, [session]);

  return <CalendarComponent />;
};

export default Calendar;
