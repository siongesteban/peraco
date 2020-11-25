import { container, inject, injectable } from 'tsyringe';
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

  public static getInstance(): FirebaseService {
    return container.resolve(FirebaseService);
  }

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

      console.log('google auth result', result);

      return result.user;
    } catch (e) {
      console.error('google auth error', e);

      let { message } = e;

      if (e.code === 'auth/popup-closed-by-user') {
        message = 'Authentication was cancelled.';
      }

      throw new Error(message);
    }
  }

  public signOut(): void {
    this.firebaseClient.auth().signOut();
  }
}
