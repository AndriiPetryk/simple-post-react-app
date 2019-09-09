import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';
import { required, length, email } from '../../util/validators';
import { inputChangeHandler } from '../../util/handlers/inputChangeHandler';
import Auth from './Auth';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      signupForm: {
        email: {
          value: '',
          valid: false,
          touched: false,
          validators: [required, email],
        },
        password: {
          value: '',
          valid: false,
          touched: false,
          validators: [required, length({ min: 5 })],
        },
        name: {
          value: '',
          valid: false,
          touched: false,
          validators: [required],
        },
        formIsValid: false,
      },
    };
  }

  inputBlurHandler = input => {
    this.setState(prevState => {
      return {
        signupForm: {
          ...prevState.signupForm,
          [input]: {
            ...prevState.signupForm[input],
            touched: true,
          },
        },
      };
    });
  };

  render() {
    const { onSignup, loading } = this.props;
    const { signupForm } = this.state;
    return (
      <Auth>
        <form onSubmit={event => onSignup(event, this.state)}>
          <Input
            id="email"
            label="Your E-Mail"
            type="email"
            control="input"
            onChange={inputChangeHandler}
            onBlur={this.inputBlurHandler}
            value={signupForm.email.value}
            valid={signupForm.email.valid}
            touched={signupForm.email.touched}
          />
          <Input
            id="name"
            label="Your Name"
            type="text"
            control="input"
            onChange={inputChangeHandler}
            onBlur={this.inputBlurHandler}
            value={signupForm.name.value}
            valid={signupForm.name.valid}
            touched={signupForm.name.touched}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            control="input"
            onChange={inputChangeHandler}
            onBlur={this.inputBlurHandler}
            value={signupForm.password.value}
            valid={signupForm.password.valid}
            touched={signupForm.password.touched}
          />
          <Button design="raised" type="submit" loading={loading}>
            Signup
          </Button>
        </form>
      </Auth>
    );
  }
}

Signup.propTypes = {
  loading: PropTypes.node.isRequired,
  onSignup: PropTypes.func.isRequired,
};

export default Signup;
