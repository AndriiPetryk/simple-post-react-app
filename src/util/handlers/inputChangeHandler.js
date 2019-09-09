export const inputChangeHandler = (input, value) => {
  this.setState(prevState => {
    let isValid = true;
    // eslint-disable-next-line no-restricted-syntax
    for (const validator of prevState.loginForm[input].validators) {
      isValid = isValid && validator(value);
    }
    const updatedForm = {
      ...prevState.loginForm,
      [input]: {
        ...prevState.loginForm[input],
        valid: isValid,
        value,
      },
    };
    let formIsValid = true;
    // eslint-disable-next-line guard-for-in
    for (const inputName in updatedForm) {
      formIsValid = formIsValid && updatedForm[inputName].valid;
    }
    return {
      loginForm: updatedForm,
      formIsValid,
    };
  });
};
