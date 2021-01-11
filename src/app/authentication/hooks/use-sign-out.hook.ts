import { useNavigate } from 'react-router-dom';

import { useService } from 'app/service';
import { useSnackbar } from 'app/snackbar';

import { useAuthentication } from './use-authentication.hook';

export const useSignOut = (): (() => Promise<void>) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { authenticationAction } = useAuthentication();
  const { firebaseService } = useService();

  const signOut = async (): Promise<void> => {
    try {
      await firebaseService.signOut();

      authenticationAction.setUser(null);

      navigate('/welcome');
    } catch (e) {
      enqueueSnackbar({ message: e.message, variant: 'error' });
    }
  };

  return signOut;
};
