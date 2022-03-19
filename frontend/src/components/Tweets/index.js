import {NavLink, useHistory, Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTweets } from '../../store/tweets';
import { useEffect, useState } from 'react';
import SingleTweet from '../SingleTweet';
import { useParams } from 'react-router-dom';
import TweetAssembly from '../TweetAssembly';
import { getUsers } from '../../store/users';
import CommentDisplay from '../CommentsDisplay';
import UserDisplay from '../UsersDisplay';
import CreateTweet from '../CreateTweet';
import Navigation from '../Navigation'
import './Tweets.css'
import SearchBar from '../SearchBar';
import SearchBarAlt from '../SearchBarAlt';



const TweetsPage = () => {

const dispatch = useDispatch();
const history= useHistory();

const user = useSelector(state => state.session.user);
const userId = user?.id

const [input, setInput] = useState("");

const handleChange= (e) => {
    e.preventDefault();
    setInput(e.target.value)

}

useEffect(() => {

         dispatch(getTweets());
         dispatch(getUsers())



}, [dispatch]);

const tweetObj = useSelector(state=> state.tweet)
let tweetArray= Object.values(tweetObj)

const users = useSelector(state=>state.users)
let usersArray= Object.values(users)




if(input.length >0){
    tweetArray= tweetArray.filter((i)=>{

        return i.tweet.toLowerCase().match(input.toLowerCase())
    })

}


return (
    <>

    <div className='feedColumns'>

{/* this is an alternative search bar that searches or username and tweets but is not live */}
    {/* <SearchBar /> */}

    <div  id="searchFormMeta" >
    <input
    id="searchForm"
        type='text'
        placeholder="Search by keyword(s) in tweet here..."
        onChange={handleChange}
        value={input}
        />
  </div>

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

                   <NavLink  className='navLink'to={`/users/${user.id}`}>
                   <div id='userImgAndName'>
                   <div id='img-container'>
           {user?.id === userId && <img src={user.imgUrl}  alt=' ' onError={(event) => event.target.style.display = 'none'} className='userPhotoNextToCreateATweet'/> }
                </div>
           {user?.id === userId && <div>@{user.username}</div>}
           </div>
           </NavLink>
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
            <div className='tweetCreatedAtTweetsFeed'>{tweet.createdAt}</div>
                 <NavLink  key={tweet.id + 1}  to={`/tweets/${tweet.id}`} tweet={tweet} >

                     <div className='userPhotoTweetFeed'>

         {/* <UserDisplay tweetId={tweet.userId}/> */}
         {usersArray.filter(user=>user.id==tweet.userId).map((user) => {
          return (
            <>
              <img
                src={user.imgUrl}
                alt=""
                className="userProfilePicOnFeed"
                onError={(event) => (event.target.style.display = "none")}
              />
              {/* </div> */}
              <div id="userNameOnTweet">
                @{user.username}
                <i class="fas fa-check-circle" id="checkMark"></i>
              </div>
            </>
          );
        })}

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
