import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getSingleTweet} from '../../store/tweets';


const SingleTweet = () => {
    const dispatch = useDispatch();


    const { tweetId } = useParams();

    const tweets = useSelector(state => state.tweet);
    const tweet = tweets[tweetId]

    const user = useSelector(state => state.session.user);
const userId = user?.id

console.log(user, "THIS IS USER")
    console.log(tweet, "THIS IS TWEET")


    useEffect(()=>{
         dispatch(getSingleTweet(tweetId));


    }, [dispatch, tweetId])


    return(
        <>
       {userId === tweet?.userId && <div>{user?.username}</div>}
        <div>{tweet?.tweet}</div>

      </>
    )



}
export default SingleTweet
