import * as React from 'react';
import { BrowserRouter, Navigate, Routes } from 'react-router-dom';

import { useSignOut } from 'modules/authentication/hooks';
import { SigninPage } from 'modules/authentication/pages';

import { useAppErrorEffect, useStateDevTools } from '../../hooks';
import { AppRoute, AppRouteProps } from './app-route.component';

const Index: React.FC = () => {
  const signOut = useSignOut();

  return (
    <div>
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
    </div>
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
  useStateDevTools();
  useAppErrorEffect();

  const renderRoutes = (): React.ReactNode =>
    routes.map((route) => <AppRoute key={route.path} {...route} />);

  return (
    <BrowserRouter>
      <Routes>{renderRoutes()}</Routes>
    </BrowserRouter>
  );
};
