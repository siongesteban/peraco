import { firebaseClient, googleAuthProvider } from '../firebase.client';

export const useFirebaseGoogleAuth = () => async (): Promise<void> => {
  try {
    const result = await firebaseClient
      .auth()
      .signInWithPopup(googleAuthProvider);

    console.log('google auth result', result);
  } catch (e) {
    console.error('google auth error', e);
  }
};
