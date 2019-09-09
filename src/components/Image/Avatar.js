import React from 'react';

import Image from './Image';
import './Avatar.css';

const avatar = props => {
  const { size, image } = props;
  return (
    <div
      className="avatar"
      style={{ width: size + 'rem', height: size + 'rem' }}
    >
      <Image imageUrl={image} />
    </div>
  );
};

export default avatar;
