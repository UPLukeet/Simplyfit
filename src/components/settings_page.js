import React, { Component } from 'react';
import { Authentication } from './firebase'
import { Link } from 'react-router-dom';


function settings_page(props) {



    //logs out of appliaction using firebase auth
  const  logout = () => {
        Authentication.auth().signOut();
    }


        return (
            <div>
                <div className='App_margin'/>
                <p>Log out by pressing the button bellow</p>
                
                <Link to='/'><button onClick={logout}>Log out</button></Link>
            </div>
        );

}

export default settings_page