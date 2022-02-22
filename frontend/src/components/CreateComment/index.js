import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  {createComment}  from '../../store/comments';
import { useHistory } from 'react-router-dom';
import { getComments } from '../../store/comments';
import "./CreateComment.css";


const CreateComment = ({tweetId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
  const user = useSelector(state => state.session.user);
  const userId= user?.id;


 const [comment, setComment] = useState("");

 useEffect(() => {
    async function commentText() {
      await dispatch(getComments(tweetId));
    }
    commentText();
}, [dispatch, tweetId])


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
    userId:userId,
    comment,
    tweetId
    };


       const newTweet= await dispatch(createComment(payload))

       setComment("")

      if(newTweet){
        history.push(`/tweets/${tweetId}`);
      }


  };



  return (
    <div >
      { userId && (
        <div className='createCommentWrapper'>
        <form id='createCommentForm 'onSubmit={handleSubmit}>

          <h3 id='h3Create'> Tweet a reply </h3>

          <textarea
          className='createCommentInput'
            type="text"
            placeholder="Tweet your reply..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button className='createCommentButton' type="submit">Tweet</button>
        </form>
        </div>
        )
      }
    </div>

   )


}




export default CreateComment;
