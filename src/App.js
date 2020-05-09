import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Authentication } from './components/firebase';
import { database } from './components/firebase';
import './styles/App.scss';
import { AuthProvider } from './Auth';
import PrivateRoute from './PrivateRoute';

import Main_page from './components/main_page';
import setup_page from './components/setup_page';
import settings_page from './components/settings_page';
import Nav from './components/Navigation/Nav';
import SideDrawer from './components/Navigation/SideDrawer';
import Backdrop from './components/Navigation/Backdrop';
import Login_bar from './components/login_bar';
import Login_page from './components/login_page';
import Signup_page from './components/signup_page';

import { GlobalProvider } from './context/GlobalState';

export class App extends Component {


  //sets state of sidedraw
  state = {
    sideDrawerOpen: false,
  };


  //sets state of side draw to oposite on click
  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  //change state of side draw to open and close
  sidedrawerToggleClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  }

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    //reders different elements depding on authenticaion and if sidedrawer is open
    let backdrop;
    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />
    };

    return (
      <div>
        <Router>
          <Switch >
            <div className='App'>
              <AuthProvider>
                <Nav drawerClickHandler={this.drawerToggleClickHandler} />
                <SideDrawer sidedrawerClickHandler={this.sidedrawerToggleClickHandler} show={this.state.sideDrawerOpen} />
                {backdrop}
                <PrivateRoute path='/settings_page' component={settings_page} />
                <PrivateRoute path='/setup_page' component={setup_page} />
                <PrivateRoute path='/' component={Main_page} exact />
                < Route path='/login_page' component={Login_page} />
                <Route path='/signup_page' component={Signup_page} />
              </AuthProvider>
            </div>
          </Switch>
        </Router>
      </div>
    )
  }
}

