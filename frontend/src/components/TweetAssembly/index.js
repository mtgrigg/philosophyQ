import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTweets } from '../../store/tweets';
import { getComments } from '../../store/comments';
import { getUsers } from '../../store/users';
import SingleTweet from '../SingleTweet';
import CommentDisplay from '../CommentsDisplay';
// import { createTweet } from '../../store/tweets';
import './TweetAssembly.css'


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

// console.log(tweets, "THSI IS BBOBOBOBOB")

return (
    <div className='tweetFeedWrapper'>
<div className="t">{tweets.tweet} ---this is tweet assembly-- this is the tweet </div>
<div><img src={tweets.imgUrl} alt='' onError={(event) => event.target.style.display = 'none'}/> </div>
{/* <img src={tweets.imgUrl} alt=''/> */}
<div className='createdAtAndCommentsDiv'>

<CommentDisplay  tweetId={tweets.id}/>
<div id='createdAtFeed'>{tweets.createdAt}</div>
</div>

</div>

)


}


export default TweetAssembly;
