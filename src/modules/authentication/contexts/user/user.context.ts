import React from 'react';

export type User = {
  name: string;
};

export type UserContextValues = {
  authenticating?: boolean;
  user: User | null;
};

export type UserContext = UserContextValues & {
  setValues?: (values: Partial<UserContextValues>) => void;
};

export const UserContext = React.createContext<UserContext>({
  user: null,
});
