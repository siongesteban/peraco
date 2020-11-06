import React from 'react';

export type User = {
  name: string;
};

export type UserContext = {
  user: User | null;
  setUser: null | ((user: User) => void);
};

export const UserContext = React.createContext<UserContext>({
  user: null,
  setUser: null,
});
