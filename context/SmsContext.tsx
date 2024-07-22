'use client';
import { Dispatch, FC, ReactNode, SetStateAction, createContext, useState } from 'react';

interface ISmsContext {
  activeNumber: number | undefined;
  setActiveNumber: Dispatch<SetStateAction<number | undefined>>;
}

interface SmsProviderProps {
  children: ReactNode;
}

const SmsContext = createContext<ISmsContext | undefined>(undefined);

export const SmsProvider: FC<SmsProviderProps> = ({ children }) => {
  const [activeNumber, setActiveNumber] = useState<number | undefined>();

  return (
    <SmsContext.Provider value={{ activeNumber, setActiveNumber }}>{children}</SmsContext.Provider>
  );
};

export { SmsContext };
