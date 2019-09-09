import React from 'react';

import './Input.css';

const input = props => {
  const {
    label,
    id,
    control,
    valid,
    touched,
    type,
    value,
    placeholder,
    onBlur,
    rows,
    required,
    onChange,
  } = props;
  return (
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
          onChange={event => {
            const {
              target: { value: targetValue, files },
            } = event;
            onChange(id, targetValue, files);
          }}
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
          onChange={event => {
            const { target: targetValue } = event;
            onChange(id, targetValue);
          }}
          onBlur={onBlur}
        />
      )}
    </div>
  );
};

export default input;
