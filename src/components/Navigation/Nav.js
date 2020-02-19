import React from 'react';
import {Link} from 'react-router-dom';
import DrawerButton from './DrawerButton';

const Nav = props => (
    <header className='toolbar'>
        <nav className='toolbar_nav'>
            <div>
                <DrawerButton click={props.drawerClickHandler} />
            </div>
            <div className='toolbar_logo'><li>Simplyfit</li></div>
            <div className='spacer'/>
            <div className='toolbar_nav-items'>
                <ul>
                <li><Link to='/main_page'>Main page</Link></li>
                <li><Link to='/setup_page'>Setup page</Link></li>
                <li><Link to='/settings_page'>Settings page</Link></li>
                </ul>
            </div>
        </nav>
    </header>
)

export default Nav;