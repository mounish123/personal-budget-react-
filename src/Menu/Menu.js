import React from 'react';
// import './App.css';

import { 
   Link
 } from 'react-router-dom';

function Menu() {
  return (
    <nav class="menu">
        <ul>
            <li><Link to="/" title="go to homepage">Homepage</Link></li>
            <li><Link to="/about" title="learn more about the publisher">About</Link></li>
            <li><Link to="/pb/login" title="login to our account">Login</Link></li>
        </ul>
    </nav>
  );
}

export default Menu;
