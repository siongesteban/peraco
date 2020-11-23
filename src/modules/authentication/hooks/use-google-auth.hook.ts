import React from 'react';

import { FirebaseService } from 'shared/services/firebase';

import { UserContext } from '../contexts';

type UseGoogleAuth = () => {
  signInWithGoogle: () => Promise<void>;
};

export const useGoogleAuth: UseGoogleAuth = () => {
  const userContext = React.useContext(UserContext);
  const firebaseService = FirebaseService.getInstance();

  const signInWithGoogle = async (): Promise<void> => {
    userContext.setValues({
      authenticating: true,
      message: 'Waiting for response...',
    });

    const user = await firebaseService.signInWithGoogle();

    if (!user) {
      return userContext.setValues({ authenticating: false });
    }

    userContext.setValues({
      authenticating: false,
      user: { name: user.uid },
    });
  };

  return { signInWithGoogle };
};
