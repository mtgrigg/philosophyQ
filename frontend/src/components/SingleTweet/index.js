import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getSingleTweet} from '../../store/tweets';
import { Link } from 'react-router-dom';
import { getComments } from '../../store/comments';
import { getUsers } from '../../store/users';


const SingleTweet = ({tweet}) => {
    const dispatch = useDispatch();

    const { tweetId } = useParams();

    const tweets = useSelector(state => state.tweet);
    const tweetsArray= Object.values(tweets)
    const tweetz = tweets[tweetId]

    const comments= useSelector(state => state.comments)
    const commentsArray= Object.values(comments)
    const filteredComments = commentsArray.filter(comment => comment.tweetId===tweetId)

    const users = useSelector(state=>state.users)
    const usersArray= Object.values(users)
    const userz= users[tweetId]



console.log(userz, 'THIS IS TWEET')

    const currentUser = useSelector(state => state.session.user);
const currentUserId = currentUser?.id

    useEffect(()=>{
            dispatch(getSingleTweet(tweetId));
            dispatch(getComments(tweetId))
            dispatch(getUsers(tweetId))

    }, [dispatch, tweetId])


    return(
        <>
       {currentUserId === tweetz?.userId && <div>{currentUser?.username}</div>}
       {/* {tweetsArray.map((tweetx)=>{
           return(
        <Link key={tweetx?.id} to={`/tweets/${tweetx.id}`}>
                <li>
            {tweetx?.id ? tweetx?.tweet: null}
            </li>

            </Link>
           )
       })} */}

        <div>{userz?.username}</div>
        <img src= {userz?.imgUrl} alt=''/>
        <div>{tweetz?.tweet}</div>
        { commentsArray.map((comment)=>{

            return(
       <div key={comment.id}>{comment?.comment}</div>
            )
        })}


      </>
    )



}
export default SingleTweet
