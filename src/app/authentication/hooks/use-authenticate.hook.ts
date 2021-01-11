import { useEffect } from 'react';

import { useService } from 'app/service';

import { useAuthentication } from './use-authentication.hook';

export const useAuthenticate = (): void => {
  const { authenticationAction } = useAuthentication();
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
