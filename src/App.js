import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Authentication } from './components/firebase';
import { database } from './components/firebase';

import Main_page from './components/main_page';
import setup_page from './components/setup_page';
import settings_page from './components/settings_page';
import Nav from './components/Navigation/Nav';
import SideDrawer from './components/Navigation/SideDrawer';
import Backdrop from './components/Navigation/Backdrop';
import Login_bar from './components/login_bar';
import Login_page  from './components/login_page';

import { GlobalProvider } from './context/GlobalState';

export class App extends Component {

  //initiates user state
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      user_data: (JSON.parse(localStorage.getItem('user_data')))
    }
    this.authListener = this.authListener.bind(this);
  }




  //sets state of sidedraw
  state = {
    sideDrawerOpen: false,
  };

  //onload runs funtion to check for authenication from firebase
  componentDidMount() {
    this.authListener();
  }

  //checks firebase for authentication
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
        localStorage.removeItem('user_data')
      }
    });
  }

  //connects to database and stores data to local storage
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
        //console.log(data);
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
        //console.log(this.ingredients);
      })
      .then(function () {
        //console.log('pulled ingredient data')
      })
      .catch(function (error) {
        console.error("Error reading ingredients", error);
      });
  }

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
          <div className='App'>
            {this.state.user ? (<Nav drawerClickHandler={this.drawerToggleClickHandler} />) : (<Login_bar />)}
            <SideDrawer sidedrawerClickHandler={this.sidedrawerToggleClickHandler} show={this.state.sideDrawerOpen} />
            {backdrop}
            
              {this.state.user ?
                (< Switch >
                <GlobalProvider>
                  <Route path='/settings_page' component={settings_page} />
                  <Route path='/setup_page' component={setup_page} />
                  <Route path='/' component={Main_page} exact/>
                  </GlobalProvider>
                </Switch>) :  (<Login_page />)}
            
          </div>
        </Router>
      </div >

    )
  }
}

