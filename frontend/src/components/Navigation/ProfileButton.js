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
<div className='profileAndLogoutWrap'>
        <ul className="profile-dropdown">

          <li id='welcomeBlank'>Welcome, {user.username}!   <img
                        src={user.imgUrl}
                        alt=" "
                        onError={(event) =>
                          (event.target.style.display = "none")
                        }
                        className="userProfilePicOnComment"
                        id='navImg'
                      /> </li>
                      
          {/* <li>{user.email}</li> */}
          <li>



          </li>
        </ul>
        <NavLink key={user.id+1} className='userPageButton'to={`/users/${user.id}`}>User Profile</NavLink>
        <button  className='logOutButton' onClick={logout}>Log Out</button>
        </div>

    </>
  );
}

export default ProfileButton;
