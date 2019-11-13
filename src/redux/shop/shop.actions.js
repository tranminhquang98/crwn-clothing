import ShopActionTypes from './shop.types';
import {
  firestore,
  convertCollectionSnapshotToMap
} from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
  //If redux-thunk middleware is enabled, any time you attempt to dispatch a function instead of an object, the MIDDLEWARE WILL CALL THAT FUNCTION with "dispatch" method itselft as the first argument so that we can dispatch multiple actions and handle asynchronous code inside of it
  return dispatch => {
    //Promise style, the caveat here is that the only time we'll ever get new data from our back end is when we remount our shop.component. This is because we're no longer leveraging the live updates stream style that the observable pattern lended us when we are using onSnapshot()
    const collectionRef = firestore.collection('collections');
    dispatch(fetchCollectionsStart());

    collectionRef
      .get()
      .then(snapshot => {
        const collectionsMap = convertCollectionSnapshotToMap(snapshot); //Takes the snapshot array of objects and perform data normalization
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch(error => dispatch(fetchCollectionsFailure(error.message)));
  };
};
