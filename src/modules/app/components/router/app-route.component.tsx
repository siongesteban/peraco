import * as React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { RouteProps } from 'react-router';

import { PageLoader } from 'shared/components';
import { useAuthenticationState } from 'modules/authentication/contexts';

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
  const {
    isAuthenticated,
    isAuthenticating,
    isSigningIn,
    message,
  } = useAuthenticationState();

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
