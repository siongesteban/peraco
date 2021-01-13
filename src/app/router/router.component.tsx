import * as React from 'react';
import { BrowserRouter, Navigate, Routes } from 'react-router-dom';

import { SigninPage, useAuthenticate } from 'app/authentication';
import { WalletsPage } from 'app/wallets';

import { AppRoute, AppRouteProps } from './app-route.component';

const routes: AppRouteProps[] = [
  {
    path: 'welcome',
    isGuestOnly: true,
    element: <SigninPage />,
  },
  {
    path: '/',
    isPrivate: true,
    element: <WalletsPage />,
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
