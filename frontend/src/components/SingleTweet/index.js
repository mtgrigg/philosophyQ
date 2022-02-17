import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getSingleTweet} from '../../store/tweets';
import { Link, useHistory  } from 'react-router-dom';
import { getComments } from '../../store/comments';
import { getUsers } from '../../store/users';
import CommentDisplay from '../CommentsDisplay';
import UserDisplay from '../UsersDisplay';
import EditTweet from '../EditTweet';
import {deleteTweet} from '../../store/tweets'
import CreateComment from '../CreateComment';
// import user from '../../../../backend/db/models/user';
import EditComment from '../EditComment';




const SingleTweet = ({tweetss}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { tweetId } = useParams();



    const comments= useSelector(state => state.comments)
    const commentsArray= Object.values(comments)
    const filteredComments = commentsArray.filter(comment => comment.tweetId===tweetId)

    const users = useSelector(state=>state.users)
    const usersArray= Object.values(users)
    console.log(usersArray, 'THIS IS USERS ARRAY')
    const userz= users[tweetId]
    const filteredUsers= usersArray.filter(user => user.id === tweetss)

    const tweets = useSelector(state => state.tweet);
    const tweetsArray= Object.values(tweets)
    const tweetz = tweets[tweetId]
    const tweetUserId = tweetsArray.map(tweet => tweet.userId)

const [loaded,setLoaded]= useState(false)

    console.log(tweetsArray, 'THIS IS TWEETSARRAY')

    const currentUser = useSelector(state => state.session.user);
const currentUserId = currentUser?.id

    // useEffect(()=>{

    //     setTid(tweetId)
    // }, [])

    useEffect(()=>{


          dispatch(getSingleTweet(tweetId));
          dispatch(getComments(tweetId))
        dispatch(getUsers())


    }, [dispatch])

    const handleDeleteButton = async (e) => {
        e.preventDefault();
        const doDelete = await dispatch(deleteTweet(tweetz));

          history.push("/tweets");



      }


    return(
        <>
       {/* {currentUserId === tweetz?.userId && <div>{currentUser?.username}</div>} */}

        {usersArray.map((user)=>{

            return(
                <>
                <div>

                { tweetsArray.filter(tweet=>tweet.userId === user.id).map((tweet)=>{
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
        <EditTweet  tweetTweet={tweetz?.tweet} tweetImg={tweetz?.imgUrl} tweetId={tweetz?.id}/>
        <div >
           <button  onClick={handleDeleteButton}>Delete Tweet</button>
        </div>
        {/* { commentsArray.filter(comment=> comment?.tweetId === tweetss?.id).map((comment)=>{

            return(
                <>
       <div key={comment.id}>{comment?.comment}</div>
       </>
            )
        })} */}
          <CreateComment  tweetId={tweetz?.id}/>
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
