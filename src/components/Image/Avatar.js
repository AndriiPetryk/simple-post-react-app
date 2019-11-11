import React from 'react';
import PropTypes from 'prop-types';

import Image from './Image';
import './Avatar.css';

const avatar = ({ size, imageUrl }) => (
  <div className="avatar" style={{ width: size + 'rem', height: size + 'rem' }}>
    <Image imageUrl={imageUrl} />
  </div>
);

avatar.propTypes = {
  size: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default avatar;
