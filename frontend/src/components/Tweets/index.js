import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTweets } from '../../store/tweets';
import { useEffect } from 'react';


const TweetsPage = () => {

const dispatch = useDispatch();

useEffect(()=>{
const getAllTweets= dispatch(getTweets());
return getAllTweets

}, [dispatch])

const tweetObj = useSelector(state=> state.tweet)
const tweetArray= Object.values(tweetObj)

console.log(tweetArray, "THIS IS TWEET ARRAY")

return (

<div>
    {tweetArray.map((tweet)=>{
        return(
            <NavLink key={tweet.id} to={`/tweets/${tweet.id}`}>
        <div >
            {tweet.tweet}
            </div>
            </NavLink>
        )

    })}
</div>

)


}

export default TweetsPage;
