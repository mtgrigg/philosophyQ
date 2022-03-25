import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editTweet, deleteTweet } from "../../store/tweets";
import { useHistory } from "react-router-dom";
// import OutsideClickHandler from 'react-outside-click-handler';
import "./EditTweet.css";

const EditTweet = ({
  tweetTweet,
  tweetImg,
  tweetId,
  tweetCreater,
  deleteT,
  hideForm,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const userId = user?.id;
  const id = tweetId;

  const [edit, setEdit] = useState(true);

  const [errors, setErrors] = useState([]);

  // console.log(tweetCreater, "THIS IS id")

  const [imgUrl, setImageUrl] = useState(tweetImg);
  const [tweet, setTweet] = useState(tweetTweet);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id,
      userId: userId,
      imgUrl,
      tweet,
    };

    const newTweet = await dispatch(editTweet(payload)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });

    //
  };

  const handleDeleteButton = (e) => {
    (async () => {
      if (window.confirm("Are you sure you want to delete this tweet?")) {
        await dispatch(deleteTweet(deleteT));
        history.push("/tweets");
      }
    })();
  };

  return (
    <div>
      {/* <OutsideClickHandler
      onOutsideClick={() => {
        hideForm()
      }}
    > */}
      {userId === tweetCreater ? (
        <form onSubmit={handleSubmit}>
          <ol id="errorUl">
            {errors.map((error, idx) => (
              <li id="errorLi" key={idx + 1}>
                {error}
              </li>
            ))}
          </ol>
          <div></div>
          {/* <input
            type="text"
            placeholder="Optional media upload"
            value={imgUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          /> */}
          <textarea
            id="editTweetTextArea"
            type="text"
            placeholder="Create new tweet"
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
          />
                        <div id="editInlineTweetButton">
                        <button id="buttonone" onClick={handleDeleteButton}>
                <i class="fa-solid fa-trash-can "></i>
              </button>

          <button id="buttonone" type="submit">
            Submit edit
          </button>

          </div>
        </form>
      ) : (
        <div> {tweetTweet}</div>
      )}
      {/* </OutsideClickHandler> */}
    </div>
  );
};

export default EditTweet;
