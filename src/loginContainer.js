import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
// import _ from 'lodash';
import App from './App';
import { fetchLogin } from '../../actions/login';

import {
  getIsFetching,
  getHasError,
  getIsShouldLoad,
  getLoadData,
} from '../reducers/rootReducer';

const mapDispatchToProps = dispatch => ({
  fetchLogin: () => {
    dispatch(fetchLogin());
  },
});

const mapStateToProps = (state, ownProps) => {
  console.log('state', state);
  return {};
};

const LoginContainer = compose(withRouter)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);

export default LoginContainer;
