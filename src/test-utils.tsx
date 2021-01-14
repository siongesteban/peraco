import 'reflect-metadata';
import * as React from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SnackbarProvider } from 'notistack';

import { SettingsProvider } from 'modules/app/settings';
import {
  AuthenticationProvider,
  AuthenticationProviderProps,
} from 'modules/authentication';

type CustomRenderOptions = {
  authentication?: AuthenticationProviderProps;
} & RenderOptions;

const customRender = (
  ui: React.ReactElement,
  options?: CustomRenderOptions,
): RenderResult => {
  const { authentication, ...restOptions } = options || {};

  const Wrapper: React.FC = ({ children }) => (
    <SnackbarProvider>
      <AuthenticationProvider
        value={{
          isAuthenticating: false,
          isAuthenticated: false,
          isSigningIn: false,
          message: null,
          user: null,
          ...authentication?.value,
        }}
      >
        <SettingsProvider>{children}</SettingsProvider>
      </AuthenticationProvider>
    </SnackbarProvider>
  );

  return render(ui, { ...restOptions, wrapper: Wrapper });
};

export * from '@testing-library/react';

export { customRender as render, userEvent };
