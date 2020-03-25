import React, { Component } from 'react';
import { Authentication } from './firebase';
import { database } from './firebase';
import { Link } from 'react-router-dom';
import Button from 'muicss/lib/react/button';
import Input from 'muicss/lib/react/input';


export class Login_page extends Component {

    //defines email and password and binds funtions
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.state = {
            login_email: '',
            login_password: '',
            signin_email: '',
            signin_password: '',
            signin_password2: ''
        };
    }

    //gets the email and password from form
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    //checks firebase auth for login info
    login(e) {
        e.preventDefault();
        Authentication.auth().signInWithEmailAndPassword(this.state.login_email, this.state.login_password).then((u) => {
        }).catch((error) => {
            alert(error.message)
            console.log(error);
        });
    }

    //uploads signin data to firebase

    signup(e) {
        if(this.state.signin_password == this.state.signin_password2) {
        e.preventDefault();
        Authentication.auth().createUserWithEmailAndPassword(this.state.signin_email, this.state.signin_password).then((u) => {
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
        } else {
            alert('please make sure passwords match')
        }
    }

    render() {
        return (
            <div className='signinBox'>
                <form>
                    <div className='login_form' className='form_box'>
                        <p className="mui--text-subhead">Login:</p>
                        <div className="form_input">
                            <Input label='Email adress' floatingLabel={true} value={this.state.email} onChange={this.handleChange} type="email" name="login_email" aria-describedby="emailHelp" />
                        </div>
                        <div className="form_input">
                            <Input label='Password' floatingLabel={true} value={this.state.password} onChange={this.handleChange} type="password" name="login_password" />
                        </div>
                    </div>
                    <div className='signin_form' className='form_box'>
                    <p className="mui--text-subhead">Sign up:</p>
                        <div className="form_input">
                            <Input label='Email adress' floatingLabel={true} value={this.state.email} onChange={this.handleChange} type="email" name="signin_email" aria-describedby="emailHelp" />
                        </div>
                        <div className="form_input">
                            <Input label='Password' floatingLabel={true} value={this.state.password} onChange={this.handleChange} type="password" name="signin_password" />
                        </div>
                        <div className="form_input">
                            <Input label='Confirm Password' floatingLabel={true} value={this.state.password} onChange={this.handleChange} type="password" name="signin_password2" />
                        </div>
                    </div>
                    <Button onClick={this.login} type="submit" size="large" color="primary" variant="raised">Login</Button>
                    <Button onClick={this.signup} size="large" color="primary" variant="raised">Sign up</Button>
                </form>
            </div>
        );
    }
}