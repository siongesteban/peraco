import { useEffect } from 'react';

import { UserService } from 'shared/services/rxdb';

import { useAuthenticationAction } from '../contexts';

export const useAuthenticateEffect = (): void => {
  const authenticationAction = useAuthenticationAction();

  const userService = UserService.getInstance();

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
