import React from 'react';
import PropTypes from 'prop-types';

import './MobileToggle.css';

const mobileToggle = ({ onOpen }) => (
  // eslint-disable-next-line react/button-has-type
  <button className="mobile-toggle" onClick={onOpen}>
    <span className="mobile-toggle__bar" />
    <span className="mobile-toggle__bar" />
    <span className="mobile-toggle__bar" />
  </button>
);

mobileToggle.propTypes = {
  onOpen: PropTypes.func.isRequired.isRequired,
};

export default mobileToggle;
