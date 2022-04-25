import React from 'react';
import { Link } from 'react-router-dom';

export default class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      errors: {
        username: "",
        email: "",
        password: "",
      }
    }
  }
  handleChange = ({ target }) => {
    let { name, value } = target;
    let errors = this.state.errors;
    this.setState({ [name]: value, errors });
  };

  handleSubmit = (event) => {
    let { email, password, username, errors } = this.state;
    event.preventDefault();
    if (username && password && email) {
      fetch(`https://mighty-oasis-08080.herokuapp.com/api/users`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username, password, email
          }
        }),
      })
        .then((res) => {
          if (!res.ok) {
            return res.json()
              .then((data) => {
                for (let key in data.errors) {
                  errors[key] = `${key} ${data.errors[key]}`;
                }
                return (errors);
              });
          }
          return res.json();
        })
        .catch((errors) => this.setState({ errors }));
    }
  };

  render() {
    let { username, password, email } = this.state.errors;
    return (
      <>
        <div>
          <div className="signup-header">
            <h2>Sign Up</h2>
            <Link className="para" to="/login">
              <p>Have an account?</p>
            </Link>
          </div>
          <form onSubmit={this.handleSubmit} className="form-signup">
            <input
              type="text"
              name="username"
              className="input"
              id="username"
              placeholder="Enter Username"
              value={this.state.username}
              onChange={(e) => this.handleChange(e)}
              min="6"
              max="20"
            />
            <span> {username} </span>

            <input
              type="email"
              pattern=" [/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/],
              'Please enter a valid email address'"
              name="email"
              id="email"
              className="input"
              placeholder="Enter Email"
              value={this.state.email}
              onChange={(e) => this.handleChange(e)}
              required
            />
            <span>
              {email}
            </span>
            <input
              type="password"
              id="password"
              className="input"
              placeholder=" Enter Password"
              value={this.state.password}
              name="password"
              onChange={(e) => this.handleChange(e)}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
              required
            />
            <span>
              {password}
            </span>
            <input
              type="submit"
              className="submit-btn"
              value="Sign Up"
              disabled={username || email || password}
            />
          </form>
          {/* <div className="signup-btn">
            <button>
              Signup
            </button>
            <Link to="/login">
              <button>
                Login
              </button>
            </Link>
          </div> */}
        </div>
      </>
    )
  }
}