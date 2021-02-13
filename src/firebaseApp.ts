import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDJshmUQK9Kk2oFncQVBdSrmTBllsHH4Xc',
  authDomain: 'ssmobility-cdc48.firebaseapp.com',
  projectId: 'ssmobility-cdc48',
  storageBucket: 'ssmobility-cdc48.appspot.com',
  messagingSenderId: '904707878349',
  appId: '1:904707878349:web:9f7350184b91e674906884',
  measurementId: 'G-TQEXEF0PGZ',
};

const app = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const authService = firebase.auth(app);
export const storeService = firebase.firestore(app);

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
export type User = firebase.User;