import React from 'react';

export type User = {
  name: string;
};

export type UserContextValues = {
  authenticating?: boolean;
  user: User | null;
};

export type UserContextMethods = {
  setValues: (values: Partial<UserContextValues>) => void;
};

export type UserContext = UserContextValues & UserContextMethods;

export const UserContext = React.createContext<UserContext>({
  user: null,
  setValues: (values) => values,
});
