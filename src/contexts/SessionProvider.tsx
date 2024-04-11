import React, { createContext, Suspense, useContext } from 'react';
import { Spinner } from '@chakra-ui/react';

import { useGetSession } from '../hooks/useGetSession';
const LogIn = React.lazy(() => import('../pages/LogIn/LogIn'));
import { GoogleDecodedData } from '../api/types/googleDecodedDataTypes';


interface SessionContext {
    decodedData: GoogleDecodedData;
    email: string
}

const SessionContext = createContext<SessionContext | null>(null);

const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { decodedData, session } = useGetSession();
  
  if (!session)
    return (
      <Suspense fallback={<Spinner color='red.500' size={'xl'} />}>
        <LogIn />
      </Suspense>
    );
    if(!decodedData) return <Spinner color='red.500' size={'xl'} />
    const {email} = decodedData

  return (
    <SessionContext.Provider value ={{decodedData, email}}>
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