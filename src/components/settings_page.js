import React, { useState } from 'react';
import { Authentication } from './firebase'
import { Link } from 'react-router-dom';


function settings_page(props) {



    //logs out of appliaction using firebase auth
  const  logout = () => {
        Authentication.auth().signOut();
        props.history.push('/')
    }


        return (
            <div>
                <div className='App_margin'/>
                <p>Log out by pressing the button bellow</p>
                
                <button onClick={logout}>Log out</button>
            </div>
        );

}

export default settings_page