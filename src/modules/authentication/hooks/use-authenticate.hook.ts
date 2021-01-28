import { useEffect } from 'react';
import { useUpdateAtom } from 'jotai/utils';

import { useService } from 'system/service';
import { setUserAtom } from 'shared/atoms';

export const useAuthenticate = (): void => {
  const { userService } = useService();
  const setUser = useUpdateAtom(setUserAtom);

  const authenticate = async (): Promise<void> => {
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
