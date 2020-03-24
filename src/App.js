import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Authentication } from './components/firebase';
import { database } from './components/firebase';

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
        localStorage.setItem('user', user.uid);
        this.pulldata_Health();
        this.pulldata_Meals();
        this.pulldata_Ingredients();
      } else {
        this.setState({ user: null })
        localStorage.removeItem('user');
      }
    });
  }

  //connects to database and puts data into set variables
  pulldata_Health() {
      database.collection('Health_data')
        .doc(localStorage.getItem('user'))
        .get()
        .then(doc => {
          const data = doc.data();
          localStorage.setItem('user_data', JSON.stringify(data));
          console.log(JSON.parse(localStorage.getItem('user_data')))
        }).catch(function (error) {
          console.error("Error reading health", error);
        });

  }

  pulldata_Meals() {
    database.collection('Meals')
      .doc()
      .get()
      .then(doc => {
        const data = doc.data();
        this.meals = data;
        console.log(data);
      })
      .then(function () {
        //console.log('pulled meal data')
      })
      .catch(function (error) {
        console.error("Error reading meals", error);
      });
  }

  pulldata_Ingredients() {
    database.collection('Ingredients')
      .doc()
      .get()
      .then(doc => {
        const data = doc.data();
        this.ingredients = data;
        console.log(this.ingredients);
      })
      .then(function () {
        //console.log('pulled ingredient data')
      })
      .catch(function (error) {
        console.error("Error reading ingredients", error);
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
              {this.state.user ? (<Route path='/' component={main_page} exact />) : (<Login_page />)}
            </Switch>

          </div>
        </Router>
      </div>
    );
  }
}

