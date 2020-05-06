import React, { useState, useContext } from 'react';
import { Authentication } from './firebase';
import { database } from './firebase';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Login_bar from './login_bar'
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "../Auth";


function Signup_page(props) {

    const [signup_email, signup_emailSet] = useState('')
    const [signup_password, signup_passwordSet] = useState('')
    const [signup_password2, signup_password2Set] = useState('')


    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/setup_page" />;
    }

    const signup = (e) => {
        if (signup_password === signup_password2) {
            e.preventDefault();
            Authentication.auth().createUserWithEmailAndPassword(signup_email, signup_password).then((u) => {
                return database.collection('Health_data').doc(u.user.uid).set({
                    gender: '',
                    age: '',
                    height: '',
                    weight: '',
                    goal: ''
                }).catch((error) => {
                    alert(error.message)
                    console.log('failed to write', error);
                });
            }).then((u) => { console.log(u) })
                .catch((error) => {
                    alert(error.message)
                    console.log(error);
                })
            props.history.push('/setup_page')
        } else {
            alert('Please make sure passwords match.')
        }

    }

    const handleChangsignup_email = (event) => {

        signup_emailSet(event.target.value)
    };


    const handleChangsignup_password = (event) => {

        signup_passwordSet(event.target.value)
    };

    const handleChangsignup_password2 = (event) => {

        signup_password2Set(event.target.value)
    };


    return (
        <div className='login_container'>
            <Login_bar />
            <div className='App_margin' />
            <div className='spacer' />


            <form className='form_box'>
                <div>
                    <p>Sign up:</p>
                    <div className="form_input">
                        <TextField label='Email adress' id="standard-basic" value={signup_email} onChange={handleChangsignup_email.bind(this)} type="email" name="signin_email" aria-describedby="emailHelp" />
                    </div>
                    <div className="form_input">
                        <TextField label='Password' id="standard-basic" value={signup_password} onChange={handleChangsignup_password.bind(this)} type="password" name="signin_password" />
                    </div>
                    <div className="form_input">
                        <TextField label='Confirm Password' id="standard-basic" value={signup_password2} onChange={handleChangsignup_password2.bind(this)} type="password" name="signin_password2" />
                    </div>
                </div>
            </form>

            <div className='signin_buttons'>
                <Button onClick={signup} size="large" color="primary" variant="contained">Sign up</Button>
            </div>
        </div>
    )
}

export default Signup_page;