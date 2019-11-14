import { all, call } from 'redux-saga/effects';
import { fetchCollectionsStart } from './shop/shop.sagas';

export default function* rootSaga() {
  yield all([call(fetchCollectionsStart)]); //all gets an array of sagas that we invoke concurrently
}
