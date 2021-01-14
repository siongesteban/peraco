import { useEffect } from 'react';
import { useUpdateAtom } from 'jotai/utils';

import { useService } from 'modules/app/service';

import { authenticationStatusAtom, setUserAtom } from '../atoms';

export const useAuthenticate = (): void => {
  const { userService } = useService();
  const setAuthenticationStatus = useUpdateAtom(authenticationStatusAtom);
  const setUser = useUpdateAtom(setUserAtom);

  const authenticate = async (): Promise<void> => {
    setAuthenticationStatus('authenticating');

    try {
      const user = await userService.authenticate();

      setUser(user);
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    authenticate();
  }, []);
};
