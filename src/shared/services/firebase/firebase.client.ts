import firebase from 'firebase/app';
import 'firebase/auth';

import { firebaseConfig } from './firebase.config';

export const firebaseClient = firebase.initializeApp(firebaseConfig);

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
