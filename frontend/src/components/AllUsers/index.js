import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink} from "react-router-dom";
import { getUsers } from "../../store/users";
import './AllUsers.css'


const AllUsers = () => {
  const dispatch = useDispatch();

  // grab ALL users
  const users = useSelector((state) => state?.users);
  const usersArray = Object.values(users);


  function userCard(user) {
    if (user === undefined) return;
    const { username, imgUrl, bio } = user;
    return (
      <>
        <div className="userInfoSingleTweetPageWrapper">
          <div>
            <img
              src={imgUrl}
              alt=""
              className="userProfilePicOnSingleTweetPage"
              onError={(event) => (event.target.style.display = "none")}
            />
          </div>
          <div className="singletweetUserNameWrapper">
            <div>@{username}</div>
            <i class="fas fa-check-circle" id="checkMark"></i>
          </div>
        </div>
        <br></br>

        <div className="singletweetBioNameWrapper">{bio}</div>
      </>
    );
  }

  useEffect(() => {
    (async () => {
      await dispatch(getUsers());
    })();
  }, [dispatch]);

  return (
    <>
      {usersArray
        .map((user) => {
          return <>
          <NavLink  className='navLinkAll'key={user.id+2} to={`users/${user.id}`}>
              <div className='divForAllPage'>
          {userCard(user)}
          </div>
          </NavLink>
          </>;
        })}


    </>
  );
};
export default AllUsers;
