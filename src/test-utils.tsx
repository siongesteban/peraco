import 'reflect-metadata';
import * as React from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider as GlobalStateProvider } from 'jotai';
import { HelmetProvider } from 'react-helmet-async';

import {
  authenticationStatusAtom,
  AuthenticationStatusAtom,
  currencyAtom,
  CurrencyAtom,
  loaderMessageAtom,
  LoaderMessageAtom,
  snackbarAtom,
  SnackbarAtom,
  userAtom,
  UserAtom,
} from 'shared/atoms';

type CustomRenderOptions = RenderOptions & {
  initialState?: Partial<{
    authenticationStatus: AuthenticationStatusAtom;
    currency: CurrencyAtom;
    loaderMessage: LoaderMessageAtom;
    snackbar: SnackbarAtom;
    user: UserAtom;
  }>;
};

const customRender = (
  ui: React.ReactElement,
  options?: CustomRenderOptions,
): RenderResult => {
  const { initialState, ...restOptions } = options || {};

  const initialValues = [
    [
      authenticationStatusAtom,
      initialState?.authenticationStatus ?? authenticationStatusAtom.init,
    ],
    [currencyAtom, initialState?.currency ?? currencyAtom.init],
    [loaderMessageAtom, initialState?.loaderMessage ?? loaderMessageAtom.init],
    [snackbarAtom, initialState?.snackbar ?? snackbarAtom.init],
    [userAtom, initialState?.user ?? userAtom.init],
  ];

  const Wrapper: React.FC = ({ children }) => (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <HelmetProvider>
      <GlobalStateProvider initialValues={initialValues as any}>
        {children}
      </GlobalStateProvider>
    </HelmetProvider>
  );

  return render(ui, { ...restOptions, wrapper: Wrapper });
};

export * from '@testing-library/react';

export { customRender as render, userEvent };
