import { combineReducers } from 'redux';
import { isEmpty } from 'lodash';

import login from './login';

const rootReducer = combineReducers({
  login,
});

export default rootReducer;

const getStatePieceByKey = (state, stateKey) => {
  var parts = stateKey.split('/');
  state = state.rootReducer;

  for (var i = 0, n = parts.length; i < n; ++i) {
    var key = parts[i];
    if (key in state) {
      state = state[key];
    } else {
      return;
    }
  }
  return state;
};

export const getIsFetching = (state, stateKey) => {
  return getStatePieceByKey(state, stateKey).isFetching;
};

export const getHasError = (state, stateKey) => {
  return getStatePieceByKey(state, stateKey).hasError;
};

export const getLoadData = (state, stateKey) => {
  return getStatePieceByKey(state, stateKey)[`${stateKey}Data`];
};

export const getIsReceived = (state, stateKey) => {
  const data = getLoadData(state, stateKey);
  return !isEmpty(data);
};

export const getIsShouldLoad = (state, stateKey) => {
  const isFetching = getIsFetching(state, stateKey);
  const isReceived = getIsReceived(state, stateKey);
  return !isFetching && !isReceived;
};
