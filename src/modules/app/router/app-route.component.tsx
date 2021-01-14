import * as React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { RouteProps } from 'react-router';
import { useAtomValue } from 'jotai/utils';

import { authenticationStatusAtom } from 'modules/authentication';
import { Loader } from 'modules/app/loader';

import { SplashScreen } from '../splash-screen';

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

  return <Route {...restProps} />;
};