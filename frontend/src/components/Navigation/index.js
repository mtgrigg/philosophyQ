import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';

import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='profileButton'>
      <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <>
        {/* <LoginFormModal /> */}
        <div className='signUpButtonNav'>
        { <NavLink to="/">Sign Up</NavLink>}
        </div>
        <div className='loginButtonNav'>
        <NavLink to="/login" className='loginButtonNav'>Login</NavLink>
        </div>
      </>
    );
  }

  return (
    <>
    <div className='topnav'>
    <ul>
      <li>
       <NavLink exact to="/tweets">Home</NavLink>
       <NavLink className='allPhilosButton'exact to="/users">Philosophers</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>

    </div>
    <div id='titleP'>PhilosophyHQ</div>
    </>
  );
}

export default Navigation;
