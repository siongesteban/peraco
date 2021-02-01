import 'reflect-metadata';
import React from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider as GlobalStateProvider, Atom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
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
import { ServiceProvider, useService } from 'system/service';
import { ServiceContext } from 'system/service/components/service-provider/service.context';

jest.mock('shared/services/currency.service');
jest.mock('shared/services/firebase/firebase.service');
jest.mock('shared/services/user.service');

type AtomValues = {
  authenticationStatus: AuthenticationStatusAtom;
  currency: CurrencyAtom;
  loaderMessage: LoaderMessageAtom;
  snackbar: SnackbarAtom;
  user: UserAtom;
};

export type CustomRenderOptions = RenderOptions &
  Partial<{
    initialState: Partial<AtomValues>;
    router: boolean;
    browserRouter: boolean;
    memoryRouter: Partial<{
      initialEntries: InitialEntry[];
    }>;
  }>;

const createWrapper = (
  options?: CustomRenderOptions,
): {
  Wrapper: React.FC;
  atomValues: AtomValues;
  services: ServiceContext;
} => {
  const { initialState, router = true, browserRouter, memoryRouter } =
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

  const atomValues = {} as AtomValues;
  const services = {} as ServiceContext;

  const ChildrenWrapper: React.FC = ({ children }) => {
    const authenticationStatus = useAtomValue(authenticationStatusAtom);
    const currency = useAtomValue(currencyAtom);
    const loaderMessage = useAtomValue(loaderMessageAtom);
    const snackbar = useAtomValue(snackbarAtom);
    const user = useAtomValue(userAtom);
    const { currencyService, firebaseService, userService } = useService();

    atomValues.authenticationStatus = authenticationStatus;
    atomValues.currency = currency;
    atomValues.loaderMessage = loaderMessage;
    atomValues.user = user;
    atomValues.snackbar = snackbar;

    services.currencyService = currencyService;
    services.firebaseService = firebaseService;
    services.userService = userService;

    return <>{children}</>;
  };

  const Wrapper: React.FC = ({ children }) => (
    <ServiceProvider>
      <HelmetProvider>
        <GlobalStateProvider
          initialValues={
            initialValues as Iterable<readonly [Atom<unknown>, unknown]>
          }
        >
          {!router ? null : browserRouter ? (
            <BrowserRouter>
              <ChildrenWrapper>{children}</ChildrenWrapper>
            </BrowserRouter>
          ) : (
            <MemoryRouter {...memoryRouter}>
              <ChildrenWrapper>{children}</ChildrenWrapper>
            </MemoryRouter>
          )}
        </GlobalStateProvider>
      </HelmetProvider>
    </ServiceProvider>
  );

  return { Wrapper, atomValues, services };
};

const customRender = (
  ui: React.ReactElement,
  options?: CustomRenderOptions,
): RenderResult & {
  atomValues: AtomValues;
  services: ServiceContext;
} => {
  const {
    initialState,
    router = true,
    browserRouter,
    memoryRouter,
    ...restOptions
  } = options || {};

  const { Wrapper, atomValues, services } = createWrapper({
    initialState,
    router,
    browserRouter,
    memoryRouter,
  });

  return {
    ...render(ui, { ...restOptions, wrapper: Wrapper }),
    atomValues,
    services,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSearchParams = (): Record<string, any> =>
  parseQueryString(window.location.href);

const getDocumentTitle = (): string => document.title.split(' – ')[0];

export * from '@testing-library/react';

export {
  customRender as render,
  createWrapper,
  userEvent,
  getSearchParams,
  getDocumentTitle,
};
