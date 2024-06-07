import React, { createContext, useContext, useState } from 'react';

interface IOperationsContext {
  TaskboardClientPhoneNumber: string;
  isTaskboardClientClicked: boolean;
  setIsTaskboardClientClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskboardClientPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
}

const OperationsContext = createContext<IOperationsContext | null>(null);

const OperationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [TaskboardClientPhoneNumber, setTaskboardClientPhoneNumber] = useState('');
  const [isTaskboardClientClicked, setIsTaskboardClientClicked] = useState(false);

  return (
    <OperationsContext.Provider
      value={{
        TaskboardClientPhoneNumber,
        setTaskboardClientPhoneNumber,
        isTaskboardClientClicked,
        setIsTaskboardClientClicked,
      }}
    >
      {children}
    </OperationsContext.Provider>
  );
};

export default OperationsProvider;

export const useOpeationsContext = () => {
  const ctx = useContext(OperationsContext);
  if (!ctx) {
    throw new Error('something is wrong wrap element in OperationsProvider');
  }
  return ctx;
};
