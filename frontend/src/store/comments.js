import { csrfFetch } from './csrf';

const GET = 'comments/GET';
const ADD = 'comments/ADD';
const UPDATE = 'comments/UPDATE'



const getComment = comments => ({
    type: GET,
    comments,
  });

  const addComment =comment => ({
    type: ADD,
    comment,
  });


  export const createComment = (comment) => async dispatch => {
    const response = await csrfFetch(`/api/tweets/${comment.tweetId}/comments`, {
      method: 'POST',
      body: JSON.stringify(comment),
    })

    if (response.ok) {
      const newComment = await response.json();
      const comment = await dispatch(addComment(newComment))
      return comment;
    }

  }

  export const editComment = (info) => async dispatch => {
    const response = await csrfFetch(`/api/tweets/${info.id}/comments`, {
      method: 'PUT',
      body: JSON.stringify(info),
    })
    if (response.ok) {
      const editedComment = await response.json();
      dispatch(addComment(editedComment))
      return editedComment;
    }
  }


  export const getComments = (tweetId) => async dispatch => {
    const response = await csrfFetch(`/api/tweets/${tweetId}/comments`);


    if (response.ok) {
      const comments = await response.json();
      dispatch(getComment(comments));

    }
  };

  export const getCommentsFeed = () => async dispatch => {
    const response = await csrfFetch(`/api/comments`);


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
        case ADD:  return {...state, [action.comment.id]: action.comment}

        case UPDATE:{
          return {
              ...state,
              [action.comment.id]: {
                ...state[action.comment.id],
                ...action.comment,
              }
            };
        }
        default: {
            return state;
        }
    }
}


export default commentReducer;
