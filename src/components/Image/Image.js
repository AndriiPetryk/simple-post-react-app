import React from 'react';
import PropTypes from 'prop-types';

import './Image.css';

const image = ({ imageUrl, contain, left }) => (
  <div
    className="image"
    style={{
      backgroundImage: `url('${imageUrl}')`,
      backgroundSize: contain ? 'contain' : 'cover',
      backgroundPosition: left ? 'left' : 'center',
    }}
  />
);

image.propTypes = {
  contain: PropTypes.bool.isRequired,
  left: PropTypes.bool.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default image;
