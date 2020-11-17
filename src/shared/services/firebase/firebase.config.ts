/* eslint-disable no-undef */
import { object, string } from 'yup';

type FirebaseConfig = {
  apiKey: string;
  appId: string;
  authDomain: string;
  databaseUrl: string;
  messagingSenderId: string;
  projectId: string;
  storageBucket: string;
};

const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseUrl: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
};

object<FirebaseConfig>({
  apiKey: string().required(),
  appId: string().required(),
  authDomain: string().required(),
  databaseUrl: string().url().required(),
  messagingSenderId: string().required(),
  projectId: string().required(),
  storageBucket: string().required(),
}).validateSync(firebaseConfig, { abortEarly: false });

export { firebaseConfig };
