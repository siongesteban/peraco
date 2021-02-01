import { useUpdateAtom } from 'jotai/utils';

import { useService } from 'system/service';
import {
  authenticationStatusAtom,
  loaderMessageAtom,
  setUserAtom,
  setSnackbarMessageAtom,
} from 'shared/atoms';
import { AuthProvider } from 'shared/types';

export const useSignIn = (provider: AuthProvider): (() => Promise<void>) => {
  const { currencyService, firebaseService, userService } = useService();

  const setLoaderMessage = useUpdateAtom(loaderMessageAtom);
  const setAuthenticationStatus = useUpdateAtom(authenticationStatusAtom);
  const setSnackbarMessage = useUpdateAtom(setSnackbarMessageAtom);
  const setUser = useUpdateAtom(setUserAtom);

  const signIn = async (): Promise<void> => {
    setAuthenticationStatus('signingIn');
    setLoaderMessage('Signing in...');

    try {
      const userFromFirebase = await firebaseService.signIn({ with: provider });

      if (!userFromFirebase) {
        throw new Error('User does not exist in firebase.');
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

      await currencyService.loadCurrencies();

      setUser(user);
    } catch (e) {
      setUser(null);
      setSnackbarMessage({
        message: `Can't sign in. Please try again.`,
        error: e.message,
      });
    }
  };

  return signIn;
};
