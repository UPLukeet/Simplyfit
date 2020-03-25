import React from 'react';
import { Link } from 'react-router-dom';
import SideDrawerButton from './SideDrawerButton'

//side drawer slides out and is main naviagtion on mobile
const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if (props.show) {
        drawerClasses = 'side-drawer open';
    }
    return (<nav className={drawerClasses}>
        <div>
          <SideDrawerButton click={props.sidedrawerClickHandler}/>
        </div>
        <ul>
            <li><Link to='/'>Main page</Link></li>
            <li><Link to='/setup_page'>Setup page</Link></li>
            <li><Link to='/settings_page'>Settings page</Link></li>
        </ul>
    </nav>);

};

export default sideDrawer;