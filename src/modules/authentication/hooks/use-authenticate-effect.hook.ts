import { useEffect } from 'react';

import { FirebaseService } from 'shared/services/firebase';
import { useSnackbar } from 'modules/app/hooks';

import { useAuthenticationAction } from '../states';

export const useAuthenticateEffect = (): void => {
  const { setAuthenticationValues } = useAuthenticationAction();
  const { enqueueSnackbar } = useSnackbar();

  const firebaseService = FirebaseService.getInstance();

  const authenticate = async (): Promise<void> => {
    setAuthenticationValues({
      isAuthenticating: true,
      message: 'Waiting for response...',
    });

    try {
      const user = await firebaseService.authenticate();

      if (user) {
        setAuthenticationValues({
          user: { name: user.uid },
        });
      }
    } catch (e) {
      enqueueSnackbar({ message: e.message, variant: 'error' });
    } finally {
      setAuthenticationValues({ isAuthenticating: false });
    }
  };

  useEffect(() => {
    authenticate();
  }, []);
};
