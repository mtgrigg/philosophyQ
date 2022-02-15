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

    console.log(tweet, "THIS IS TWEET ID")


    useEffect(()=>{
        const singleTweet = dispatch(getSingleTweet(tweetId));
        if(singleTweet){
            return singleTweet
        }
    }, [dispatch, tweetId])


    return(

        <div>{tweet.tweet}</div>
    )



}
export default SingleTweet
