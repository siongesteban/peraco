import { AuthProvider } from 'shared/types';
import { useService } from 'modules/app/service';
import { useSnackbar } from 'modules/app/snackbar';

import { useAuthentication } from '../authentication.context';

export const useSignIn = (provider: AuthProvider): (() => Promise<void>) => {
  const { enqueueSnackbar } = useSnackbar();
  const { authenticationDispatch } = useAuthentication();
  const { currencyService, firebaseService, userService } = useService();

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

      let user = await userService.getUserByAuthId(userFromFirebase.uid);

      if (!user) {
        user = await userService.createUser({
          name: userFromFirebase.displayName as string,
          email: userFromFirebase.email as string,
          authId: userFromFirebase.uid,
          authProvider: provider,
        });
      }

      authenticationDispatch({
        type: 'SET_MESSAGE',
        payload: { message: 'Loading data...' },
      });

      await currencyService.loadCurrencies();

      authenticationDispatch({
        type: 'SET_USER',
        payload: { user },
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
