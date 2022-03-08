import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../store/users';
import './UsersDisplay.css';


const UserDisplay = ({tweetId, commentsProp}) =>{
    const dispatch = useDispatch()

    useEffect(() => {


         dispatch(getUsers());



    }, [dispatch, tweetId])

    const usersArray= useSelector(state => state.users)
    const users= Object.values(usersArray)
    const filteredUsers= users.filter(user=> user.id === tweetId)


    return(
        <div className='userDisplayWrapper'>
        <div >
        { filteredUsers.map((user) => {
              return (
<>

                <img src={user.imgUrl} alt ='' className='userProfilePicOnFeed' onError={(event) => event.target.style.display = 'none'}/>
                 {/* </div> */}
                <div id= 'userNameOnTweet'>

                @{user.username}
                <i class="fas fa-check-circle" id='checkMark'></i>
                </div>

</>
              );

            })}
        </ div>
      </div>
    )

}


export default UserDisplay;
