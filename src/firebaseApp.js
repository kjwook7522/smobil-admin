import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDJshmUQK9Kk2oFncQVBdSrmTBllsHH4Xc',
  authDomain: 'ssmobility-cdc48.firebaseapp.com',
  projectId: 'ssmobility-cdc48',
  storageBucket: 'ssmobility-cdc48.appspot.com',
  messagingSenderId: '904707878349',
  appId: '1:904707878349:web:9f7350184b91e674906884',
  measurementId: 'G-TQEXEF0PGZ',
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
