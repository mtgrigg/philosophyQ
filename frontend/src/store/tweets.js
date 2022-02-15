import { csrfFetch } from './csrf';

const GET = 'tweets/GET';



const getTweet = tweets => ({
    type:GET,
    tweets
})

export const getTweets = () => async dispatch => {

    const response = await csrfFetch('/api/tweets');

    if(response.ok){
        const tweets = await response.json();

        dispatch(getTweet(tweets))
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

         default:
        return state;
    }


}

export default tweetReducer;
