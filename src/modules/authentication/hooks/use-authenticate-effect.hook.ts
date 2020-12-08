import { useEffect } from 'react';

import { FirebaseService } from 'shared/services/firebase';
import { useSnackbar } from 'modules/app/hooks';

import { useAuthenticationAction } from '../contexts';

export const useAuthenticateEffect = (): void => {
  const { enqueueSnackbar } = useSnackbar();
  const authenticationAction = useAuthenticationAction();

  const firebaseService = FirebaseService.getInstance();

  const authenticate = async (): Promise<void> => {
    authenticationAction.startAuthentication();

    try {
      const user = await firebaseService.authenticate();

      authenticationAction.setUser(user ? { name: user.uid } : null);
    } catch (e) {
      enqueueSnackbar({ message: e.message, variant: 'error' });
    }
  };

  useEffect(() => {
    authenticate();
  }, []);
};
