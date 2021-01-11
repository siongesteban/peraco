import { AuthProvider } from 'shared/types';
import { useService, useSnackbar } from 'modules/app/hooks';

import { useAuthenticationAction } from '../contexts';

export const useSignIn = (provider: AuthProvider): (() => Promise<void>) => {
  const { enqueueSnackbar } = useSnackbar();
  const authenticationAction = useAuthenticationAction();
  const { firebaseService, userService } = useService();

  const signIn = async (): Promise<void> => {
    authenticationAction.startSignin();

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
        authenticationAction.setUser(userFromDb);

        return;
      }

      const newUser = await userService.createUser({
        name: userFromFirebase.displayName as string,
        email: userFromFirebase.email as string,
        authId: userFromFirebase.uid,
        authProvider: provider,
      });

      authenticationAction.setUser(newUser);
    } catch (e) {
      authenticationAction.setUser(null);
      enqueueSnackbar({ message: e.message, variant: 'error' });
    }
  };

  return signIn;
};
