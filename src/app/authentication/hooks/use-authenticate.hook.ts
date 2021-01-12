import { useEffect } from 'react';

import { useService } from 'app/service';

import { useAuthentication } from '../authentication.context';

export const useAuthenticate = (): void => {
  const { authenticationDispatch } = useAuthentication();
  const { userService } = useService();

  const authenticate = async (): Promise<void> => {
    authenticationDispatch({ type: 'START_AUTH' });

    try {
      const user = await userService.authenticate();

      authenticationDispatch({ type: 'SET_USER', payload: { user } });
    } catch (e) {
      authenticationDispatch({ type: 'SET_USER', payload: { user: null } });
    }
  };

  useEffect(() => {
    authenticate();
  }, []);
};
