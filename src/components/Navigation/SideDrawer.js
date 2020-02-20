import React from 'react';
import { Link } from 'react-router-dom';
import SideDrawerButton from './SideDrawerButton'

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
            <li><Link to='/main_page'>Main page</Link></li>
            <li><Link to='/setup_page'>Setup page</Link></li>
            <li><Link to='/settings_page'>Settings page</Link></li>
        </ul>
    </nav>);

};

export default sideDrawer;