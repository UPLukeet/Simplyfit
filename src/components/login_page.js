import React, { Component } from 'react';
import { Authentication } from './firebase';


export class Login_page extends Component {

    //defines email and password and binds funtions
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.state = {
            email: '',
            password: ''
        };
    }

    //gets the email and password from form
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    //checks firebase auth for login info
    login(e) {
        e.preventDefault();
        Authentication.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).catch((error) => {
            alert(error.message)
            console.log(error);
        });
    }

    //uploads signin data to firebase
    signup(e) {
        e.preventDefault();
        Authentication.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
        }).then((u) => { console.log(u) })
            .catch((error) => {
                alert(error.message)
                console.log(error);
            })
      }

    render() {
        return (
            <div>
                <h1>You are logged out! please either sign in or sign up bellow</h1>
                <p>login Page</p>
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button type="submit" onClick={this.login} class="btn btn-primary">Login</button>
                    <button onClick={this.signup} style={{ marginLeft: '25px' }} className="btn btn-success">Signup</button>
                </form>
            </div>
        );
    }
}