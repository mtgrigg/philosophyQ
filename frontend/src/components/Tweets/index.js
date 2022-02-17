import {NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTweets } from '../../store/tweets';
import { useEffect } from 'react';
import SingleTweet from '../SingleTweet';
import { useParams } from 'react-router-dom';
import TweetAssembly from '../TweetAssembly';
import { getUsers } from '../../store/users';
import CommentDisplay from '../CommentsDisplay';
import UserDisplay from '../UsersDisplay';
import CreateTweet from '../CreateTweet';


const TweetsPage = () => {

const dispatch = useDispatch();
const history= useHistory();


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

    <CreateTweet />

    {tweetArray.map((tweet)=>{
        return(
            <>
         <UserDisplay tweetId={tweet.userId}/>
        <NavLink key={tweet.id} to={`/tweets/${tweet.id}`} tweet={tweet}>
            {/* <SingleTweet tweetss={tweet.id}/> */}
            {tweet.tweet}

        </NavLink>
        <TweetAssembly tweets={tweet} />
        {/* <button onClick={()=>history.push(`/tweets/${tweet.id}`)}>Go to individual tweets page</button> */}
        {/* <CommentDisplay  tweetId={tweet.id}/> */}
        </>
        )

    }
)}

</div>

)


}

export default TweetsPage;
