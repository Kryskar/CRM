import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { jwtDecode } from 'jwt-decode';

import { GoogleDecodedData } from '../api/types/googleDecodedDataTypes';
import { supabase } from '../database/supabase';

export const useGetSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [decodedData, setDecodedData] = useState<GoogleDecodedData | null>(null);

  const handleSession = (session: Session) => {
    if (session.user.app_metadata.provider === 'google') {
      const decoded: GoogleDecodedData = jwtDecode(session.access_token);
      setDecodedData(decoded);
      if (!session.provider_token) {
        supabase.auth.signOut();
        setSession(null);
      }
    } else {
      const decoded: any = jwtDecode(session.access_token);  //eslint-disable-line
      setDecodedData(decoded);
    }

    setSession(session);
  };

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      if (session) {
        handleSession(session);
      }
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        handleSession(session);
      } else {
        setSession(null);
        setDecodedData(null);
      }  
    });

    return () => subscription.unsubscribe();
  }, []);
  

  return { session, decodedData };
};
