import React from 'react';
import Loader from "../components/Loader";

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      username: "",
      email: "",
      password: "",
      bio: "",
      errors: {
        username: "",
        email: "",
        password: "",
      },
    }
  }

  handleChange = ({ target }) => {
    let { name, value } = target;
    let { errors } = this.state;
    this.setState({ [name]: value, errors });
  };

  handleSubmit = (event) => {
    let { username, image, password, email, bio, errors } = this.state;
    event.preventDefault();
    if (username && image && password && email && bio) {
      fetch("https://mighty-oasis-08080.herokuapp.com/api/user", {
        method: 'PUT',
        body: JSON.stringify({
          user: { username, email, password, bio, image }
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          // console.log(res);
          if (!res.ok) {
            return res.json()
              .then((data) => {
                for (let key in data.errors) {
                  errors[key] = `${key} ${data.errors[key]}`;
                }
                return ({ errors });
              });
          }
          return res.json();
        })
        .then((data) => {
          this.props.history.push(`/profiles/${data.user.username}`);
        })
        .catch((err) => this.setState({ errors }));
    }
  }

  render() {
    if (!this.state.username) {
      return <Loader />
    }

    let { username, email, password } = this.state.errors;
    return (
      <>
        <div>
          <form className="setting-form" onSubmit={this.handleSubmit}>
            <legend>
              Settings
            </legend>
            <fieldset className="setting-fieldset">
              <input
                type="text"
                placeholder="Image Url"
                value={this.state.image}
                onChange={this.handleChange}
                name="image"
                className="setting-input"
              />
              <input
                type="text"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
                name="username"
                className="setting-input"
              />
              <span>
                {username}
              </span>
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="Email"
                pattern=" [/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/],
             'Please enter a valid email address'"
                className="setting-input"
              />
              <span>
                {email}
              </span>
              <input
                type="password"
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.handleChange}
                className="setting-input"
              />
              <span>
                {password}
              </span>
              <textarea
                type="text"
                name="bio"
                placeholder="Enter  your bio"
                rows="10"
                value={this.state.bio}
                onChange={this.handleChange}
                className="setting-input"
              >
              </textarea>
              <input
                type="submit"
                name="submit"
                value="Update"
                className="btn update-btn"
              />
            </fieldset>
          </form>
        </div>
      </>
    )
  }
}
