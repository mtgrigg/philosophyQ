import { csrfFetch } from './csrf';

const GET = 'tweets/GET';
const ADD = 'tweets/ADD';
const UPDATE = 'tweets/UPDATE'
const REMOVE = 'tweets/REMOVE'



const getTweet = tweets => ({
    type:GET,
    tweets
})

const addTweet = tweet => ({
    type:ADD,
    tweet
})

const removeTweet = tweetId => ({
    type: REMOVE,
    tweetId,
  });

export const editTweet = (tweet) => async dispatch => {
    const response = await csrfFetch(`/api/tweets/${tweet.id}`, {
      method: 'PUT',
      body: JSON.stringify(tweet),
    })
    if (response.ok) {
      const editedTweet = await response.json();
      const updated= dispatch(addTweet(editedTweet))
      return updated;
    }
  }

  export const deleteTweet = (tweet) => async dispatch => {
    const response = await csrfFetch(`/api/tweets/${tweet.id}`, {
      method: 'DELETE',
      body: JSON.stringify(tweet),
    })
    if (response.ok) {
      dispatch(removeTweet(tweet.id))
      return true;
    }
  }




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

export const createTweet = ({tweet,imgUrl, userId}) => async dispatch => {
    const response = await csrfFetch(`/api/tweets`, {
      method: 'POST',
      body: JSON.stringify({tweet, imgUrl, userId}),
    })
    if (response.ok) {
      const newTweet = await response.json();
     return await dispatch(addTweet(newTweet))
    }
  }


const intialState = {};

const tweetReducer = (state= intialState, action) =>{

    switch(action.type){

        case GET:
            let newState = {};
            action.tweets.forEach(tweet => {
                newState[tweet.id]= tweet;

            });
            return {...state, ...newState}
        case ADD:{
            return{
                ...state,
                [action.tweet.id]:{

                ...action.tweet}
            }
        }
        case UPDATE:{
            return {
                ...state,
                [action.tweet.id]: {
                  ...state[action.tweet.id],
                  ...action.tweet,
                }
              };
          }
          case REMOVE: {
            const newState = { ...state };
            delete newState[ action.tweetId];
            return newState;
          }

         default:{
        return state;
         }
    }


}

export default tweetReducer;
