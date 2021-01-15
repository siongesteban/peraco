import * as React from 'react';
import { useLocation, Route, Navigate } from 'react-router-dom';
import { RouteProps } from 'react-router';
import { useAtomValue } from 'jotai/utils';

import { authenticationStatusAtom } from 'shared/atoms';

import { Loader } from './loader.component';
import { SplashScreen } from './splash-screen.component';

export type AppRouteProps = {
  isPrivate?: boolean;
  isGuestOnly?: boolean;
} & RouteProps;

export const AppRoute: React.FC<AppRouteProps> = ({
  isPrivate,
  isGuestOnly,
  ...restProps
}) => {
  const authenticationStatus = useAtomValue(authenticationStatusAtom);
  const location = useLocation();

  if (authenticationStatus === 'signingIn') {
    return <Loader />;
  }

  if (authenticationStatus === 'authenticating') {
    return <SplashScreen />;
  }

  const authenticated = authenticationStatus === 'authenticated';

  if (isPrivate && !authenticated) {
    return <Navigate to="/welcome" />;
  }

  if (isGuestOnly && authenticated) {
    return <Navigate to="/" />;
  }

  if (location.pathname === '/') {
    return <Navigate to="/wallets" />;
  }

  return <Route {...restProps} />;
};
