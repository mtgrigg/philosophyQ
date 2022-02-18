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



const SingleTweet = ({tweetss}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {tweetId} = useParams();
    // console.log(tweetId, "THIS IS TWEETEYEDDD")





  // grab ALL users
    const users = useSelector(state => state?.users)
    const usersArray = Object.values(users)

  // grab ALL tweets
    const tweets = useSelector(state => state?.tweet);
    // console.log(tweets, "THIS IS TWWEETTSSS")
    const tweetsArray = Object.values(tweets)



  const [targetTweet] = tweetsArray.filter(tweet => tweet?.id === +tweetId);
//   console.log(tweetsArray, "THIS IS TARGET TWEET")


  const [targetUser] = usersArray.filter(user => user?.id === targetTweet?.userId);
//   console.log(usersArray, "THIS IS TARGET USSERRR")

    // grab comments
    const comments = useSelector(state => state?.comments)
    const commentsArray = Object.values(comments);
    const [targetComment] = commentsArray.filter(comment => comment?.tweetId === targetTweet?.id);



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

        dispatch(deleteTweet(targetTweet));

          history.push("/tweets");



      }

      const handleDelete = (e) => {

        (async()=>{

           await dispatch(deleteComment(targetComment))
        })()



      history.push(`/tweets/${tweetId}`);

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

        <CreateComment  tweetId={tweetId}/>


         { commentsArray.reverse().map((comment) =>{

return(
    <>
    <EditComment commentInfo={comment}/>
    <button  onClick={handleDelete}>Delete Comment</button>
{tweetz?.id === comment?.tweetId && <div key={comment?.id}>{comment?.comment}</div>}

</>
)
})}
        {/* <CommentDisplay tweetId={tweetss?.id}/> */}


      </>
    )



}
export default SingleTweet
