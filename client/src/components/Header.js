import React from 'react';
import './Header.css';

const Header = props => (
  <header className="row split">
    <div className="topnav" id="myTopnav">

<div className="logo">
  <img src="/images/logo_sm.png"></img>
</div>

<a href="/map" className="active">Explore</a>
<a href="/mytrips">My Trips</a>
{/* <a href="/community">Community</a> */}
</div>

<div className="clear"></div>

    <nav>
      <span onClick={() => props.logged_in ? props.logOut() : props.showForm(0)}>{props.logged_in ? 'Log Out' : 'Login'}</span>
    </nav>
  </header>
);

export default Header;