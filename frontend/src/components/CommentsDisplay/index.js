import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCommentsFeed} from '../../store/comments';
import { getUsers } from '../../store/users';


const CommentDisplay = ({tweetId, commentsProp}) =>{
    const dispatch = useDispatch()

    useEffect(() => {

         dispatch(getCommentsFeed());
         dispatch(getUsers());



    }, [dispatch, tweetId])

    const commentsArray= useSelector(state => state.comments)
    const comments= Object.values(commentsArray)
    const filtered= comments.filter(comment=> comment.tweetId === tweetId)

    const usersArray= useSelector(state => state.users)
    const users= Object.values(usersArray)
    const filteredUsers= users.filter(user=> user.id === tweetId)


    return(
        <div>
        <div >
        { filtered.map((comment) => {
              return (
                <div>
                {comment.comment}
                </div>
              );

            })}
        </ div>
      </div>
    )

}


export default CommentDisplay;
