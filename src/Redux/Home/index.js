import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

export const STATUS = {
  SUCCESS: 'SUCCESS',
  NOT_STARTED: 'NOT_STARTED',
  FETCHING: 'FETCHING',
  FAILED: 'FAILED',
};

const {Types, Creators} = createActions({
  movieRequest: [],
  movieSuccess: ['data'],
  movieFailure: null,
});

export const HomeTypes = Types;

export default Creators;

export const INITIAL_STATE = Immutable({
  status: STATUS.NOT_STARTED,
});

export const request = state =>
  state.merge({
    status: STATUS.FETCHING,
  });

export const success = (state, action) => {
  console.log('actions', action);
  return state.merge({
    status: STATUS.SUCCESS,
    movies: action.data,
  });
};

export const failure = state =>
  state.merge({error: true, status: STATUS.FAILED});

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.MOVIE_REQUEST]: request,
  [Types.MOVIE_SUCCESS]: success,
  [Types.MOVIE_FAILURE]: failure,
});
