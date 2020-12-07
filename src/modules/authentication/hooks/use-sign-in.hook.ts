import { useNavigate } from 'react-router-dom';

import { FirebaseService } from 'shared/services/firebase';
import { AuthProvider } from 'shared/types';
import { useSnackbar } from 'modules/app/hooks';

import { useAuthenticationAction } from '../states';

export const useSignIn = (provider: AuthProvider): (() => Promise<void>) => {
  const { setAuthenticationValues } = useAuthenticationAction();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const firebaseService = FirebaseService.getInstance();

  const signIn = async (): Promise<void> => {
    setAuthenticationValues({
      isAuthenticating: true,
      message: 'Waiting for response...',
    });

    try {
      if (!provider) {
        throw new Error('Auth provider is not provided.');
      }

      const user = await firebaseService.signIn({ with: provider });

      if (user) {
        setAuthenticationValues({
          user: { name: user.uid },
          isAuthenticating: false,
        });

        navigate('/');
      }
    } catch (e) {
      enqueueSnackbar({ message: e.message, variant: 'error' });
    } finally {
      setAuthenticationValues({ isAuthenticating: false });
    }
  };

  return signIn;
};
