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
import Navigation from '../Navigation'
import './Tweets.css'


const TweetsPage = () => {

const dispatch = useDispatch();
const history= useHistory();

const user = useSelector(state => state.session.user);
const userId = user?.id


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
    <>
    <div className='feedColumns'>
 {/* <div className='navigationOnFeed' id='left'>
<Navigation />
</div> */}
{/* <div>
    <input type="checkbox" id="animation" />
<label  for="animation">Show animation</label>

<div class="match"></div>

 <div className='tweetFeedBody'>
</div> */}
   <div className='createTweetForm' id='middle'>

       {usersArray.map((user)=>{
           return(
               <div>

           {user?.id === userId && <img src={user.imgUrl} alt='' className='userPhotoNextToCreateATweet'/> }

           {user?.id === userId && <div>@{user.username}</div>}
           </div>
           )
       })}
        <i class="fas fa-check-circle"></i>
     <CreateTweet />
    </div>
    <div className='divider'></div>
<div className='tweetsPage'>
 {/* <div className='createTweetForm'> */}

    {/* </div> */}


<div className='tweetFeedBody'>
    {/* <div className='createTweetForm'>
     <CreateTweet />
    </div> */}

    {/* <div className='tweetArraySingTweetFeedWrapper'> */}

    {tweetArray.reverse().map((tweet)=>{
        return(
            <div className= 'tweetFeedSingleTweetWrapper'>
                 <NavLink key={tweet.id + 1} to={`/tweets/${tweet.id}`} tweet={tweet}>
         <UserDisplay tweetId={tweet.userId}/>

            {/* <SingleTweet tweetss={tweet.id}/> */}
            {/* {tweet.tweet} */}
            {/* <div>{tweet.tweet}</div> */}


        <TweetAssembly key ={tweet.id} tweets={tweet} />
        </NavLink>
        {/* <button onClick={()=>history.push(`/tweets/${tweet.id}`)}>Go to individual tweets page</button> */}
        {/* <CommentDisplay  tweetId={tweet.id}/> */}
        </div>
        )

    }
)}
</div>

</div>

    <div id='footer'>

    </div>
    {/* </div> */}
    </div>
 </>

)


}

export default TweetsPage;
