import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import main_page from './components/main_page';
import setup_page from './components/setup_page';
import settings_page from './components/settings_page';
import Error from './components/Error';
import Nav from './components/Navigation/Nav';
import SideDrawer from './components/Navigation/SideDrawer';
import Backdrop from './components/Navigation/Backdrop';


function App() {
  return (
    <main style={{marginTop: '64px'}}>
  <Router>
    <div className='App'>
      <Nav />
      <SideDrawer />
      <Switch>
        <Route path='/' component={setup_page} />
        <Route path='/main_page' component={main_page} />
        <Route path='/settings_page' component={settings_page} />
        <Route  component={Error} />
        
      </Switch>
    </div>
  </Router>
  </main>
  );
}

export default App;
