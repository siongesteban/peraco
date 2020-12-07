import { useNavigate } from 'react-router-dom';

import { FirebaseService } from 'shared/services/firebase';
import { useSnackbar } from 'modules/app/hooks';

import { useAuthenticationAction } from '../states';

export const useSignOut = (): (() => Promise<void>) => {
  const { enqueueSnackbar } = useSnackbar();
  const { setAuthenticationValues } = useAuthenticationAction();
  const navigate = useNavigate();

  const firebaseService = FirebaseService.getInstance();

  const signOut = async (): Promise<void> => {
    try {
      await firebaseService.signOut();

      setAuthenticationValues({
        user: null,
      });

      navigate('/welcome');
    } catch (e) {
      enqueueSnackbar({ message: e.message, variant: 'error' });
    }
  };

  return signOut;
};
