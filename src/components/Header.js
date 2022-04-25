import React from 'react';
import { NavLink as Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return (
      <>
        <div>
          <header className="header-nav-content">
            <Link to="/">
              <button className="header-nav-btn logo"> Blog</button>
            </Link>
            <nav>
              <Link to="/">
                <button className="header-nav-btn">
                  Home
                </button>
              </Link>
              <Link to="/signup" exact>
                <button className="header-nav-btn">
                  Sign up
                </button>
              </Link>
              <Link to="/login" exact>
                <button className="header-nav-btn">
                  Login
                </button>
              </Link>
            </nav>
          </header>

          <div className="header-container">
            <h2 className="header">
              Welcome to Blog App <br />
              <span className="header-span"> A place to share your knowledge.</span>
            </h2>
          </div>
        </div>
      </>
    )
  }
}