import 'reflect-metadata';
import React from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider as GlobalStateProvider } from 'jotai';
import { HelmetProvider } from 'react-helmet-async';
import { InitialEntry } from 'history';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';

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
import { parseQueryString } from 'shared/utils';
import { ServiceProvider } from 'system/service';

jest.mock('shared/services/currency.service');
jest.mock('shared/services/firebase/firebase.service');
jest.mock('shared/services/user.service');

export type CustomRenderOptions = RenderOptions &
  Partial<{
    initialState: Partial<{
      authenticationStatus: AuthenticationStatusAtom;
      currency: CurrencyAtom;
      loaderMessage: LoaderMessageAtom;
      snackbar: SnackbarAtom;
      user: UserAtom;
    }>;
    router: boolean;
    browserRouter: boolean;
    memoryRouter: Partial<{
      initialEntries: InitialEntry[];
    }>;
  }>;

const customRender = (
  ui: React.ReactElement,
  options?: CustomRenderOptions,
): RenderResult => {
  const {
    initialState,
    router = true,
    browserRouter,
    memoryRouter,
    ...restOptions
  } = options || {};

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
    <ServiceProvider>
      <HelmetProvider>
        <GlobalStateProvider
          initialValues={
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            initialValues as any
          }
        >
          {!router ? null : browserRouter ? (
            <BrowserRouter>{children}</BrowserRouter>
          ) : (
            <MemoryRouter {...memoryRouter}>{children}</MemoryRouter>
          )}
        </GlobalStateProvider>
      </HelmetProvider>
    </ServiceProvider>
  );

  return render(ui, { ...restOptions, wrapper: Wrapper });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSearchParams = (): Record<string, any> =>
  parseQueryString(window.location.href);

const getDocumentTitle = (): string => document.title.split(' – ')[0];

export * from '@testing-library/react';

export { customRender as render, userEvent, getSearchParams, getDocumentTitle };
