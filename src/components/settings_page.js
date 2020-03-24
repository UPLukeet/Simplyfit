import React, { Component } from 'react';
import { Authentication } from './firebase'
import { Link } from 'react-router-dom';


export class settings_page extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        Authentication.auth().signOut();
    }

    render() {

        return (
            <div>
                <p>Log out by pressing the button bellow</p>
                
                <Link to='/'><button onClick={this.logout}>Log out</button></Link>
            </div>
        );
    }
}
