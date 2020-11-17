import React from 'react';

import { FirebaseService } from 'shared/services/firebase';

import { UserContext, UserContextValues } from '../../contexts';

export const UserProvider: React.FC = ({ children }) => {
  const [values, setValues] = React.useState<UserContextValues>({
    user: null,
  });
  const firebaseService = FirebaseService.getInstance();

  React.useEffect(() => {
    firebaseService.authenticate((user) => {
      if (user) {
        setValues((prev) => ({ ...prev, user: { name: user.uid } }));
      }
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
