import * as React from 'react';
import { RegisterOptions, UseFormMethods } from 'react-hook-form';

export type RegisterOptionsMap = Record<string, RegisterOptions>;

type Context = {
  parentForm: UseFormMethods;
  registerOptions: RegisterOptionsMap;
};

const ParentFormContext = React.createContext<Context | undefined>(undefined);

export type ParentFormProviderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormMethods<any>;
  registerOptions?: RegisterOptionsMap;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
};

export const ParentFormProvider: React.FC<ParentFormProviderProps> = ({
  children,
  form,
  registerOptions = {},
  onSubmit,
}) => (
  <ParentFormContext.Provider value={{ parentForm: form, registerOptions }}>
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
