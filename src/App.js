import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import Home from "./components/Home";
import Header from "./components/Header";
import Article from "./components/Article";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import SigninPage from "./components/SigninPage";
import SignupPage from "./components/SignupPage";
import "./index.css";

export default class App extends React.Component {
  render() {
    return (
      <>
        <div>
          <BrowserRouter>
            <Header />
            <Route path="/" exact component={Home}></Route>
            <Route path="/articles" exact component={Home}></Route>
            <Route path="/articles/:slug" exact component={Article}></Route>
            <Route path="/profile/:id" exact component={Profile}></Route>
            <Route path="/signin" component={SigninPage}></Route>
            <Route path="/signup" component={SignupPage}></Route>
            <Route path="*" exact component={NotFound}></Route>
          </BrowserRouter>
        </div>
      </>
    )
  }
}

