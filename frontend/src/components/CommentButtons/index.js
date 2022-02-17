import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import EditComment from '../EditComment';
import {deleteComment} from '../../store/comments'



const CommentButtons = ({commentInfo}) => {
    const dispatch= useDispatch()
    const user = useSelector(state => state.session.user);
    const userId = user?.id


    const [edit, setEdit] = useState(false);

    // console.log("AM I HERE OR AM I NOT AAAAGHHHHHH")

    const preSession= commentInfo?.userId
    const sessionId = userId === preSession

const handleDelete = (e) => {
    e.preventDefault();
  const deleteInfo =dispatch(deleteComment(commentInfo))

}

return (
    <div>
      <div >

            <p className='pComments'key={commentInfo.id}>
              {commentInfo.comment}
            </p>

           <button className='editCommentButton' onClick={() => setEdit(!edit)}>Edit Comment</button>
           <button className='editDeleteButton' onClick={handleDelete}>Delete Comment</button>
          <div>
             <EditComment info={commentInfo} hideForm={() => setEdit(false)} />
            </div>
            <br />
      </ div>
    </div>
  );

          }
export default CommentButtons;
