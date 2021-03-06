import React from 'react';
import PropTypes from 'prop-types';

import './Auth.css';

const auth = props => {
  const { children } = props;
  return <section className="auth-form">{children}</section>;
};

auth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default auth;
