import React from 'react';

export const loginHandlerFetch = authData => {
  console.log(authData);
  return fetch('http://localhost:5000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: authData.email,
      password: authData.password,
    }),
  })
    .then(res => {
      if (res.status === 422) {
        throw new Error('Validation failed.');
      }
      if (res.status !== 200 && res.status !== 201) {
        console.log('Error!');
        throw new Error('Could not authenticate you!');
      }
      return res.json();
    })
    .then(resData => {
      console.log(resData);
      this.setState({
        isAuth: true,
        token: resData.token,
        authLoading: false,
        userId: resData.userId,
      });
      localStorage.setItem('token', resData.token);
      localStorage.setItem('userId', resData.userId);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem('expiryDate', expiryDate.toISOString());
      this.setAutoLogout(remainingMilliseconds);
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
