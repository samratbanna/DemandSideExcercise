import {call, put, fork, takeLatest} from 'redux-saga/effects';
import HomeActions from '../Home';
import {HomeTypes} from '../Home';

// import firebase from 'react-native-firebase';
var base64 = require('base-64');

function* requestMovie(api, action) {
  console.log("called");
  const response = yield call(api.moviesList);

  if (response.ok) {
    yield put(HomeActions.movieSuccess(response.data.data.allFilms.films));
  } else {
    yield put(HomeActions.movieFailure());
  }
}

function* watchProfileRequest(api) {
  yield takeLatest(HomeTypes.MOVIE_REQUEST, requestMovie, api);
}

export default function* homeSagas(api) {
  yield fork(watchProfileRequest, api);
}
