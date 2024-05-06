import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { jwtDecode } from 'jwt-decode';

import { GoogleDecodedData } from '../api/types/googleDecodedDataTypes';
import { supabase } from '../database/supabase';

export const useGetSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [decodedData, setDecodedData] = useState<GoogleDecodedData | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        const decoded: GoogleDecodedData = jwtDecode(session.access_token);
        setDecodedData(decoded);
        if (!session.provider_token) {
          supabase.auth.signOut();
          setSession(null);
        }
        setSession(session);
      } else {
        setSession(null);
      }
    });
    
    return () => subscription.unsubscribe();
  }, []);

  return { session, decodedData };
};
