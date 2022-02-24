import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCommentsFeed} from '../../store/comments';
import CommentButtons from '../EditComment';
import "./CommentsDisplay.css";


const CommentDisplay = ({tweetId, commentsProp}) =>{
    const dispatch = useDispatch()

    useEffect(() => {

         dispatch(getCommentsFeed());

    }, [dispatch, tweetId])

    const commentsArray= useSelector(state => state.comments)
    const comments= Object.values(commentsArray)
    const filtered= comments.filter(comment=> comment.tweetId === tweetId)


    return(
      //   <div>
      //   <div >
      //   { filtered.map((comment) => {
      //         return (
      //             <>
      //           <div>
      //           {/* <CommentButtons key={comment.id} commentInfo={comment} tweetId={comment.tweetId}/> */}
      //           {comment.comment}
      //           ---this is the comment---

      //           </div>


      //           </>
      //         );

      //       })}
      //   </ div>
      // </div>
      <>
      <div className='commentsDisplayTweetFeed'>
<i class="fas fa-comment" id='commentIcon' ></i>

      <div className='numberOfComments'>

      {filtered.length > 0 && filtered.length }
      </div>
      </div>
      </>
    )

}


export default CommentDisplay;
