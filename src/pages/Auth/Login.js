import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';
import { required, length, email } from '../../util/validators';
// import { inputChangeHandler } from '../../util/handlers/inputChangeHandler';
import Auth from './Auth';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      loginForm: {
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
        formIsValid: false,
      },
    };
  }

  inputChangeHandler = (input, value) => {
    this.setState(prevState => {
      let isValid = true;
      for (const validator of prevState.loginForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.loginForm,
        [input]: {
          ...prevState.loginForm[input],
          valid: isValid,
          value: value,
        },
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      return {
        loginForm: updatedForm,
        formIsValid: formIsValid,
      };
    });
  };

  inputBlurHandler = input => {
    this.setState(prevState => {
      return {
        loginForm: {
          ...prevState.loginForm,
          [input]: {
            ...prevState.loginForm[input],
            touched: true,
          },
        },
      };
    });
  };

  render() {
    const { onLogin, loading } = this.props;
    const { loginForm } = this.state;
    const { email, password } = loginForm;
    return (
      <Auth>
        <form
          onSubmit={event =>
            onLogin(event, {
              email: email.value,
              password: password.value,
            })
          }
        >
          <Input
            id="email"
            label="Your E-Mail"
            type="email"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, 'email')}
            value={loginForm.email.value}
            valid={loginForm.email.valid}
            touched={loginForm.email.touched}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            control="input"
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler.bind(this, 'password')}
            value={loginForm.password.value}
            valid={loginForm.password.valid}
            touched={loginForm.password.touched}
          />
          <Button design="raised" type="submit" loading={loading}>
            Login
          </Button>
        </form>
      </Auth>
    );
  }
}

Login.propTypes = {
  loading: PropTypes.node.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default Login;
