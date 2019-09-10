import {
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  RECEIVE_LOGIN_ERROR,
} from '../actions/login';

const defaultState = {
  isFetching: false,
  login: null,
  error: false,
};

export default function companyLOGIN(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case RECEIVE_LOGIN:
      return {
        ...state,
        isFetching: false,
        LOGIN: action,
      };
    case RECEIVE_LOGIN_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
}
