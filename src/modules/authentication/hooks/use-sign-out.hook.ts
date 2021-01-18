import { useNavigate } from 'react-router-dom';
import { useUpdateAtom } from 'jotai/utils';

import { setUserAtom, setSnackbarMessageAtom } from 'shared/atoms';
import { useService } from 'modules/app/service';

export const useSignOut = (): (() => Promise<void>) => {
  const navigate = useNavigate();
  const { firebaseService } = useService();
  const setUser = useUpdateAtom(setUserAtom);
  const setSnackbarMessage = useUpdateAtom(setSnackbarMessageAtom);

  const signOut = async (): Promise<void> => {
    try {
      await firebaseService.signOut();

      setUser(null);
      navigate('/welcome', { replace: true });
    } catch (e) {
      setSnackbarMessage({ message: e.message });
    }
  };

  return signOut;
};
