import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import LoginView from "./components/view/loginView";
import MypageView from "./components/view/mypageView";
import SignUpView from "./components/view/signupView";
import SignUpConfirmView from "./components/view/signupConfirmView";
import SignUpCompleteView from "./components/view/signupCompleteView";
import ForgotPasswordView from "./components/view/forgotPasswordView";
import ForgotPasswordCompleteView from "./components/view/forgotPasswordCompleteView";
import SettingPasswordView from "./components/view/settingPasswordView";
import SettingPasswordCompleteView from "./components/view/settingPasswordCompleteView";
import LoginMenuDropDown from './components/util/loginMenuDropDown';
import queryString from 'query-string';

class ViewController extends Component {

   constructor(props){

    super(props);

    this.state = {member: {},countries: {},isLogin: false}

  }

  setLoginMenu(member, countries) {

    this.setState({member: member,countries: countries,isLogin: true });

  }

  setLogoutMenu() {this.setState({ isLogin: false });}

  render() {

    let navbar;
    if (this.state.isLogin) {
      navbar = (
                <div className="text-right mr-5">
                  <LoginMenuDropDown member={this.state.member} countries={this.state.countries} setLogoutMenu={() => { this.setLogoutMenu(); }} />
                </div>
              );
    } else {
      navbar = (
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                  <ul className="navbar-nav ml-auto naviFont">
                    <li className="nav-item">
                      <Link className="nav-link" to={"/"}>Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={"/signup"}>Sign up</Link>
                    </li>
                  </ul>
                </div>
              );
    }

    return(
      <BrowserRouter>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand titleFont" to={"/"}>COVID-19.com</Link>
          </div>
          {navbar}
        </nav>
        <div className="auth-wrapper">
          <Switch>
            <Route exact path='/' component={LoginView} />
            <Route path="/mypage">
              <MypageView setLoginMenu={(member, countries) => { this.setLoginMenu(member, countries); }} />
            </Route>
            <Route path="/signup" component={SignUpView} />
            <Route path="/signup-confirm" component={SignUpConfirmView} />
            <Route path="/signup-complete" component={SignUpCompleteView} />
            <Route path="/forgot-password" component={ForgotPasswordView} />
            <Route path="/forgot-password-complete" component={ForgotPasswordCompleteView} />
            <Route path="/setting-password" render = {(props) => <SettingPasswordView qs={queryString.parse(props.location.search)} /> }/>
            <Route path="/setting-password-complete" component={SettingPasswordCompleteView} />
          </Switch>
        </div>
      </div>
      </BrowserRouter>
    );

  }
}

export default ViewController;