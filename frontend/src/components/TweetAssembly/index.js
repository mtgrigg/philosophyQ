import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTweets } from '../../store/tweets';
import { getComments } from '../../store/comments';
import { getUsers } from '../../store/users';
import SingleTweet from '../SingleTweet';
import CommentDisplay from '../CommentsDisplay';


const TweetAssembly = ({tweets}) => {
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getTweets());
        dispatch(getComments(tweets.id))
        dispatch(getUsers(tweets.id))

}, [dispatch]);

const tweetObj = useSelector(state=> state.tweet)
const tweetArray= Object.values(tweetObj)
const tweetz= tweetArray[tweets.id]

const comments= useSelector(state => state.comments)
const commentsArray= Object.values(comments)
const filteredComments= commentsArray.filter(comment=>comment.tweetId == tweets.id)


const users = useSelector(state=>state.users)
const usersArray= Object.values(users)

console.log(tweets.id, "THSI IS TWEETS")

return (
    <>
<div>{tweets.tweet}</div>
{/* <CommentDisplay  tweetId={tweets.id}/> */}
</>

)


}


export default TweetAssembly;
