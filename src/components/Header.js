import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return (
      <>
        <div>
          <header className="header-nav-content">
            <nav>
              <button className="header-nav-btn logo"> Blog</button>
            </nav>
            <nav>
              <Link to="/">
                <button className="header-nav-btn">
                  Home
                </button>
              </Link>
              <Link to="/signin">
                <button className="header-nav-btn">
                  Sign in
                </button>
              </Link>
              <Link to="/signup">
                <button className="header-nav-btn">
                  Sign up
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