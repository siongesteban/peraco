import firebase from 'firebase/app';

import { firebaseConfig } from './firebase.config';

export const firebaseClient = firebase.initializeApp(firebaseConfig);
