import { useNavigate } from 'react-router-dom';

import { useService, useSnackbar } from 'modules/app/hooks';

import { useAuthenticationAction } from '../contexts';

export const useSignOut = (): (() => Promise<void>) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const authenticationAction = useAuthenticationAction();
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
