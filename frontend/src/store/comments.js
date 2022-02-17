import { csrfFetch } from './csrf';

const GET = 'comments/GET';
const ADD = 'comments/ADD';
const UPDATE = 'comments/UPDATE'
const REMOVE = 'comments/REMOVE'



const getComment = comments => ({
    type: GET,
    comments,
  });

  const addComment =comment => ({
    type: ADD,
    comment,
  });

  const removeComment = commentId => ({
    type: REMOVE,
    commentId,
  });

  export const deleteComment = (comment) => async dispatch => {
    const response = await csrfFetch(`/api/tweets/${comment.id}/comments`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment),
    })
    if (response.ok) {
      dispatch(removeComment(comment.id))
      return true
    }
  }


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
        case REMOVE: {
          const newState = { ...state };
          delete newState[ action.commentId];
          return newState;
        }
        default: {
            return state;
        }
    }
}


export default commentReducer;
