import { container, inject, injectable } from 'tsyringe';
import firebase from 'firebase/app';

import { googleAuthProvider, FIREBASE_CLIENT_TOKEN } from './firebase.client';

@injectable()
export class FirebaseService {
  constructor(
    @inject(FIREBASE_CLIENT_TOKEN)
    private readonly firebaseClient: firebase.app.App,
  ) {}

  public static getInstance(): FirebaseService {
    return container.resolve(FirebaseService);
  }

  public async authenticate(
    callback: (user: firebase.User | null) => void,
  ): Promise<void> {
    this.firebaseClient.auth().onAuthStateChanged((user) => {
      callback(user);
    });
  }

  public async signInWithGoogle(): Promise<firebase.User | null> {
    try {
      const result = await this.firebaseClient
        .auth()
        .signInWithPopup(googleAuthProvider);

      console.log('google auth result', result);

      return result.user;
    } catch (e) {
      console.error('google auth error', e);

      return null;
    }
  }
}
