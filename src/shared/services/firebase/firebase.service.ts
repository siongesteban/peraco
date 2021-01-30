import { inject, injectable } from 'tsyringe';
import firebase from 'firebase/app';

import { AuthProvider } from 'shared/types';

import {
  facebookAuthProvider,
  googleAuthProvider,
  FIREBASE_CLIENT_TOKEN,
} from './firebase.client';

@injectable()
export class FirebaseService {
  constructor(
    @inject(FIREBASE_CLIENT_TOKEN)
    private readonly firebaseClient: firebase.app.App,
  ) {}

  public async authenticate(): Promise<firebase.User | null> {
    return new Promise((resolve) => {
      this.firebaseClient.auth().onAuthStateChanged((user) => {
        resolve(user);
      });
    });
  }

  public async signIn(params: {
    with: AuthProvider;
  }): Promise<firebase.User | null> {
    const authProvider =
      params.with === 'google' ? googleAuthProvider : facebookAuthProvider;

    try {
      const result = await this.firebaseClient
        .auth()
        .signInWithPopup(authProvider);

      return result.user;
    } catch (e) {
      let { message } = e;

      if (e.code === 'auth/popup-closed-by-user') {
        message = 'Authentication was cancelled.';
      }

      throw new Error(message);
    }
  }

  public async signOut(): Promise<void> {
    await this.firebaseClient.auth().signOut();
  }
}
