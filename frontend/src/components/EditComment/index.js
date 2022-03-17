import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editComment } from "../../store/comments";
import { useHistory } from "react-router-dom";
import { getComments, deleteComment } from "../../store/comments";
import OutsideClickHandler from "react-outside-click-handler";
import "./EditComment.css";

const EditComment = ({ commentInfo, hideForm }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const userId = user?.id;

  // const node = useRef();

  const [comment, setComment] = useState(commentInfo.comment);
  const [edit, setEdit] = useState(false);

  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...commentInfo,
      comment,
    };

    const editedComment = await dispatch(editComment(payload)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );

    if (editedComment) {
      hideForm();
    }
    // }
  };

  const handleDelete = (e) => {
    (async () => {

      if( window.confirm('Are you sure you want to delete this tweet comment?')){
         await dispatch(deleteComment(commentInfo));
      }





      hideForm();
    })();
  };

  return (
    <div>
      <OutsideClickHandler
        onOutsideClick={() => {
          hideForm();
        }}
      >
        {userId && (
          <>
            <div id="editCommentForm">
              <form onSubmit={handleSubmit}>
                <ol id="errorUl">
                  {errors.map((error, idx) => (
                    <li id="errorLi" key={idx}>
                      {error}
                    </li>
                  ))}
                </ol>

                <textarea
                  id="editCommentTextArea"
                  type="text"
                  placeholder={comment}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                {
                  <button id="editCommentButton" type="submit">
                    Edit Tweet
                  </button>
                }
              </form>

              <button id="editCommentButton2" onClick={  handleDelete }>
                <i class="fa fa-trash fa-2x" aria-hidden="true"></i>
              </button>
            </div>
          </>
        )}
      </OutsideClickHandler>
    </div>

    // </div>
  );
};

export default EditComment;
