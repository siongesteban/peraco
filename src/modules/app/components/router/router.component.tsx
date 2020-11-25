import * as React from 'react';
import { BrowserRouter, Navigate, Routes } from 'react-router-dom';

import { SigninPage } from 'modules/authentication/pages';

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
    element: <>You are in the home page!</>,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
];

export const Router: React.FC = () => {
  const renderRoutes = (): React.ReactNode =>
    routes.map((route) => <AppRoute key={route.path} {...route} />);

  return (
    <BrowserRouter>
      <Routes>{renderRoutes()}</Routes>
    </BrowserRouter>
  );
};
