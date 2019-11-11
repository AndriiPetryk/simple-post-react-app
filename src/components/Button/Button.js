import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Button.css';

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
  link: PropTypes.string.isRequired,
  design: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  loading: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default button;
