import React from 'react';
import { Link } from 'react-router-dom';

export default class SignupPage extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <>
        <div>
          <div className="signup-header">
            <h2>Signup</h2>
            <Link to="/signin">
              <p>Have an account?</p>
            </Link>
          </div>
          <form className="form-signup">
            {/* <label> Username: </label> */}
            <input type="text" name="username" id="username" placeholder="Username" min="6" max="20" />
            {/* <label>Enter your email : </label> */}
            <input type="email" pattern=" [/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/], 'Please enter a valid email address'" name="email" id="email" placeholder="Email" required />
            {/* <label> Password </label> */}
            <input type="password" id="password" placeholder="Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters" required />
          </form>
          <div className="signup-btn">
            <button>
              Signup
            </button>
            <Link to="/login">
              <button>
                Login
              </button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}