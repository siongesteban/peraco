import * as React from 'react';

import {
  AuthenticationStateContext,
  AuthenticationActionContext,
} from '../../contexts';

type UseValues = (
  initialValues?: AuthenticationStateContext,
) => {
  state: AuthenticationStateContext;
  action: AuthenticationActionContext;
};

const useValues: UseValues = (
  initialValues = {
    isAuthenticating: false,
    isAuthenticated: false,
    isSigningIn: false,
    message: null,
    user: null,
  },
) => {
  const [state, setState] = React.useState<AuthenticationStateContext>(
    initialValues,
  );

  const updateState = (values: Partial<AuthenticationStateContext>): void => {
    setState((prev) => ({ ...prev, ...values }));
  };

  const action: AuthenticationActionContext = {
    startAuthentication: () => {
      updateState({
        isAuthenticating: true,
      });
    },
    startSignin: () => {
      updateState({
        isSigningIn: true,
        message: 'Waiting for response...',
      });
    },
    setUser: (user) => {
      updateState({
        user,
        isAuthenticating: false,
        isSigningIn: false,
        message: null,
        isAuthenticated: !!user,
      });
    },
  };

  return { state, action };
};

export type AuthenticationProviderProps = {
  value?: AuthenticationStateContext;
};

export const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({
  children,
  value,
}) => {
  const { state, action } = useValues(value);

  return (
    <AuthenticationStateContext.Provider value={state}>
      <AuthenticationActionContext.Provider value={action}>
        {children}
      </AuthenticationActionContext.Provider>
    </AuthenticationStateContext.Provider>
  );
};
