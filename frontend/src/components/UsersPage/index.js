import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import { getComments, deleteComment } from "../../store/comments";
import { getUsers } from "../../store/users";
import { getTweets } from "../../store/tweets";
import { deleteTweet } from "../../store/tweets";
import EditTweet from "../EditTweet";
import CreateComment from "../CreateComment";
import "./UsersPage.css";
import { useState } from "react";
import CommentFunctions from "../CommentFunctions";

const UsersPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {userId}= useParams();


  // grab ALL users
    const users = useSelector(state => state?.users)
    const usersArray = Object.values(users)

    const currentUser = useSelector(state => state.session.user);
    const currentUserId = currentUser?.id



  function userCard(user) {

    if (user === undefined) return;
    const {username, imgUrl, bio} = user;
    return (
      <>
        <div className='userInfoSingleTweetPageWrapper'>
            <div>
        <img src={imgUrl} alt=''  className='userProfilePicOnSingleTweetPage' onError={(event) => event.target.style.display = 'none'}/>
        </div>
        <div className='singletweetUserNameWrapper'>

          <div>@{username}</div>
          <i class="fas fa-check-circle" id='checkMark'></i>

          </div>


         </div>
         <br></br>

          <div className='singletweetBioNameWrapper'>{bio}</div>

      </>
    );
  }



    useEffect(() => {
        (async()=>{
            await dispatch(getTweets());
            await dispatch(getUsers());
            
        })()
    }, [dispatch])



  return (
    <>




{usersArray.filter(user=>user.id==userId).map(user=>{

return(
    <>

{userCard(user)}

   </>
)

})}
    </>
  );
};
export default UsersPage;
