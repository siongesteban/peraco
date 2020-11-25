import * as React from 'react';

import { FirebaseService } from 'shared/services/firebase';

import { UserContext, UserContextValues } from '../../contexts';

export const UserProvider: React.FC = ({ children }) => {
  const [values, setValues] = React.useState<UserContextValues>({
    isAuthenticating: true,
    user: null,
    isAuthenticated: false,
  });
  const firebaseService = FirebaseService.getInstance();

  React.useEffect(() => {
    firebaseService.authenticate((user) => {
      if (user) {
        setValues((prev) => ({
          ...prev,
          user: { name: user.uid },
          isAuthenticated: true,
        }));
      }

      setValues((prev) => ({ ...prev, isAuthenticating: false }));
    });
  }, []);

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
