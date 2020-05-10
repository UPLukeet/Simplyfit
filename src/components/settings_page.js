import React, { useState, useEffect } from 'react';
import { Authentication } from './firebase';
import Button from '@material-ui/core/Button';

function Settings_page(props) {


    const [loading_animation, setloading_animation] = useState(false);


    useEffect(() => {
        if (loading_animation === false) {
            setTimeout(() => {
                setloading_animation(!loading_animation);
                console.log('play animation')
            }, 100);
        }
        return () => {
            document.body.style.overflow = 'unset';
        }

    }, []);


    //logs out of appliaction using firebase auth
    const logout = () => {
        Authentication.auth().signOut();
        localStorage.removeItem('user');
        props.history.push('/')
    }

    return (
        <div className={loading_animation ? 'loading_transition fade' : 'loading_transition'}>
            <div className='main_settings'>
                <div className='App_margin' />
                <p>Log out by pressing the button below:</p>

                <Button color="primary" variant="contained" onClick={logout}>Log out</Button>
                <div className={loading_animation ? 'loading_transition fade' : 'loading_transition'}></div>
            </div>
        </div>
    );

}

export default Settings_page