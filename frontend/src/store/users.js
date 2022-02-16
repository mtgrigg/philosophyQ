import { csrfFetch } from './csrf';



const GET = 'users/GET';


const getUser = users => ({
    type: GET,
    users,
  });


 export const getUsers = () => async dispatch => {
    const response = await csrfFetch(`/api/user`);


    if (response.ok) {
      const users = await response.json();
      dispatch(getUser(users));

    }
  };

  export const getSingleUsers = () => async dispatch => {
    const response = await csrfFetch(`/api/tweets`);


    if (response.ok) {
      const users = await response.json();
      dispatch(getUser(users));

    }
  };

  const initialState = {};
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET: {
        const allUsers = {};
        action.users.forEach(user => {
            allUsers[user.id] = user;
        });
        return {
          ...allUsers,
          // ...state,
      };

      }
      default: {
        return state;
    }
}
  }

  export default userReducer;
