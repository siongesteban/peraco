import 'reflect-metadata';
import * as React from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider as GlobalStateProvider } from 'jotai';
import { SnackbarProvider } from 'notistack';

import { loaderMessageAtom, LoaderMessageAtom } from 'modules/app/loader';
import { SettingsProvider } from 'modules/app/settings';
import {
  authenticationStatusAtom,
  AuthenticationStatusAtom,
  userAtom,
  UserAtom,
} from 'modules/authentication';

type CustomRenderOptions = RenderOptions & {
  initialState?: Partial<{
    authenticationStatus: AuthenticationStatusAtom;
    loaderMessage: LoaderMessageAtom;
    user: UserAtom;
  }>;
};

const customRender = (
  ui: React.ReactElement,
  options?: CustomRenderOptions,
): RenderResult => {
  const { initialState, ...restOptions } = options || {};

  const initialValues = [
    [authenticationStatusAtom, initialState?.authenticationStatus],
    [loaderMessageAtom, initialState?.loaderMessage],
    [userAtom, initialState?.user],
  ];

  const Wrapper: React.FC = ({ children }) => (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <GlobalStateProvider initialValues={initialValues as any}>
      <SnackbarProvider>
        <SettingsProvider>{children}</SettingsProvider>
      </SnackbarProvider>
    </GlobalStateProvider>
  );

  return render(ui, { ...restOptions, wrapper: Wrapper });
};

export * from '@testing-library/react';

export { customRender as render, userEvent };
