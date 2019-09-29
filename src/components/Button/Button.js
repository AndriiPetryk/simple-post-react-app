import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import './Button.css';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const button = props => {
  const {
    link,
    design,
    mode,
    onClick,
    disabled,
    loading,
    type,
    children,
  } = props;
  const classes = useStyles();
  return !link ? (
    <Button
      // className={classes.button}
      // className={['button', `button--${design}`, `button--${mode}`].join(' ')}
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? 'Loading...' : children}
    </Button>
  ) : (
    <Link
      className={['button', `button--${design}`, `button--${mode}`].join(' ')}
      to={link}
    >
      {children}
    </Link>
  );
};

button.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default button;
