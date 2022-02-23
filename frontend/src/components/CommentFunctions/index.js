import { useSelector, useDispatch } from 'react-redux';

import EditComment from '../EditComment';
import { useState , useEffect, useRef } from 'react';



const CommentFunctions = ({commentInfo}) => {
    const dispatch= useDispatch()
    const user = useSelector(state => state.session.user);
    const userId = user?.id





    const [edit, setEdit] = useState(false);

    const preSession= commentInfo?.userId
    const sessionId = userId === preSession


return (
    <div >

      <div >
          {/* {!edit &&
            <p className='pComments'key={commentInfo.id}>
              {commentInfo.comment}
            </p>} */}

          {(sessionId && !edit  ) && <button className='editCommentButton' onClick={() => setEdit(!edit) }><i class="fa-solid fa-bars"></i></button>}

          <div>
            {edit && <EditComment commentInfo={commentInfo} hideForm={() => setEdit(false)} /> }
            </div>
            <br />
      </ div>
    </div>

  );

          }
export default CommentFunctions;
