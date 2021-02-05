import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useAuthenticate } from 'modules/authentication';
import { useInitializeTransactions } from 'modules/wallets/components/transactions-page/use-initialize-transactions.hook';

import { AppRoute } from '../app-route';
import { SplashScreen } from '../splash-screen';

const MainPage = React.lazy(() =>
  import(
    /* webpackChunkName: "main-page" */ 'system/main/components/main-page'
  ),
);

const SigninPage = React.lazy(() =>
  import(
    /* webpackChunkName: "signin-page" */ 'modules/authentication/components/signin-page'
  ),
);

const AccountPage = React.lazy(() =>
  import(
    /* webpackChunkName: "account-page" */ 'modules/account/components/account-page'
  ),
);

const WalletsPage = React.lazy(() =>
  import(
    /* webpackChunkName: "wallets-page" */ 'modules/wallets/components/wallets-page'
  ),
);

const TransactionsPage = React.lazy(() =>
  import(
    /* webpackChunkName: "transactions-page" */ 'modules/wallets/components/transactions-page'
  ),
);

export const Router: React.FC = () => {
  // useInitializeTransactions();
  const authenticate = useAuthenticate();

  React.useEffect(() => {
    authenticate();
  }, []);

  return (
    <BrowserRouter>
      <React.Suspense fallback={<SplashScreen />}>
        <Routes>
          <AppRoute isGuestOnly path="welcome" element={<SigninPage />} />
          <AppRoute isPrivate path="/" element={<MainPage />}>
            <Route path="/" element={<Navigate replace to="wallets" />} />
            <Route path="wallets" element={<WalletsPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="account" element={<AccountPage />} />
          </AppRoute>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};
