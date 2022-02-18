import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  {editComment}  from '../../store/comments';
import { useHistory } from 'react-router-dom';
import { getComments, deleteComment } from '../../store/comments';


const EditComment = ({commentInfo}) => {
    const dispatch = useDispatch();
    const history = useHistory();
  const user = useSelector(state => state.session.user);
  const userId= user?.id;


 const [comment, setComment] = useState("");

//  console.log(commentInfo.id, "THIS IS COMMENTINFO")


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
    ...commentInfo,
    comment,

    };


       const editedComment= await dispatch(editComment(payload))




  };

  const handleDelete = (e) => {

    // (async()=>{

    //    await dispatch(deleteComment(targetComment))
    // })()
    dispatch(deleteComment(commentInfo))



//   history.push(`/tweets/${tweetId}`);

}

// console.log(commentInfo, "THIS IS COMMENTIFNO")

  return (
    <div >
      { userId && (
          <>
        <form onSubmit={handleSubmit}>

          <h1 > Edit Comment </h1>
          <div >
      </div>
          <input
            type="text"
            placeholder="Edit comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button  type="submit">Edit comment</button>
        </form>
       {(userId===commentInfo.userId) && <button  onClick={handleDelete}>Delete Comment</button>}
        </>
        )
      }
    </div>

   )


}




export default EditComment;
