import React from 'react';

const sidedrawerButton = props => (
    <button className='sidedrawer_button' onClick={props.click}>
        <div className='sidebutton__line'/>
        <div className='sidebutton__line'/>
        <div className='sidebutton__line'/>
    </button>
);

export default sidedrawerButton;