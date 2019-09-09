export const sightUpHandlerFetch = ({ authData }) => {
  fetch('http://localhost:8080/auth/signup', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: authData.signupForm.email.value,
      password: authData.signupForm.password.value,
      name: authData.signupForm.name.value,
    }),
  })
    .then(res => {
      if (res.status === 422) {
        throw new Error(
          "Validation failed. Make sure the email address isn't used yet!",
        );
      }
      if (res.status !== 200 && res.status !== 201) {
        console.log('Error!');
        throw new Error('Creating a user failed!');
      }
      return res.json();
    })
    .then(resData => {
      console.log(resData);
      this.setState({ isAuth: false, authLoading: false });
      this.props.history.replace('/');
    })
    .catch(err => {
      console.log(err);
      this.setState({
        isAuth: false,
        authLoading: false,
        error: err,
      });
    });
};
