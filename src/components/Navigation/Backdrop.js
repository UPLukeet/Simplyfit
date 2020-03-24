import React from 'react';

// closes nav bar onclick
const backdrop = props => (
    <div className='backdrop' onClick={props.click} />
);

export default backdrop;