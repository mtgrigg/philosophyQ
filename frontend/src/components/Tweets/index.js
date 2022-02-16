import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTweets } from '../../store/tweets';
import { useEffect } from 'react';
import SingleTweet from '../SingleTweet';
import { useParams } from 'react-router-dom';


const TweetsPage = () => {

const dispatch = useDispatch();


// useEffect(()=>{
//  dispatch(getTweets());


// }, [dispatch])

useEffect(() => {

         dispatch(getTweets());



}, [dispatch]);

const tweetObj = useSelector(state=> state.tweet)
const tweetArray= Object.values(tweetObj)



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
    {tweetArray.map((tweet)=>{
            return(
            <NavLink key={tweet.id} to={`/tweets/${tweet.id}`} tweet={tweet}>
        <div >
            {tweet.tweet}
            </div>
            </NavLink>
            )
        // return <SingleTweet key={tweet.id} tweet={tweet} />


    })}

</div>

)


}

export default TweetsPage;
