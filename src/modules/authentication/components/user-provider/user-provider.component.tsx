import React from 'react';

import { FirebaseService } from 'shared/services/firebase';

import { UserContext, User } from '../../contexts';

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const firebaseService = FirebaseService.getInstance();

  React.useEffect(() => {
    firebaseService.authenticate((user) => {
      if (user) {
        setUser({ name: user.uid });
      }
    });
  }, []);

  const userContextProviderValue: UserContext = {
    user,
    setUser: (user: User) => {
      setUser(user);
    },
  };

  return (
    <UserContext.Provider value={userContextProviderValue}>
      {children}
    </UserContext.Provider>
  );
};
