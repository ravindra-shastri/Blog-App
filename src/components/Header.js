import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return (
      <>
        <div>
          <header className="header-nav-content">
            <NavLink to="/">
              <button className="header-nav-btn logo"> Blog</button>
            </NavLink>
            <nav>
              <NavLink to="/">
                <button className="header-nav-btn">
                  Home
                </button>
              </NavLink>
              <NavLink to="/signup" exact>
                <button className="header-nav-btn">
                  Sign up
                </button>
              </NavLink>
              <NavLink to="/login" exact>
                <button className="header-nav-btn">
                  Login
                </button>
              </NavLink>
            </nav>
          </header>
        </div>
      </>
    )
  }
}