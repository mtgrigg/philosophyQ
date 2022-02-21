import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import {NavLink, useHistory, Redirect  } from 'react-router-dom';
import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history= useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    history.push('/')
    dispatch(sessionActions.logout());

  };

  return (
    <>
     {/* <button className='loggedInButton' onClick={logout}>

{user.username || 'Log Out'}

</button> */}
      {/* <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button> */}

        <ul className="profile-dropdown">
          <li>Welcome, {user.username}!</li>
          {/* <li>{user.email}</li> */}
          <li>



          </li>
        </ul>
        <button  className='logOutButton' onClick={logout}>Log Out</button>

    </>
  );
}

export default ProfileButton;
