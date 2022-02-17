import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCommentsFeed} from '../../store/comments';
import EditComment from '../EditComment';


const CommentDisplay = ({tweetId, commentsProp}) =>{
    const dispatch = useDispatch()

    useEffect(() => {

         dispatch(getCommentsFeed());

    }, [dispatch, tweetId])

    const commentsArray= useSelector(state => state.comments)
    const comments= Object.values(commentsArray)
    const filtered= comments.filter(comment=> comment.tweetId === tweetId)


    return(
        <div>
        <div >
        { filtered.map((comment) => {
              return (
                  <>
                <div>
                {/* <EditComment commentInfo={comment}/> */}
                {comment.comment}
                ---this is the comment---

                </div>


                </>
              );

            })}
        </ div>
      </div>
    )

}


export default CommentDisplay;
