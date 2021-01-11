import * as React from 'react';

import { UserDocType } from 'shared/services/rxdb/schemas';

export type AuthenticationStateContext = {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  isSigningIn: boolean;
  message: string | null;
  user: UserDocType | null;
};

export const AuthenticationStateContext = React.createContext<
  AuthenticationStateContext | undefined
>(undefined);

export type AuthenticationActionContext = {
  startAuthentication: () => void;
  startSignin: () => void;
  setUser: (user: UserDocType | null) => void;
};

export const AuthenticationActionContext = React.createContext<
  AuthenticationActionContext | undefined
>(undefined);
