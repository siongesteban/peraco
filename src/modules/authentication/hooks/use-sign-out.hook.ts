import { useNavigate } from 'react-router-dom';
import { useUpdateAtom } from 'jotai/utils';

import { useService } from 'system/service';
import { setUserAtom, setSnackbarMessageAtom } from 'shared/atoms';

export const useSignOut = (): (() => Promise<void>) => {
  const navigate = useNavigate();
  const { userService } = useService();
  const setUser = useUpdateAtom(setUserAtom);
  const setSnackbarMessage = useUpdateAtom(setSnackbarMessageAtom);

  const signOut = async (): Promise<void> => {
    try {
      await userService.signOut();

      setUser(null);
      navigate('/welcome', { replace: true });
    } catch (e) {
      setSnackbarMessage({
        message: 'Something went wrong while signing out.',
        error: e.message,
      });
    }
  };

  return signOut;
};
