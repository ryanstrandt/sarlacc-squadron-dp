import React from 'react';
import { NavLink } from 'react-router-dom';

const MainNavigation = () => {
  return (
    <nav className="MainNavigation">
      <NavLink activeClassName="active" to="/">
        Character
      </NavLink>
      <NavLink activeClassName="active" to="/functions">
        Datapad Functions
      </NavLink>
    </nav>
  );
};

export default MainNavigation;
