import * as React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { RouteProps } from 'react-router';

import { PageLoader } from 'shared/components';
import { UserContext } from 'modules/authentication/contexts';
import { useAuthenticate } from 'modules/authentication/hooks';

export type AppRouteProps = {
  isPrivate?: boolean;
  isGuestOnly?: boolean;
} & RouteProps;

export const AppRoute: React.FC<AppRouteProps> = ({
  isPrivate,
  isGuestOnly,
  ...restProps
}) => {
  const { isAuthenticating, isAuthenticated } = React.useContext(UserContext);
  const authenticate = useAuthenticate();

  React.useEffect(() => {
    authenticate();
  }, []);

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
