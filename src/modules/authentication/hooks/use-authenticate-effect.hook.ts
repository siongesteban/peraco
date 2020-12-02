import { useEffect } from 'react';

import { FirebaseService } from 'shared/services/firebase';
import { useAppErrorAction } from 'modules/app/states';

import { useAuthenticationAction } from '../states';

export const useAuthenticateEffect = (): void => {
  const { setAppError } = useAppErrorAction();
  const { setAuthenticationValues } = useAuthenticationAction();

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
      setAppError({ message: e.message, error: e });
    } finally {
      setAuthenticationValues({ isAuthenticating: false });
    }
  };

  useEffect(() => {
    authenticate();
  }, []);
};
