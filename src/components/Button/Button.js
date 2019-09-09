import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';
import PropTypes from 'prop-types';

const button = props => {
  const {
    link,
    design,
    mode,
    onClick,
    disabled,
    loading,
    type,
    children,
  } = props;
  console.log('props', props);
  return !link ? (
    <button
      className={['button', `button--${design}`, `button--${mode}`].join(' ')}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? 'Loading...' : children}
    </button>
  ) : (
    <Link
      className={['button', `button--${design}`, `button--${mode}`].join(' ')}
      to={link}
    >
      {children}
    </Link>
  );
};

button.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default button;
