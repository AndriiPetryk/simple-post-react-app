import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import MobileToggle from '../MobileToggle/MobileToggle';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import './MainNavigation.css';

const mainNavigation = ({ onOpenMobileNav, isAuth, onLogout }) => (
  <nav className="main-nav">
    <MobileToggle onOpen={onOpenMobileNav} />
    <div className="main-nav__logo">
      <NavLink style={{ 'text-decoration': 'none' }} to="/">
        <Logo />
      </NavLink>
    </div>
    <div className="spacer" />
    <ul className="main-nav__items">
      <NavigationItems isAuth={isAuth} onLogout={onLogout} />
    </ul>
  </nav>
);

mainNavigation.propTypes = {
  onOpenMobileNav: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default mainNavigation;
