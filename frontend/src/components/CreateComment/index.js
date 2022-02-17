import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  {createComment}  from '../../store/comments';
import { useHistory } from 'react-router-dom';
import { getComments } from '../../store/comments';


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

      if(newTweet){
        history.push(`/tweets/${tweetId}`);
      }


  };



  return (
    <div >
      { userId && (
        <form onSubmit={handleSubmit}>

          <h1 > Create Comment </h1>
          <div >
      </div>
          <input
            type="text"
            placeholder="Make new comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button  type="submit">Create new comment</button>
        </form>
        )
      }
    </div>

   )


}




export default CreateComment;
