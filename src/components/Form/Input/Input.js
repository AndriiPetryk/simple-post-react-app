import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const input = ({
  label,
  id,
  control,
  valid,
  touched,
  type,
  required,
  value,
  placeholder,
  onChange,
  onBlur,
  rows,
}) => (
  <div className="input">
    {label && <label htmlFor={id}>{label}</label>}
    {control === 'input' && (
      <input
        className={[
          !valid ? 'invalid' : 'valid',
          touched ? 'touched' : 'untouched',
        ].join(' ')}
        type={type}
        id={id}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(id, e.target.value, e.target.files)}
        onBlur={onBlur}
      />
    )}
    {control === 'textarea' && (
      <textarea
        className={[
          !valid ? 'invalid' : 'valid',
          touched ? 'touched' : 'untouched',
        ].join(' ')}
        id={id}
        rows={rows}
        required={required}
        value={value}
        onChange={e => onChange(id, e.target.value)}
        onBlur={onBlur}
      />
    )}
  </div>
);

input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  control: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  valid: PropTypes.bool.isRequired,
  rows: PropTypes.number.isRequired,
  required: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default input;
