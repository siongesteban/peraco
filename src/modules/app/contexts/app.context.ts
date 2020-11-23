import React from 'react';

export type AppContextValues = {
  error?: string | null;
};

export type AppContextMethods = {
  setValues: (values: Partial<AppContextValues>) => void;
  enqueueErrorMessage: (message: string) => void;
};

export type AppContext = AppContextValues & AppContextMethods;

export const AppContext = React.createContext<AppContext>({
  setValues: (values) => values,
  enqueueErrorMessage: (message) => message,
});
