import React from 'react';

import './Input.css';

const filePicker = props => {
  const { id, label, valid, touched, onBlur, onChange } = props;
  return (
    <div className="input">
      <label htmlFor={id}>{label}</label>
      <input
        className={[
          !valid ? 'invalid' : 'valid',
          touched ? 'touched' : 'untouched',
        ].join(' ')}
        type="file"
        id={id}
        onChange={e => onChange(id, e.target.value, e.target.files)}
        onBlur={onBlur}
      />
    </div>
  );
};

export default filePicker;
