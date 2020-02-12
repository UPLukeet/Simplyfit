import React from 'react';
import {Link} from 'react-router-dom';

function Nav() {
    return (
        <nav>
        <ul>
        <Link to='/'>
        <li>setup page</li>
        </Link>
        <Link to='/main_page'>
        <li>main page</li>
        </Link>
        <Link to='/settings_page'>
        <li>settings page</li>
        </Link>
        </ul>
        </nav>
    );
}

export default Nav;