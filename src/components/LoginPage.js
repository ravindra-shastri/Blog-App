import React from 'react';
import { Link } from 'react-router-dom';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <>
        <div>
          <form>
            <label>Enter your email : </label>
            <input type="email" pattern=" [/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/], 'Please enter a valid email address'" name="email" id="email" placeholder="Email" required />

            <label> Password </label>
            <input type="password" id="password" placeholder="Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters" required />
          </form>
          <button>
            Login
          </button>
          <Link to="/signup">
          <button>
            Signup
          </button>
          </Link>
        </div>
      </>
    )
  }
}