import API from '../util/api';
import Fetch from '../util/fetch';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
export const RECEIVE_LOGIN_ERROR = 'RECEIVE_LOGIN_ERROR';

const requestRewards = () => ({
  type: REQUEST_LOGIN,
});

const receiveLOGIN = data => ({
  type: RECEIVE_LOGIN,
  programLOGIN: data,
});

const receiveLOGINError = () => ({
  type: RECEIVE_LOGIN_ERROR,
});

export const fetchLogin = () => dispatch => {
  dispatch(requestRewards());
  return Fetch.get(API.login)
    .then(response => response.json())
    .then(json => dispatch(receiveLOGIN(json)))
    .catch(error => dispatch(receiveLOGINError()));
};
