import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../store/comments";
import { useHistory } from "react-router-dom";
import { getComments } from "../../store/comments";
import "./CreateComment.css";

const CreateComment = ({ tweetId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const userId = user?.id;

  const [errors, setErrors] = useState([]);

  const [comment, setComment] = useState("");

  useEffect(() => {
    async function commentText() {
      await dispatch(getComments(tweetId));
    }
    commentText();
  }, [dispatch, tweetId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId: userId,
      comment,
      tweetId,
    };

    const newTweet = await dispatch(createComment(payload)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );

    setComment("");

    if (newTweet) {
      history.push(`/tweets/${tweetId}`);
      setErrors([]);
    }
  };

  return (
    <div>
      {userId && (
        <div className="createCommentWrapper">
          <form id="createCommentForm " onSubmit={handleSubmit}>
            <ol id="errorUl">
              {errors.map((error, idx) => (
                <li id="errorLi" key={idx}>
                  {error}
                </li>
              ))}
            </ol>

            <h3 id="h3Create"> Tweet a reply </h3>

            <textarea
              className="createCommentInput"
              type="text"
              placeholder="Click here to tweet your reply..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button className="createCommentButton" type="submit">
              Tweet
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateComment;
