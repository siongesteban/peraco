import { useNavigate } from 'react-router-dom';
import { useUpdateAtom } from 'jotai/utils';

import { setUserAtom } from 'shared/atoms';
import { useService } from 'modules/app/service';
import { useSnackbar } from 'modules/app/snackbar';

export const useSignOut = (): (() => Promise<void>) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { firebaseService } = useService();
  const setUser = useUpdateAtom(setUserAtom);

  const signOut = async (): Promise<void> => {
    try {
      await firebaseService.signOut();

      setUser(null);
      navigate('/welcome');
    } catch (e) {
      enqueueSnackbar({ message: e.message, variant: 'error' });
    }
  };

  return signOut;
};
