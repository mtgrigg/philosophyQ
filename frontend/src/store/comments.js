import { csrfFetch } from './csrf';

const GET = 'comments/GET';



const getComment = comments => ({
    type: GET,
    comments,
  });


  export const getComments = (tweetId) => async dispatch => {
    const response = await csrfFetch(`/api/tweets/${tweetId}/comments`);


    if (response.ok) {
      const comments = await response.json();
      dispatch(getComment(comments));

    }
  };


  const initialState = {};
        const commentReducer = (state = initialState, action) => {
          switch (action.type) {
            case GET: {
              const allComments = {};
              action.comments.forEach(comment => {
                  allComments[comment.id] = comment;
              });
              return {
                ...allComments,
                // ...state,
            };

        }
        default: {
            return state;
        }
    }
}


export default commentReducer;
