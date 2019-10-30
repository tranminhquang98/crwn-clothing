import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCjcW-WXIF9QzSEKVHqbOvLqdPNi1ZpODQ',
  authDomain: 'crwn-db-a546e.firebaseapp.com',
  databaseURL: 'https://crwn-db-a546e.firebaseio.com',
  projectId: 'crwn-db-a546e',
  storageBucket: 'crwn-db-a546e.appspot.com',
  messagingSenderId: '234073085237',
  appId: '1:234073085237:web:82d24db7df83be7608687c',
  measurementId: 'G-V1XNRY75GY'
};

firebase.initializeApp(config);

export const auth = firebase.auth(); //export when we need to use anything related to authentication
export const firestore = firebase.firestore();

//Set up Google Authentication Utility
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' }); //we want to always trigger the google popup whenever we use the GoogleAuthProvider for authentication and sign in
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
