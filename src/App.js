import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import main_page from './components/main_page';
import setup_page from './components/setup_page';
import settings_page from './components/settings_page';
import Error from './components/Error';
import Nav from './components/Navigation/Nav';
import SideDrawer from './components/Navigation/SideDrawer';
import Backdrop from './components/Navigation/Backdrop';


export class App extends Component {
   state = {
   sideDrawerOpen: false
   };
  
  
   drawerToggleClickHandler = () => {
      this.setState((prevState) =>{
         return {sideDrawerOpen: !prevState.sideDrawerOpen};
      });
   };
  

  render() {
    let sideDrawer;
    let backdrop;

    if (this.state.sideDrawerOpen) {
      sideDrawer = <SideDrawer />
      backdrop = <Backdrop />
    }
  return (
    <div className="App_margin">
  <Router>
    <div className='App'>
      <Nav drawerClickHandler={this.drawerToggleClickHandler} />
      {sideDrawer}
      {backdrop}
      <Switch>
        <Route path='/'  component={setup_page} exact/>
        <Route path='/main_page' component={main_page} />
        <Route path='/settings_page' component={settings_page} />
        <Route  component={Error} />
      </Switch>

    </div>
  </Router>
  </div>
  );
}
}

