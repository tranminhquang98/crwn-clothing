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

//Automatically import data from an object to firestore
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey); //Get the collectionRef

  //We want to know that if we hit our addCollectionAndDocuments function and all of our requests send, all of them should set(the data). If any of them fail, we want the whole thing to fail because then we can anticipate that, we know that our code is consistent.
  const batch = firestore.batch();
  //batch() write is essentially a way to batch or group all our calls together into one big request. The batch object we just add all of our set() into it and then we fire off whenever we're done adding all the calls we want to it

  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc(); //Create a new document reference at this collection and randomly generate an Id
    batch.set(newDocRef, obj);
  });

  return await batch.commit(); //.commit() will fire off our batch request, it returns back a promise. When commit succeeds it will resolve a null value
};

export const convertCollectionSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()), //Pass the method some string and it'll give you back a string where any characters that a URL cannot actually handle or process such as certain symbols spaces or whatever that you actually never see in a URL, it will make sure to convert them into a version that the URL can actually read
      id: doc.id,
      title,
      items
    };
  });
  //What we did here is get all the documents in the "collections" and map over it, destructuring the title and items array, then return a new object with routeName and id append to it for our front end. Finally, a new array with the newly created objects will be used

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
  //To transform the array into an object where each key is the title of the document, similar to what we've in shop.data
};

export const auth = firebase.auth(); //Export when we need to use anything related to authentication
export const firestore = firebase.firestore();

//Set up Google Authentication Utility
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' }); //We want to always trigger the google popup whenever we use the GoogleAuthProvider for authentication and sign in
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
