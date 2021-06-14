import {combineReducers} from 'redux';
import configureStore from './Configure';
import rootSaga from './Saga';

/* ------------- Assemble The Reducers ------------- */
const appReducer = combineReducers({
  home: require('./Home').reducer,
});

/*........................export reducers ........................ handle clearlogin */
export const reducers = (state, action) => {
  if (action.type == 'CLEAR_LOGIN') {
    state = undefined;
  } else if (action.type == 'SUCCESS_CHANGE_SCHOOL') {
    state = {user: state.user};
  }

  return appReducer(state, action);
};

export default () => {
  let {store, sagasManager, sagaMiddleware} = configureStore(
    reducers,
    rootSaga,
  );

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers;
      store.replaceReducer(nextRootReducer);

      const newYieldedSagas = require('./Saga').default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas);
      });
    });
  }

  return store;
};
