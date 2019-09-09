import React from 'react';

import './MobileToggle.css';

const mobileToggle = props => {
  const { onOpen } = props;
  return (
    // eslint-disable-next-line react/button-has-type
    <button className="mobile-toggle" onClick={onOpen}>
      <span className="mobile-toggle__bar" />
      <span className="mobile-toggle__bar" />
      <span className="mobile-toggle__bar" />
    </button>
  );
};

export default mobileToggle;
