import React from 'react';

import { FirebaseService } from 'shared/services/firebase';
import { AppContext } from 'modules/app/contexts';

import { UserContext } from '../contexts';

type UseGoogleAuth = () => {
  signInWithGoogle: () => Promise<void>;
};

export const useGoogleAuth: UseGoogleAuth = () => {
  const appContext = React.useContext(AppContext);
  const userContext = React.useContext(UserContext);
  const firebaseService = FirebaseService.getInstance();

  const signInWithGoogle = async (): Promise<void> => {
    userContext.setValues({
      authenticating: true,
      message: 'Waiting for response...',
    });

    try {
      const user = await firebaseService.signInWithGoogle();

      if (!user) {
        return;
      }

      userContext.setValues({
        authenticating: false,
        user: { name: user.uid },
      });
    } catch (e) {
      appContext.enqueueErrorMessage(e.message);
    }

    userContext.setValues({ authenticating: false });
  };

  return { signInWithGoogle };
};
