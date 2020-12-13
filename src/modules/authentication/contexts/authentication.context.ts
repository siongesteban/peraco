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

export const useAuthenticationState = (): AuthenticationStateContext => {
  const authenticationStateContext = React.useContext(
    AuthenticationStateContext,
  );

  if (!authenticationStateContext) {
    throw new Error(
      'useAuthenticationState must be used within AuthenticationProvider',
    );
  }

  return authenticationStateContext;
};

export const useAuthenticationAction = (): AuthenticationActionContext => {
  const authenticationActionContext = React.useContext(
    AuthenticationActionContext,
  );

  if (!authenticationActionContext) {
    throw new Error(
      'useAuthenticationAction must be used within AuthenticationProvider',
    );
  }

  return authenticationActionContext;
};

export type UseAuthentication = () => {
  authenticationState: AuthenticationStateContext;
  authenticationAction: AuthenticationActionContext;
};

export const useAuthentication: UseAuthentication = () => {
  const authenticationState = useAuthenticationState();
  const authenticationAction = useAuthenticationAction();

  return {
    authenticationState,
    authenticationAction,
  };
};
