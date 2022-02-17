import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getSingleTweet} from '../../store/tweets';
import { Link, useHistory  } from 'react-router-dom';
import { getComments } from '../../store/comments';
import { getUsers } from '../../store/users';
import { getTweets } from '../../store/tweets';
import CommentDisplay from '../CommentsDisplay';
import UserDisplay from '../UsersDisplay';
import {deleteTweet} from '../../store/tweets'
import EditTweet from '../EditTweet';



const SingleTweet = ({tweetss}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {tweetId} = useParams();
    // console.log(tweetId, "THIS IS TWEETEYEDDD")

  // grab comments
    const comments = useSelector(state => state.comments)
    const commentsArray = Object.values(comments);

  // grab ALL users
    const users = useSelector(state => state.users)
    const usersArray = Object.values(users)

  // grab ALL tweets
    const tweets = useSelector(state => state.tweet);
    // console.log(tweets, "THIS IS TWWEETTSSS")
    const tweetsArray = Object.values(tweets)

  const [targetTweet] = tweetsArray.filter(tweet => tweet.id === +tweetId);
//   console.log(targetTweet, "THIS IS TARGET TWEET")


  const [targetUser] = usersArray.filter(user => user.id === targetTweet.userId);
//   console.log(targetUser, "THIS IS TARGET USSERRR")

  function userCard(user) {

    if (user === undefined) return;
    const {username, imgUrl, bio} = user;
    return (
      <>
        <div>
          <div>{username}</div>
          <div>{bio}</div>
          <img src={imgUrl} alt='' />
        </div>
      </>
    );
  }


    const tweetz = tweets[tweetId]
    const tweetUserId = tweetsArray.filter(tweet => tweet.userId)

    const currentUser = useSelector(state => state.session.user);
    const currentUserId = currentUser?.id

    useEffect(() => {
      dispatch(getTweets());
      dispatch(getUsers());
      dispatch(getComments(tweetId));
    }, [dispatch])



        const handleDeleteButton = (e) => {

        dispatch(deleteTweet(targetTweet));

          history.push("/tweets");



      }

    return(
        <>

<div >
           <button  onClick={handleDeleteButton}>Delete Tweet</button>
        </div>
          {userCard(targetUser)}

       {/* {currentUserId === tweetz?.userId && <div>{currentUser?.username}</div>} */}
        {/* <img src= {userz?.imgUrl} alt=''/> */}
        {/* <div>{userz?.username}</div> */}
        <div>{tweetz?.tweet}</div>
        <img src={tweetz?.imgUrl} alt=''/>
        <EditTweet  tweetTweet={tweetz?.tweet} tweetImg={tweetz?.imgUrl} tweetId={tweetz?.id}/>


         { commentsArray.map((comment)=>{

return(
    <>
{tweetz.id === comment.tweetId && <div key={comment.id}>{comment?.comment}</div>}
</>
)
})}
        {/* <CommentDisplay tweetId={tweetss?.id}/> */}


      </>
    )



}
export default SingleTweet
