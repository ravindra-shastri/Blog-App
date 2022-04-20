import React from 'react';
import { Link } from 'react-router-dom';

export default class SigninPage extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <>
        <div>
          <div className="signin-header">
            <h2>Signin</h2>
            <Link to="/signup">
              <p>Need an account?</p>
            </Link>
          </div>
          <form className="form-signin">
            {/* <label>Enter your email : </label> */}
            <input type="email" pattern=" [/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/], 'Please enter a valid email address'" name="email" id="email" placeholder="Email" required />
            {/* <label> Password </label> */}
            <input type="password" id="password" placeholder="Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters" required />
            <button>
              Signin
            </button>
          </form>

        </div>
      </>
    )
  }
}