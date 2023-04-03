import { all } from 'redux-saga/effects';
import { watchAddUserSaga, watchGetUserSaga } from './userSlide';

export default function* rootSaga() {
  yield all([watchAddUserSaga(), watchGetUserSaga()]);
}