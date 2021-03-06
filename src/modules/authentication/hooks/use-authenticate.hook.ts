import { useUpdateAtom } from 'jotai/utils';

import { useService } from 'system/service';
import { setUserAtom } from 'shared/atoms';

export const useAuthenticate = (): (() => Promise<void>) => {
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

  return authenticate;
};
