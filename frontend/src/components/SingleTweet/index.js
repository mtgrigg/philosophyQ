import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getSingleTweet} from '../../store/tweets';
import { Link, useHistory  } from 'react-router-dom';
import { getComments, deleteComment } from '../../store/comments';
import { getUsers } from '../../store/users';
import { getTweets } from '../../store/tweets';
import CommentDisplay from '../CommentsDisplay';
import UserDisplay from '../UsersDisplay';
import {deleteTweet} from '../../store/tweets'
import EditTweet from '../EditTweet';
import EditComment from '../EditComment';
import CreateComment from '../CreateComment';
import { Redirect } from "react-router-dom";
import './SingleTweet.css'
import { useState } from 'react';



const SingleTweet = ({tweetss}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {tweetId} = useParams();
    // console.log(tweetId, "THIS IS TWEETEYEDDD")

    const [edit, setEdit] = useState(false);



  // grab ALL users
    const users = useSelector(state => state?.users)
    const usersArray = Object.values(users)

    // console.log(usersArray, "THIS IS USERSARRAY")

  // grab ALL tweets
    const tweets = useSelector(state => state?.tweet);

    const tweetsArray = Object.values(tweets)



  const [targetTweet] = tweetsArray.filter(tweet => tweet?.id === +tweetId);
//   console.log(tweetsArray, "THIS IS TARGET TWEET")


  const [targetUser] = usersArray.filter(user => user?.id === targetTweet?.userId);
//   console.log(usersArray, "THIS IS TARGET USSERRR")

    // grab comments
    const comments = useSelector(state => state?.comments)
    const commentsArray = Object.values(comments);
    const [targetComment] = commentsArray.filter(comment => comment?.tweetId === targetTweet?.id);

    // const [commentUserId] = commentsArray.map(comment => comment?.userId);
    // console.log(commentUserId, "THIS IS CommentUSERID")


    // const [commentsUser] = usersArray.filter(user => user?.id=== usersComment.userId);

    //   console.log(commentsUser.id,"THIS IS USERSCOMMENT")



  function userCard(user) {

    if (user === undefined) return;
    const {username, imgUrl, bio} = user;
    return (
      <>
        <div>
          <div>{username}</div>
          <div>{bio}</div>
          <img src={imgUrl} alt=''  className='userProfilePicOnSingleTweetPage'/>
        </div>
      </>
    );
  }


    const tweetz = tweets[tweetId]
    const tweetUserId = tweetsArray.filter(tweet => tweet.userId)
    const tweetCommentId = tweetsArray.filter(tweet => tweet?.id)

    const currentUser = useSelector(state => state.session.user);
    const currentUserId = currentUser?.id

    useEffect(() => {
        (async()=>{
            await dispatch(getTweets(tweetId));
            await dispatch(getUsers(tweetId));
            await dispatch(getComments(tweetId));

        })()
    //   dispatch(getTweets(tweetId));
    //   dispatch(getUsers(tweetId));
    //   dispatch(getComments(tweetId));
    }, [dispatch, tweetId])



        const handleDeleteButton = (e) => {

        // dispatch(deleteTweet(targetTweet));

         (async()=>{

           await dispatch(deleteTweet(targetTweet));

              history.push("/tweets");
        })();






      }

      const handleDelete = (e) => {

        // (async()=>{

        //    await dispatch(deleteComment(targetComment))
        // })()
        dispatch(deleteComment(targetComment))

//i dont think this is being used here anymore

    //   history.push(`/tweets/${tweetId}`);

    }

    // console.log(tweetz, 'THIS IS TWEETzzzz')

    return(
        <>

<div >
          {(tweetz?.userId === currentUserId) && <button  onClick={handleDeleteButton}>Delete Tweet</button>}
        </div>
          {userCard(targetUser)}

       {/* {currentUserId === tweetz?.userId && <div>{currentUser?.username}</div>} */}
        {/* <img src= {userz?.imgUrl} alt=''/> */}
        {/* <div>{userz?.username}</div> */}
        <div>{tweetz?.tweet}</div>
        <div>{tweetz?.createdAt}</div>
        <img src={tweetz?.imgUrl} alt=''/>
        {(tweetz?.userId === currentUserId) && <button  onClick={() => setEdit(!edit)}>Edit Tweet</button>}
        {edit && <EditTweet  tweetTweet={tweetz?.tweet} tweetImg={tweetz?.imgUrl} tweetId={tweetz?.id} tweetCreater={tweetz?.userId} hideForm={() => setEdit(false)} />}

        <CreateComment  tweetId={tweetId}/>


         { commentsArray.reverse().map((comment) =>{

return(
    <>
     {(comment?.userId === currentUserId) && <button  onClick={() => setEdit(!edit)}>Edit Comment</button>}
   {(comment?.userId === currentUserId) && edit && <EditComment commentInfo={comment} hideForm={() => setEdit(false)}/>}
   {/* {(comment?.userId === currentUserId) &&  <CommentDisplay tweetId={tweetId} commentInfo={comment} />} */}

{(tweetz?.id === comment?.tweetId) && <div key={comment.id}>{comment?.comment}</div>}
{(tweetz?.id === comment?.tweetId) && <div >{comment?.createdAt}</div>}
{/* {comment?.userId == usersArray?.id  && <div>{usersArray.username}</div>} */}
{/* {(comment?.userId === currentUserId) &&<button  onClick={handleDelete}>Delete Comment</button>} */}
{usersArray.map((users)=>{

    return(
        <>
         {comment?.userId === users?.id  && <div>{users.username}</div>}
         {comment?.userId === users?.id  && <img src={users.imgUrl} alt='' className='userProfilePicOnComment'/>}
         </>
    )
})}
</>
)
})}
        {/* <CommentDisplay tweetId={tweetss?.id}/> */}


      </>
    )



}
export default SingleTweet
