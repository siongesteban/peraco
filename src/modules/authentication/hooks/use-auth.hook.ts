import * as React from 'react';

import { FirebaseService } from 'shared/services/firebase';
import { AuthProvider } from 'shared/types';
import { AppContext } from 'modules/app/contexts';

import { UserContext } from '../contexts';

type UseAuth = (
  provider: AuthProvider,
) => {
  signIn: () => Promise<void>;
};

export const useAuth: UseAuth = (provider) => {
  const appContext = React.useContext(AppContext);
  const userContext = React.useContext(UserContext);
  const firebaseService = FirebaseService.getInstance();

  const signIn = async (): Promise<void> => {
    userContext.setValues({
      authenticating: true,
      message: 'Waiting for response...',
    });

    try {
      const user = await firebaseService.signIn({ with: provider });

      if (user) {
        userContext.setValues({
          authenticating: false,
          user: { name: user.uid },
        });
      }
    } catch (e) {
      appContext.enqueueErrorMessage(e.message);
    } finally {
      userContext.setValues({ authenticating: false });
    }
  };

  return { signIn };
};
