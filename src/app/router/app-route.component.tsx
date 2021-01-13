import * as React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { RouteProps } from 'react-router';

import { PageLoader } from 'shared/components';
import { useAuthentication } from 'app/authentication';

import { SplashScreen } from '../splash-screen';

export type AppRouteProps = {
  isPrivate?: boolean;
  isGuestOnly?: boolean;
  layout?: React.FC;
} & RouteProps;

export const AppRoute: React.FC<AppRouteProps> = ({
  isPrivate,
  isGuestOnly,
  layout: Layout,
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

  if (Layout) {
    return (
      <Route {...restProps} element={<Layout>{restProps.element}</Layout>} />
    );
  }

  return <Route {...restProps} />;
};
