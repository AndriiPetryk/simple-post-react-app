import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

// import { loginHandlerFetch } from './util/loginHandler';
// import { sightUpHandlerFetch } from './util/signUpHandler';
import Layout from './components/Layout/Layout';
import Backdrop from './components/Backdrop/Backdrop';
import Toolbar from './components/Toolbar/Toolbar';
import MainNavigation from './components/Navigation/MainNavigation/MainNavigation';
import MobileNavigation from './components/Navigation/MobileNavigation/MobileNavigation';
import ErrorHandler from './components/ErrorHandler/ErrorHandler';
import FeedPage from './pages/Feed/Feed';
import SinglePostPage from './pages/Feed/SinglePost/SinglePost';
import LoginPage from './pages/Auth/Login';
import SignupPage from './pages/Auth/Signup';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showBackdrop: false,
      showMobileNav: false,
      isAuth: false,
      token: null,
      userId: null,
      authLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
    const userId = localStorage.getItem('userId');
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({ isAuth: true, token, userId });
    this.setAutoLogout(remainingMilliseconds);
  }

  mobileNavHandler = isOpen => {
    this.setState({ showMobileNav: isOpen, showBackdrop: isOpen });
  };

  backdropClickHandler = () => {
    this.setState({ showBackdrop: false, showMobileNav: false, error: null });
  };

  logoutHandler = () => {
    this.setState({ isAuth: false, token: null });
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
  };

  loginHandler = (event, authData) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    axios({
      method: 'POST',
      url: 'http://localhost:5000/auth/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
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
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds,
        );
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

  signupHandler = (event, authData) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    fetch('http://localhost:5000/auth/signup', {
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
        const { history } = this.props;
        this.setState({ isAuth: false, authLoading: false });
        // eslint-disable-next-line react/prop-types
        history.replace('/');
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

  setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  errorHandler = () => {
    this.setState({ error: null });
  };

  render() {
    const {
      authLoading,
      showMobileNav,
      showBackdrop,
      isAuth,
      userId,
      token,
      error,
    } = this.state;
    let routes = (
      <Switch>
        <Route
          path="/"
          exact
          render={props => (
            <LoginPage
              {...props}
              onLogin={this.loginHandler}
              loading={authLoading}
            />
          )}
        />
        <Route
          path="/signup"
          exact
          render={props => (
            <SignupPage
              {...props}
              onSignup={this.signupHandler}
              loading={authLoading}
            />
          )}
        />
        <Redirect to="/" />
      </Switch>
    );
    if (isAuth) {
      routes = (
        <Switch>
          <Route
            path="/"
            exact
            render={() => <FeedPage userId={userId} token={token} />}
          />
          <Route
            path="/:postId"
            render={props => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <SinglePostPage {...props} userId={userId} token={token} />
            )}
          />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <>
        {showBackdrop && <Backdrop onClick={this.backdropClickHandler} />}
        <ErrorHandler error={error} onHandle={this.errorHandler} />
        <Layout
          header={
            <Toolbar>
              <MainNavigation
                onOpenMobileNav={this.mobileNavHandler}
                onLogout={this.logoutHandler}
                isAuth={isAuth}
              />
            </Toolbar>
          }
          mobileNav={
            <MobileNavigation
              open={showMobileNav}
              mobile
              onChooseItem={this.mobileNavHandler}
              onLogout={this.logoutHandler}
              isAuth={isAuth}
            />
          }
        />
        {routes}
      </>
    );
  }
}

App.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

App.defaultProps = {};

export default App;
