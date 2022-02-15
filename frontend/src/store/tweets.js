import { csrfFetch } from './csrf';

const GET = 'tweets/GET';
const ADD = 'tweets/ADD';



const getTweet = tweets => ({
    type:GET,
    tweets
})

const addTweet = tweet => ({
    type:ADD,
    tweet
})

export const getTweets = () => async dispatch => {

    const response = await csrfFetch('/api/tweets');

    if(response.ok){
        const tweets = await response.json();

        dispatch(getTweet(tweets))
    }

}

export const getSingleTweet = (tweetId) => async dispatch => {
    const response = await csrfFetch(`/api/tweets/${tweetId}`)
    if(response.ok){
        const tweet= await response.json();
        dispatch(addTweet(tweet))
    }

}


const intialState = {};

const tweetReducer = (state= intialState, action) =>{
    let newState = {};
    switch(action.type){

        case GET:
            action.tweets.forEach(tweet => {
                newState[tweet.id]= tweet;

            });
            return {...state, ...newState}
        case ADD:
            return{...state, [action.tweet.id]:action.tweet}

         default:
        return state;
    }


}

export default tweetReducer;
