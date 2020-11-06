import firebase from 'firebase/app';

import { firebaseClient, googleAuthProvider } from '../firebase.client';

export const useFirebaseGoogleAuth = () => async (): Promise<firebase.User | null> => {
  try {
    const result = await firebaseClient
      .auth()
      .signInWithPopup(googleAuthProvider);

    console.log('google auth result', result);

    return result.user;
  } catch (e) {
    console.error('google auth error', e);

    return null;
  }
};
