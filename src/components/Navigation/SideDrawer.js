import React from 'react';
import { Link } from 'react-router-dom';
import SideDrawerButton from './SideDrawerButton'
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
        <Link onClick={props.sidedrawerClickHandler} to='/'><li><HomeIcon/>Main</li></Link>
        <Link onClick={props.sidedrawerClickHandler} to='/setup_page'><li><EmojiPeopleIcon/>Setup</li></Link>
        <Link onClick={props.sidedrawerClickHandler} to='/settings_page'><li><SettingsIcon/>Settings</li></Link>
        </ul>
    </nav>);

};

export default sideDrawer;