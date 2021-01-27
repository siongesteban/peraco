import { useEffect } from 'react';
import { useUpdateAtom } from 'jotai/utils';

import { setUserAtom } from 'shared/atoms';
import { useService } from 'modules/app/service';

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
