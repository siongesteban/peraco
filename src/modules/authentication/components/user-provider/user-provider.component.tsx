import * as React from 'react';

import { UserContext, UserContextValues } from '../../contexts';

export const UserProvider: React.FC = ({ children }) => {
  const [values, setValues] = React.useState<UserContextValues>({
    isAuthenticating: true,
    user: null,
    isAuthenticated: false,
  });

  const userContextProviderValue: UserContext = {
    ...values,
    setValues: (values) => setValues((prev) => ({ ...prev, ...values })),
  };

  return (
    <UserContext.Provider value={userContextProviderValue}>
      {children}
    </UserContext.Provider>
  );
};
