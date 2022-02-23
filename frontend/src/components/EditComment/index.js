import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  {editComment}  from '../../store/comments';
import { useHistory } from 'react-router-dom';
import { getComments, deleteComment } from '../../store/comments';
import OutsideClickHandler from 'react-outside-click-handler';


const EditComment = ({commentInfo, hideForm}) => {
    const dispatch = useDispatch();
    const history = useHistory();
  const user = useSelector(state => state.session.user);
  const userId= user?.id;

  // const node = useRef();


 const [comment, setComment] = useState(commentInfo.comment);
 const [edit, setEdit] = useState(false);

//  console.log(commentInfo.id, "THIS IS COMMENTINFO")


  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (node.current.contains(e.target)) {
    //   // inside click
    //   return;
    // }
    // else{

    const payload = {
    ...commentInfo,
    comment,

    };


       const editedComment= await dispatch(editComment(payload))

       if (editedComment) {
        hideForm();
    }
  // }

  };

  const handleDelete = (e) => {

    (async()=>{

       await dispatch(deleteComment(commentInfo))
       hideForm()
    })()


}

// useEffect(() => {
//   // add when mounted
//   document.addEventListener("mousedown", handleSubmit);
//   // return function to be called when unmounted
//   return () => {
//     document.removeEventListener("mousedown", handleSubmit);
//   };
// }, []);

//ref={node} needs to go in parent div

  return (

    <div >
 <OutsideClickHandler
      onOutsideClick={() => {
        hideForm()
      }}
    >


      { userId &&  (
          <>
        <form onSubmit={handleSubmit}>

          {/* <h1 > Edit Comment </h1> */}
          <div >
      </div>
          <input
            type="text"
            placeholder={comment}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

         { <button  type="submit" >Submit Edit comment</button> }

        </form>

        <button  onClick={handleDelete}><i class="fa fa-trash" aria-hidden="true"></i></button>
        </>
        )
      }
        </OutsideClickHandler>
    </div>

    // </div>

   )


}




export default EditComment;
