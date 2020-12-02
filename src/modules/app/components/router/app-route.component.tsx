import * as React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { RouteProps } from 'react-router';

import { PageLoader } from 'shared/components';
import { useAuthenticateEffect } from 'modules/authentication/hooks';
import { useAuthenticationState } from 'modules/authentication/states';

export type AppRouteProps = {
  isPrivate?: boolean;
  isGuestOnly?: boolean;
} & RouteProps;

export const AppRoute: React.FC<AppRouteProps> = ({
  isPrivate,
  isGuestOnly,
  ...restProps
}) => {
  const { isAuthenticating, isAuthenticated } = useAuthenticationState();

  useAuthenticateEffect();

  if (isAuthenticating) {
    return <PageLoader />;
  }

  if (isPrivate && !isAuthenticated) {
    return <Navigate to="welcome" />;
  }

  if (isGuestOnly && isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Route {...restProps} />;
};
