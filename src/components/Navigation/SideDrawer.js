import React from 'react';
import { NavLink } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import Logo from '../../assets/SimplyfitLogo.svg';

//side drawer slides out and is main naviagtion on mobile
const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if (props.show) {
        drawerClasses = 'side-drawer open';
    }
    return (<nav className={drawerClasses}>
        <div className='sidedraw-top'>
        <img alt='' src={Logo} />
        </div>
        <ul>
        <NavLink className='noSelect' onClick={props.sidedrawerClickHandler} to='/' exact activeClassName='current'><li><HomeIcon className='Nav_icons'/>Main</li></NavLink>
        <NavLink className='noSelect' onClick={props.sidedrawerClickHandler} to='/setup_page' exact  activeClassName='current'><li><EmojiPeopleIcon className='Nav_icons'/>Setup</li></NavLink>
        <NavLink className='noSelect' onClick={props.sidedrawerClickHandler} to='/settings_page'   activeClassName='current'><li><SettingsIcon className='Nav_icons'/>Settings</li></NavLink>
        </ul>
    </nav>);

};

export default sideDrawer;