import * as React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { RouteProps } from 'react-router';

import { PageLoader } from 'shared/components';
import { useAuthentication } from 'app/authentication';

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
  const { authenticationState } = useAuthentication();
  const {
    isAuthenticated,
    isAuthenticating,
    isSigningIn,
    message,
  } = authenticationState;

  if (isSigningIn) {
    return <PageLoader message={message} />;
  }

  if (isAuthenticating) {
    return <SplashScreen />;
  }

  if (isPrivate && !isAuthenticated) {
    return <Navigate to="/welcome" />;
  }

  if (isGuestOnly && isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Route {...restProps} />;
};
