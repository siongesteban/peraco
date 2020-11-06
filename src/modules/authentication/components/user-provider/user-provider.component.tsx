import React from 'react';

import { firebaseClient } from 'shared/services/firebase';

import { UserContext, User } from '../../contexts';

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);

  const checkIfAuthenticated = async () => {
    firebaseClient.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({ name: user.uid });
      }
    });
  };

  React.useEffect(() => {
    checkIfAuthenticated();
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
