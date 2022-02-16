import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTweets } from '../../store/tweets';
import { useEffect } from 'react';
import SingleTweet from '../SingleTweet';
import { useParams } from 'react-router-dom';
import TweetAssembly from '../TweetAssembly';
import { getUsers } from '../../store/users';
import CommentDisplay from '../CommentsDisplay';
import UserDisplay from '../UsersDisplay';


const TweetsPage = () => {

const dispatch = useDispatch();


// useEffect(()=>{
//  dispatch(getTweets());


// }, [dispatch])

useEffect(() => {

         dispatch(getTweets());
         dispatch(getUsers())



}, [dispatch]);

const tweetObj = useSelector(state=> state.tweet)
const tweetArray= Object.values(tweetObj)

const users = useSelector(state=>state.users)
const usersArray= Object.values(users)





return (

<div>
    {/* {tweetArray.map((tweet)=>{
        return(
            <NavLink key={tweet.id} to={`/tweets/${tweet.id}`}>
        <div >
            {tweet.tweet}
            </div>
            </NavLink>
        )

    })} */}
    {/* {tweetArray.map((tweet)=>{
            return(
            <NavLink key={tweet.id} to={`/tweets/${tweet.id}`} tweet={tweet}>
        <div >

            {tweet.tweet}
            </div>
            </NavLink>
            )



    })} */}

    {tweetArray.map((tweet)=>{
        return(
            <>
         <UserDisplay tweetId={tweet.id}/>
        <NavLink key={tweet.id} to={`/tweets/${tweet.id}`} tweet={tweet}>

            <TweetAssembly tweets={tweet} />
        </NavLink>
        <CommentDisplay  tweetId={tweet.id}/>
        </>
        )

    }
)}

</div>

)


}

export default TweetsPage;
