import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Authentication } from './components/firebase'

import { main_page } from './components/main_page';
import { setup_page } from './components/setup_page';
import { settings_page } from './components/settings_page';
import Error from './components/Error';
import Nav from './components/Navigation/Nav';
import SideDrawer from './components/Navigation/SideDrawer';
import Backdrop from './components/Navigation/Backdrop';
import Login_bar from './components/login_bar';
import { Login_page } from './components/login_page';

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
    }
  }

  state = {
    sideDrawerOpen: false,
  };

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    Authentication.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user' , user.uid);
      } else {
        this.setState({ user: null })
        localStorage.removeItem('user');
      }
    });
  }

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  sidedrawerToggleClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  }

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    let backdrop;
    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />
    };

    return (
      <div className="App_margin">
        <Router>
          <div className='App'>
            {this.state.user ? (<Nav drawerClickHandler={this.drawerToggleClickHandler} />) : (<Login_bar />)}
            <SideDrawer sidedrawerClickHandler={this.sidedrawerToggleClickHandler} show={this.state.sideDrawerOpen} />
            {backdrop}
            < Switch >
              <Route path='/setup_page' component={setup_page} exact />
              <Route path='/settings_page' component={settings_page} exact />
              {this.state.user ? (<Route path='/' component={main_page} />) : (<Login_page />)}
            </Switch>

          </div>
        </Router>
      </div>
    );
  }
}

