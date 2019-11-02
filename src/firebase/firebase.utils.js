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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  //If userRef is empty then create a new user
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        //This method will actually create data in firebase's database
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (err) {
      console.log('error creating user', err.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth(); //Export when we need to use anything related to authentication
export const firestore = firebase.firestore();

//Set up Google Authentication Utility
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' }); //We want to always trigger the google popup whenever we use the GoogleAuthProvider for authentication and sign in
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
