import { container } from 'tsyringe';
import firebase from 'firebase/app';
import 'firebase/auth';

import { firebaseConfig } from './firebase.config';

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const FIREBASE_CLIENT_TOKEN = 'FIREBASE_CLIENT';

container.register(FIREBASE_CLIENT_TOKEN, {
  useValue: firebase.initializeApp(firebaseConfig),
});
