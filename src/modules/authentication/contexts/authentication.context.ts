import * as React from 'react';

type User = {
  name: string;
};

export type AuthenticationStateContext = {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  message: string | null;
  user: User | null;
};

export const AuthenticationStateContext = React.createContext<
  AuthenticationStateContext | undefined
>(undefined);

export type AuthenticationActionContext = {
  startAuthentication: (message?: string) => void;
  setUser: (user: User | null) => void;
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
