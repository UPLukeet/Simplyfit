import React, { useState, useContext, useEffect } from 'react';
import { Authentication } from './firebase';
import { database } from './firebase';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Login_bar from './login_bar'
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "../Auth";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';




function Login_page(props) {





    const [login_email, login_emailSet] = useState('')
    const [login_password, login_passwordSet] = useState('')
    const [signup_email, signup_emailSet] = useState('')
    const [signup_password, signup_passwordSet] = useState('')
    const [signup_password2, signup_password2Set] = useState('')
    const [Login, LoginSet] = useState(true)
    const [Signup, SignupSet] = useState(false)
    const [loading_animation, setloading_animation] = useState(false);
    const [box_transition, setbox_transition] = useState(true);


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

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        props.history.push('/')
    }




    const login = (e) => {
        e.preventDefault();
        Authentication.auth().signInWithEmailAndPassword(login_email, login_password).then((u) => { }).catch((error) => {
            alert(error.message)
            console.log(error);
        });
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




    const handleChanglogin_email = (event) => {

        login_emailSet(event.target.value)
    };

    const handleChanglogin_password = (event) => {

        login_passwordSet(event.target.value)
    };

    //handles switch funtion of unit switching
    const LoginClickHandler = () => {
        if(box_transition === false){
                LoginSet(!Login);
            setTimeout(() => {
                setbox_transition(!box_transition);
            }, 50);
        }else{
            setbox_transition(!box_transition);
            setTimeout(() => {
                LoginSet(!Login);
            }, 400);
        }
    };

    return (
        <div className='login_container'>
            <Login_bar />
            <div className={loading_animation ? 'loading_transition fade' : 'loading_transition'}>
                <div className='App_margin' />
                <div className='spacer' />

                {Login && (
                    <div  className={box_transition ? 'form_box fade':'form_box'}>
                        <form>
                            <div>
                                <p>Login:</p>
                                <div className="form_input">
                                    <TextField label='Email adress' id="standard-basic" value={login_email} onChange={handleChanglogin_email.bind(this)} type="email" name="login_email" aria-describedby="emailHelp" />
                                </div>
                                <div className="form_input">
                                    <TextField label='Password' id="standard-basic" value={login_password} onChange={handleChanglogin_password.bind(this)} type="password" name="login_password" />
                                </div>
                            </div>
                        </form>

                        <div className='signin_buttons'>
                            <Button onClick={login} size="large" color="primary" variant="contained">Login</Button>
                        </div>
                        <p className='login_text'>Don't have an account?</p>
                        <div className='divider' />
                        <div className='signin_buttons_secondary'>
                            <Button onClick={LoginClickHandler} size="large" variant="contained">Create an account</Button>
                        </div>
                    </div>
                )}


                {!Login && (
                    <div  className={!box_transition ? 'form_box fade':'form_box'}>
                        <form>
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
                        <p className='login_text'>Already have an account?</p>
                        <div className='divider' />
                        <div className='signin_buttons_secondary'>
                            <Button onClick={LoginClickHandler} size="large" variant="contained">Sign in</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login_page