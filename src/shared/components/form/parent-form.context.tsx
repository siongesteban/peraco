import * as React from 'react';
import { RegisterOptions, UseFormMethods } from 'react-hook-form';

export type RegisterOptionsMap = Record<string, RegisterOptions>;

type Context = UseFormMethods;

const ParentFormContext = React.createContext<Context | undefined>(undefined);

export type ParentFormProviderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormMethods<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
};

export const ParentFormProvider: React.FC<ParentFormProviderProps> = ({
  children,
  form,
  onSubmit,
}) => (
  <ParentFormContext.Provider value={form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
  </ParentFormContext.Provider>
);

export const useParentForm = (): Context => {
  const context = React.useContext(ParentFormContext);

  if (!context) {
    throw new Error('useParentForm must be used within a ParentFormProvider');
  }

  return context;
};
