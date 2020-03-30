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
        <img src={Logo} />
        </div>
        <ul>
        <NavLink onClick={props.sidedrawerClickHandler} to='/' exact activeStyle={{ color: ' #f7be10' }}><li><HomeIcon/>Main</li></NavLink>
        <NavLink onClick={props.sidedrawerClickHandler} to='/setup_page' exact  activeStyle={{ color: '#f7be10' }}><li><EmojiPeopleIcon/>Setup</li></NavLink>
        <NavLink onClick={props.sidedrawerClickHandler} to='/settings_page'   activeStyle={{  color: '#f7be10' }}><li><SettingsIcon/>Settings</li></NavLink>
        </ul>
    </nav>);

};

export default sideDrawer;