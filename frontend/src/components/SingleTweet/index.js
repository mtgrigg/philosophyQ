import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getSingleTweet} from '../../store/tweets';
import { Link } from 'react-router-dom';
import { getComments } from '../../store/comments';
import { getUsers } from '../../store/users';
import CommentDisplay from '../CommentsDisplay';
import UserDisplay from '../UsersDisplay';
// import user from '../../../../backend/db/models/user';




const SingleTweet = ({tweetss}) => {
    const dispatch = useDispatch();

    const { tweetId } = useParams();



    const comments= useSelector(state => state.comments)
    const commentsArray= Object.values(comments)
    const filteredComments = commentsArray.filter(comment => comment.tweetId===tweetId)

    const users = useSelector(state=>state.users)
    const usersArray= Object.values(users)
    const userz= users[tweetId]
    const filteredUsers= usersArray.filter(user => user.id === tweetss)

    const tweets = useSelector(state => state.tweet);
    const tweetsArray= Object.values(tweets)
    const tweetz = tweets[tweetId]
    const tweetUserId = tweetsArray.map(tweet => tweet.userId)



    console.log(tweetUserId, 'THIS IS TWEET')

    const currentUser = useSelector(state => state.session.user);
const currentUserId = currentUser?.id

    useEffect(()=>{
        (async ()=> {

           await  dispatch(getSingleTweet(tweetId));
           await  dispatch(getComments(tweetId))
          await  dispatch(getUsers())



        })()






    }, [dispatch, tweetId])


    return(
        <>
       {/* {currentUserId === tweetz?.userId && <div>{currentUser?.username}</div>} */}

        {usersArray.map((user)=>{

            return(
                <>
                <div>
                {tweetsArray.filter(tweet=>tweet.userId === user.id).map((tweet)=>{
                        return(
                            <>
                            <div>
                                 <div> {user.username}</div>
                                <img src={user.imgUrl} alt=''/>
                                </div>
                                 {/* <div>{tweet?.tweet}</div> */}
                                 </>
                        )
                })}
                </div>
                <div>
              {/* {user.id === tweetUserId[0]  && <div>{user.username}</div>} */}
              </div>
              </>
            )

        })}

        {/* <img src= {userz?.imgUrl} alt=''/> */}
        {/* <div>{userz?.username}</div> */}
        <div>{tweetz?.tweet}</div>
        <img src={tweetz?.imgUrl} alt=''/>
        {/* { commentsArray.filter(comment=> comment?.tweetId === tweetss?.id).map((comment)=>{

            return(
                <>
       <div key={comment.id}>{comment?.comment}</div>
       </>
            )
        })} */}
         { commentsArray.map((comment)=>{

return(
    <>
<div key={comment.id}>{comment?.comment}</div>
</>
)
})}
        <CommentDisplay tweetId={tweetss?.id}/>


      </>
    )



}
export default SingleTweet
