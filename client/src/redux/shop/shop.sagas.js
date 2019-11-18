import { takeLatest, call, put, all } from 'redux-saga/effects'; //It listens for every action of a specific type that we pass to it
import {
  firestore,
  convertCollectionSnapshotToMap
} from '../../firebase/firebase.utils';
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from './shop.actions';
import ShopActionTypes from './shop.types';

//What this saga does with the effect is it's going to pause whenever a specific action type that we want comes in, so we have to make sure to yield our function
export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get(); //Similar to async await
    const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot);
    //Because it could potentially take a while before this method is completed we use the call function. Because we use call it's possible to use yield on the function. call() is a method that takes as its first argument some function or method and then the subsequent arguments will be the parameters that you passed into that function/method
    yield put(fetchCollectionsSuccess(collectionsMap));
    //sagas do not dispatch actions using the dispatch keyword, instead they use another effect called put. put() is the saga effect for creating action and it's exactly like dispatch. The only difference is we have to yield it.
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    //takeLastest actually creates a non blocking call in order to not stop our application to continue running either other sagas or whatever the user wants to do and will cancel every previous spawn saga that was generated except for the lastest one
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
  //the 2nd paramater that takeEvery gets is another generator function that will run in response to this takeLastest listener
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}

//What's happening is that we're yielding control over this saga back to the saga middleware, and the saga middleware, if it gets another takeEvery action call from the same place, it can then determine whether or not to cancel any of the previously started sagas from the other actions that came in.
