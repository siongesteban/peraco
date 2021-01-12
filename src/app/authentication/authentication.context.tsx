import * as React from 'react';

import { UserDocType } from 'shared/services/rxdb/schemas';
import { BaseAction, Reducer } from 'shared/types';

type State = {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  isSigningIn: boolean;
  message: string | null;
  user: UserDocType | null;
};

type Action =
  | BaseAction<'START_AUTH'>
  | BaseAction<'START_SIGNIN'>
  | BaseAction<'SET_USER', { user: UserDocType | null }>;

type Dispatch = (action: Action) => void;

const AuthenticationStateContext = React.createContext<State | undefined>(
  undefined,
);

const AuthenticationDispatchContext = React.createContext<Dispatch | undefined>(
  undefined,
);

const authenticationReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'START_AUTH':
      return {
        ...state,
        isAuthenticating: true,
      };
    case 'START_SIGNIN':
      return {
        ...state,
        isSigningIn: true,
        message: 'Waiting for response...',
      };
    case 'SET_USER': {
      const { user } = action.payload;

      return {
        ...state,
        user: user,
        isAuthenticating: false,
        isSigningIn: false,
        message: null,
        isAuthenticated: !!user,
      };
    }
    default:
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      throw new Error(`Unhandled authentication action type: ${action!.type}`);
  }
};

export type AuthenticationProviderProps = {
  value?: Partial<State>;
};

export const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({
  children,
  value,
}) => {
  const [state, dispatch] = React.useReducer(authenticationReducer, {
    isAuthenticating: true,
    isAuthenticated: false,
    isSigningIn: false,
    message: null,
    user: null,
    ...value,
  });

  return (
    <AuthenticationStateContext.Provider value={state}>
      <AuthenticationDispatchContext.Provider value={dispatch}>
        {children}
      </AuthenticationDispatchContext.Provider>
    </AuthenticationStateContext.Provider>
  );
};

const useAuthenticationState = (): State => {
  const context = React.useContext(AuthenticationStateContext);

  if (!context) {
    throw new Error(
      'useAuthenticationState must be used within a AuthenticationProvider',
    );
  }

  return context;
};

const useAuthenticationDispatch = (): Dispatch => {
  const context = React.useContext(AuthenticationDispatchContext);

  if (!context) {
    throw new Error(
      'useAuthenticationDispatch must be used within a AuthenticationProvider',
    );
  }

  return context;
};

export const useAuthentication = (): {
  authenticationState: State;
  authenticationDispatch: Dispatch;
} => {
  const authenticationState = useAuthenticationState();
  const authenticationDispatch = useAuthenticationDispatch();

  return {
    authenticationState,
    authenticationDispatch,
  };
};
