import React from 'react';

import './Image.css';

const image = props => {
  const { imageUrl, contain, left } = props;
  return (
    <div
      className="image"
      style={{
        backgroundImage: `url('${imageUrl}')`,
        backgroundSize: contain ? 'contain' : 'cover',
        backgroundPosition: left ? 'left' : 'center',
      }}
    />
  );
};

export default image;
