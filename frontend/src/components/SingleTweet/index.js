import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getSingleTweet} from '../../store/tweets';
import { Link } from 'react-router-dom';
import { getComments } from '../../store/comments';


const SingleTweet = ({tweet}) => {
    const dispatch = useDispatch();

    const { tweetId } = useParams();

    const tweets = useSelector(state => state.tweet);
    const tweetsArray= Object.values(tweets)
    const tweetz = tweets[tweetId]

    const comments= useSelector(state => state.comments)
    const commentsArray= Object.values(comments)
    const filteredComments = commentsArray.filter(comment => comment.tweetId===tweetId)


console.log(commentsArray, 'THIS IS TWEET')

    const user = useSelector(state => state.session.user);
const userId = user?.id

    useEffect(()=>{
            dispatch(getSingleTweet(tweetId));
            dispatch(getComments(tweetId))

    }, [dispatch, tweetId])


    return(
        <>
       {userId === tweetz?.userId && <div>{user?.username}</div>}
       {/* {tweetsArray.map((tweetx)=>{
           return(
        <Link key={tweetx?.id} to={`/tweets/${tweetx.id}`}>
                <li>
            {tweetx?.id ? tweetx?.tweet: null}
            </li>

            </Link>
           )
       })} */}


        <div>{tweetz?.tweet}</div>
        { commentsArray.map((comment)=>{

            return(
       <div>{comment?.comment}</div>
            )
        })}


      </>
    )



}
export default SingleTweet
