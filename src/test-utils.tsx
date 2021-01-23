import 'reflect-metadata';
import * as React from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import qs from 'qs';
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
import { parseSearchString } from 'shared/utils';

type CustomRenderOptions = RenderOptions &
  Partial<{
    initialState: Partial<{
      authenticationStatus: AuthenticationStatusAtom;
      currency: CurrencyAtom;
      loaderMessage: LoaderMessageAtom;
      snackbar: SnackbarAtom;
      user: UserAtom;
    }>;
    browserRouter: boolean;
    memoryRouter: Partial<{
      initialEntries: InitialEntry[];
    }>;
  }>;

const customRender = (
  ui: React.ReactElement,
  options?: CustomRenderOptions,
): RenderResult => {
  const { initialState, browserRouter, memoryRouter, ...restOptions } =
    options || {};

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
    <HelmetProvider>
      <GlobalStateProvider
        initialValues={
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          initialValues as any
        }
      >
        {browserRouter ? (
          <BrowserRouter>{children}</BrowserRouter>
        ) : (
          <MemoryRouter {...memoryRouter}>{children}</MemoryRouter>
        )}
      </GlobalStateProvider>
    </HelmetProvider>
  );

  return render(ui, { ...restOptions, wrapper: Wrapper });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSearchParams = (): Record<string, any> =>
  parseSearchString(window.location.href);

const getDocumentTitle = (): string => document.title.split(' – ')[0];

export * from '@testing-library/react';

export { customRender as render, userEvent, getSearchParams, getDocumentTitle };
