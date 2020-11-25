import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { FirebaseService } from 'shared/services/firebase';
import { AuthProvider } from 'shared/types';
import { AppContext } from 'modules/app/contexts';

import { UserContext } from '../contexts';

export const useSignIn = (provider: AuthProvider): (() => Promise<void>) => {
  const appContext = useContext(AppContext);
  const userContext = useContext(UserContext);

  const navigate = useNavigate();

  const firebaseService = FirebaseService.getInstance();

  const signIn = async (): Promise<void> => {
    userContext.setValues({
      isAuthenticating: true,
      message: 'Waiting for response...',
    });

    try {
      if (!provider) {
        throw new Error('Auth provider is not provided.');
      }

      const user = await firebaseService.signIn({ with: provider });

      if (user) {
        userContext.setValues({
          user: { name: user.uid },
          isAuthenticating: false,
          isAuthenticated: true,
        });

        navigate('/');
      }
    } catch (e) {
      appContext.enqueueErrorMessage(e.message);
    } finally {
      userContext.setValues({ isAuthenticating: false });
    }
  };

  return signIn;
};
