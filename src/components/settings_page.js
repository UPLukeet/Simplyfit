import React, { useState } from 'react';
import { Authentication } from './firebase'
import Button from '@material-ui/core/Button';

function settings_page(props) {



    //logs out of appliaction using firebase auth
  const  logout = () => {
        Authentication.auth().signOut();
        localStorage.removeItem('user');
        props.history.push('/')
    }


        return (
            <div className='main_settings'>
                <div className='App_margin'/>
                <p>Log out by pressing the button below:</p>
                
                <Button color="primary" variant="contained" onClick={logout}>Log out</Button>
            </div>
        );

}

export default settings_page