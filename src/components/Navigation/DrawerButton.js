import React from 'react';

const drawerButton = props => (
    <button className='drawer_button' onClick={props.click}>
        <div className='button__line'/>
        <div className='button__line'/>
        <div className='button__line'/>
    </button>
);

export default drawerButton;