import {all} from 'redux-saga/effects';
import API from '../Services/Api';

/* ------------- Sagas ------------- */

import homeSagas from './Home/saga';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along

let api = API.createApiClient();

export {api as ApiClient};

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield all([homeSagas(api)]);
}
