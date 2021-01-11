import { useEffect } from 'react';

import { useService } from 'modules/app/hooks';

import { useAuthenticationAction } from '../contexts';

export const useAuthenticateEffect = (): void => {
  const authenticationAction = useAuthenticationAction();
  const { userService } = useService();

  const authenticate = async (): Promise<void> => {
    authenticationAction.startAuthentication();

    try {
      const user = await userService.authenticate();

      authenticationAction.setUser(user);
    } catch (e) {
      authenticationAction.setUser(null);
    }
  };

  useEffect(() => {
    authenticate();
  }, []);
};
