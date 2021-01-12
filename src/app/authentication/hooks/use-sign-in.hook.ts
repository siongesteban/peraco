import { AuthProvider } from 'shared/types';
import { useService } from 'app/service';
import { useSnackbar } from 'app/snackbar';

import { useAuthentication } from '../authentication.context';

export const useSignIn = (provider: AuthProvider): (() => Promise<void>) => {
  const { enqueueSnackbar } = useSnackbar();
  const { authenticationDispatch } = useAuthentication();
  const { firebaseService, userService } = useService();

  const signIn = async (): Promise<void> => {
    authenticationDispatch({ type: 'START_SIGNIN' });

    try {
      if (!provider) {
        throw new Error('Auth provider is not provided.');
      }

      const userFromFirebase = await firebaseService.signIn({ with: provider });

      if (!userFromFirebase) {
        throw new Error('Something went wrong with the authentication.');
      }

      const userFromDb = await userService.getUserByAuthId(
        userFromFirebase.uid,
      );

      if (userFromDb) {
        authenticationDispatch({
          type: 'SET_USER',
          payload: { user: userFromDb },
        });

        return;
      }

      const newUser = await userService.createUser({
        name: userFromFirebase.displayName as string,
        email: userFromFirebase.email as string,
        authId: userFromFirebase.uid,
        authProvider: provider,
      });

      authenticationDispatch({
        type: 'SET_USER',
        payload: { user: newUser },
      });
    } catch (e) {
      authenticationDispatch({
        type: 'SET_USER',
        payload: { user: null },
      });
      enqueueSnackbar({ message: e.message, variant: 'error' });
    }
  };

  return signIn;
};
