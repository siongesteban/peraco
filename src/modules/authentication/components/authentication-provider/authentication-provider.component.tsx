import * as React from 'react';

import {
  AuthenticationStateContext,
  AuthenticationActionContext,
} from '../../contexts';

type UseValues = () => {
  state: AuthenticationStateContext;
  action: AuthenticationActionContext;
};

const useValues: UseValues = () => {
  const [state, setState] = React.useState<AuthenticationStateContext>({
    isAuthenticating: false,
    isAuthenticated: false,
    isSigningIn: false,
    message: null,
    user: null,
  });

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

export const AuthenticationProvider: React.FC = ({ children }) => {
  const { state, action } = useValues();

  return (
    <AuthenticationStateContext.Provider value={state}>
      <AuthenticationActionContext.Provider value={action}>
        {children}
      </AuthenticationActionContext.Provider>
    </AuthenticationStateContext.Provider>
  );
};
