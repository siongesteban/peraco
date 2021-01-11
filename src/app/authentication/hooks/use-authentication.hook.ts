import * as React from 'react';

import {
  AuthenticationActionContext,
  AuthenticationStateContext,
} from '../authentication.context';

const useAuthenticationState = (): AuthenticationStateContext => {
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

const useAuthenticationAction = (): AuthenticationActionContext => {
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
