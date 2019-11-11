import React from 'react';
import PropTypes from 'prop-types';

import './Input.css';

const filePicker = ({ id, label, valid, touched, onChange, onBlur }) => (
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

filePicker.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  valid: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default filePicker;
