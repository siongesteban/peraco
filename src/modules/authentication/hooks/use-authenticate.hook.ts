import { useContext } from 'react';

import { FirebaseService } from 'shared/services/firebase';
import { AppContext } from 'modules/app/contexts';

import { UserContext } from '../contexts';

export const useAuthenticate = (): (() => Promise<void>) => {
  const appContext = useContext(AppContext);
  const userContext = useContext(UserContext);

  const firebaseService = FirebaseService.getInstance();

  const authenticate = async (): Promise<void> => {
    userContext.setValues({
      isAuthenticating: true,
      message: 'Waiting for response...',
    });

    try {
      const user = await firebaseService.authenticate();

      if (user) {
        userContext.setValues({
          user: { name: user.uid },
          isAuthenticated: true,
        });
      }
    } catch (e) {
      appContext.enqueueErrorMessage(e.message);
    } finally {
      userContext.setValues({ isAuthenticating: false });
    }
  };

  return authenticate;
};
