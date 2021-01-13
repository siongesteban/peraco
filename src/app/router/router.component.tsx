import * as React from 'react';
import { BrowserRouter, Navigate, Routes } from 'react-router-dom';

import { SigninPage, useAuthenticate, useSignOut } from 'app/authentication';
import { MainLayout } from 'app/layout';

import { AppRoute, AppRouteProps } from './app-route.component';

const Index: React.FC = () => {
  const signOut = useSignOut();

  return (
    <MainLayout title="Wallets">
      Hey there!
      <div>
        <button
          onClick={(): void => {
            signOut();
          }}
        >
          Sign Out
        </button>
      </div>
    </MainLayout>
  );
};

const routes: AppRouteProps[] = [
  {
    path: 'welcome',
    isGuestOnly: true,
    element: <SigninPage />,
  },
  {
    path: '/',
    isPrivate: true,
    element: <Index />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
];

export const Router: React.FC = () => {
  useAuthenticate();

  const renderRoutes = (): React.ReactNode =>
    routes.map((route) => <AppRoute key={route.path} {...route} />);

  return (
    <BrowserRouter>
      <Routes>{renderRoutes()}</Routes>
    </BrowserRouter>
  );
};
