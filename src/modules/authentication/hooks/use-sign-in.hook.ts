import { useNavigate } from 'react-router-dom';

import { FirebaseService } from 'shared/services/firebase';
import { AuthProvider } from 'shared/types';
import { useSnackbar } from 'modules/app/hooks';

import { useAuthenticationAction } from '../contexts';

export const useSignIn = (provider: AuthProvider): (() => Promise<void>) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const authenticationAction = useAuthenticationAction();

  const firebaseService = FirebaseService.getInstance();

  const signIn = async (): Promise<void> => {
    authenticationAction.startSignin();

    try {
      if (!provider) {
        throw new Error('Auth provider is not provided.');
      }

      const user = await firebaseService.signIn({ with: provider });

      if (!user) {
        authenticationAction.setUser(null);
        enqueueSnackbar({ message: 'User was not found.', variant: 'error' });
        return;
      }

      authenticationAction.setUser({ name: user.uid });

      navigate('/');
    } catch (e) {
      authenticationAction.setUser(null);
      enqueueSnackbar({ message: e.message, variant: 'error' });
    }
  };

  return signIn;
};
