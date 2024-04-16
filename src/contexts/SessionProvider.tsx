import React, { createContext, Suspense, useContext } from 'react';
import { Spinner } from '@chakra-ui/react';

import { useGetSession } from '../hooks/useGetSession';
const LogIn = React.lazy(() => import('../pages/LogIn/LogIn'));
import { UserSupabase } from '../api/mutations/Users/useAddUserToSupabase';
import { useGetUsersFromSupabase } from '../api/queries/useGetUsersFromSupabase';
import { GoogleDecodedData } from '../api/types/googleDecodedDataTypes';

interface SessionContext {
  decodedData: GoogleDecodedData;
  email: string;
  loggedInUserDbData: UserSupabase;
}

const SessionContext = createContext<SessionContext | null>(null);

const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { decodedData, session } = useGetSession();
  const { data: allUsers, isLoading: isAllUsersLoading } = useGetUsersFromSupabase();

  if (!session)
    return (
      <Suspense fallback={<Spinner color='red.500' size={'xl'} />}>
        <LogIn />
      </Suspense>
    );
  if (!decodedData || isAllUsersLoading) return <Spinner color='red.500' size={'xl'} />;
  const {
    email,
    user_metadata: { avatar_url, full_name },
  } = decodedData;
  const loggedInUserDbData: UserSupabase = allUsers.find((el) => el.email === email) || {
    email: email,
    picture: avatar_url,
    fullName: full_name,
  };

  return (
    <SessionContext.Provider value={{ decodedData, email, loggedInUserDbData }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;

export const useSessionContext = () => {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error('something is wrong wrap element in SessionProvider');
  }
  return ctx;
};
