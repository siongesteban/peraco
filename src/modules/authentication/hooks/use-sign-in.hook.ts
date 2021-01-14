import { useUpdateAtom } from 'jotai/utils';

import { AuthProvider } from 'shared/types';
import { loaderMessageAtom } from 'modules/app/loader';
import { useService } from 'modules/app/service';
import { useSnackbar } from 'modules/app/snackbar';

import { authenticationStatusAtom, setUserAtom } from '../atoms';

export const useSignIn = (provider: AuthProvider): (() => Promise<void>) => {
  const { enqueueSnackbar } = useSnackbar();
  const { currencyService, firebaseService, userService } = useService();

  const setLoaderMessage = useUpdateAtom(loaderMessageAtom);
  const setAuthenticationStatus = useUpdateAtom(authenticationStatusAtom);
  const setUser = useUpdateAtom(setUserAtom);

  const signIn = async (): Promise<void> => {
    setAuthenticationStatus('signingIn');
    setLoaderMessage('Signing in...');

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

      await currencyService.loadCurrencies();

      setUser(user);
    } catch (e) {
      setUser(null);
      enqueueSnackbar({ message: e.message, variant: 'error' });
    }
  };

  return signIn;
};
