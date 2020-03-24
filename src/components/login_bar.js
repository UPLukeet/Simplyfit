import React from 'react';

//blank top bar for non logged in users
const Login_bar = props => (
    <header className='toolbar'>
        <nav className='toolbar_nav'>
            <div className='toolbar_logo'><li>Simplyfit</li></div>
            <div className='spacer' />
        </nav>
    </header>

)
export default Login_bar;