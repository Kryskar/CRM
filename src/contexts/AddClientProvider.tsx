import React, { createContext, useContext, useState } from 'react';

import { NewClient } from '../pages/Add_Client/AddClient';


interface AddClientContext {
    client: NewClient[] | null;
    setClient: React.Dispatch<React.SetStateAction<NewClient[] | null>>
}

const AddClientContext = createContext<AddClientContext | null>(null);

const AddClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [client, setClient] = useState<NewClient[] | null>(null)


  return (
    <AddClientContext.Provider value={{client, setClient}}>
        {children}
    </AddClientContext.Provider>
  );
};

export default AddClientProvider;

export const useAddClientContext = () => {
  const ctx = useContext(AddClientContext);
  if (!ctx) {
    throw new Error('something is wrong wrap element in AddClientProvider');
  }
  return ctx;
};