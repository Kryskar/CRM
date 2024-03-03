import { Session } from '@supabase/supabase-js';
import axios from 'axios';

import { GOOGLE_CALENDAR_API_BASE_URL } from '../../constants/urls';

export const createGoogleCalendarClient = (session:Session) => {
  const googleCalendarClient = axios.create({
    baseURL: GOOGLE_CALENDAR_API_BASE_URL,
    timeout: 1000,
    headers: {
      'Authorization': `Bearer ${session.provider_token}`,
      'Content-Type': 'application/json',
    }
  });

  return googleCalendarClient;
};

