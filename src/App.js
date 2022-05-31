import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./components/Home";
import Header from "./components/Header";
import Article from "./components/Article";
import AddArticle from "./components/AddArticle";
import Setting from "./components/Setting";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Loader from "./components/Loader";
import SignupPage from "./components/SignupPage";
import "./index.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: "",
      loading: false,
    }
  }

  getUserDetails = () => {
    this.setState({ loading: true });
    let d;
    try {
      d = JSON.parse(localStorage.getItem('user'))
    } catch (e) {
      d = {};
    }
    const { token = '' } = d || {};

    fetch(`https://mighty-oasis-08080.herokuapp.com/api/user`, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
      .then((res) => res.json())
      .then(data => {
        if (data.errors && window.location.pathname !== '/login' && window.location.pathname !== '/signup') return window.location.href = '/login';
        else
          localStorage.setItem('user', JSON.stringify(data.user));
      })
      .finally(() => this.setState({ loading: false }))
  }

  componentDidMount() {
    this.getUserDetails();
  }

  render() {
    const { loading } = this.state;
    return (
      <>
        {
          loading ? <Loader />
            : <BrowserRouter>
              <Header />
              <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/articles" exact component={Home}></Route>
                <Route path="/articles/:slug" exact component={Article}></Route>
                <Route path="/addArticle" exact component={AddArticle}></Route>
                <Route path="/setting" exact component={Setting}></Route>
                <Route path="/profiles/:id" exact component={Profile}></Route>
                <Route path="/login" exact component={Login}></Route>
                <Route path="/signup" exact component={SignupPage}></Route>
                <Route path="*" component={NotFound}></Route>
              </Switch>
            </BrowserRouter>
        }
      </>
    )
  }
}
