import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../store/users';


const UserDisplay = ({tweetId, commentsProp}) =>{
    const dispatch = useDispatch()

    useEffect(() => {


         dispatch(getUsers());



    }, [dispatch, tweetId])

    const usersArray= useSelector(state => state.users)
    const users= Object.values(usersArray)
    const filteredUsers= users.filter(user=> user.id === tweetId)


    return(
        <div>
        <div >
        { filteredUsers.map((user) => {
              return (
<>
                <img src={user.imgUrl} alt =''/>
                <div>
                {user.username}
                </div>
</>
              );

            })}
        </ div>
      </div>
    )

}


export default UserDisplay;