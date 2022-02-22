import {NavLink, useHistory, Link} from 'react-router-dom';
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
        {/* <i class="fas fa-check-circle"></i> */}
     <CreateTweet />
    </div>
    <div id='wrapLogos'>
    <a id='test3' href='https://www.linkedin.com/in/maxim-grigg-42a4451a9/' >

<i class="fa-brands fa-linkedin fa-6x"></i>

</a>
<a id='test2' href='https://github.com/mtgrigg' >

<i class="fa-brands fa-github fa-6x"></i>

</a>
</div>


<div className='tweetFeedBody'>

    {/* <div className='createTweetForm'>
     <CreateTweet />
    </div> */}

    {/* <div className='tweetArraySingTweetFeedWrapper'> */}



    {tweetArray.reverse().map((tweet)=>{
        return(
            <>
            <div className= 'tweetFeedSingleTweetWrapper' id='item2'>
                 <NavLink  key={tweet.id + 1} to={`/tweets/${tweet.id}`} tweet={tweet}>
                     <div className='userPhotoTweetFeed'>
         <UserDisplay tweetId={tweet.userId}/>
         </div>

            {/* <SingleTweet tweetss={tweet.id}/> */}
            {/* {tweet.tweet} */}
            {/* <div>{tweet.tweet}</div> */}


        <TweetAssembly className='test' key ={tweet.id} tweets={tweet} />
        </NavLink>

        {/* <button onClick={()=>history.push(`/tweets/${tweet.id}`)}>Go to individual tweets page</button> */}
        {/* <CommentDisplay  tweetId={tweet.id}/> */}
        </div>

        </>
        )

    }
)}


</div>


</div>
<div id='footer'>
   <img src='https://pixy.org/download/1616150/' id='one'alt=''/>
   <img src='https://pixy.org/download/1616150/' id='two' alt=''/>
</div>

    {/* </div> */}
    {/* </div> */}
 </>

)


}

export default TweetsPage;
