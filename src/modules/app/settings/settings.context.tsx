import * as React from 'react';

type Currency = {
  symbol: string;
  code: string;
};

type State = {
  currency: Currency;
};

const SettingsContext = React.createContext<State | undefined>(undefined);

export const SettingsProvider: React.FC = ({ children }) => (
  <SettingsContext.Provider
    value={{
      currency: {
        symbol: '₱',
        code: 'PHP',
      },
    }}
  >
    {children}
  </SettingsContext.Provider>
);

export const useSettings = (): State => {
  const context = React.useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }

  return context;
};
