import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleTweet } from "../../store/tweets";
import { NavLink, useHistory } from "react-router-dom";
import { getComments, deleteComment } from "../../store/comments";
import { getUsers } from "../../store/users";
import { getTweets } from "../../store/tweets";
import CommentDisplay from "../CommentsDisplay";
import UserDisplay from "../UsersDisplay";
import { deleteTweet } from "../../store/tweets";
import EditTweet from "../EditTweet";
import EditComment from "../EditComment";
import CreateComment from "../CreateComment";
import { Redirect } from "react-router-dom";
import "./SingleTweet.css";
import { useState } from "react";
import CommentFunctions from "../CommentFunctions";
import Likes from "../Likes";
import { createLike, getAllLikes } from "../../store/tweets";
import { EditText, EditTextarea } from "react-edit-text";
import { editTweet } from "../../store/tweets";
import { editComment } from "../../store/comments";

const SingleTweet = ({ tweetss }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { tweetId } = useParams();

  const id = tweetId;

  // grab ALL users
  const users = useSelector((state) => state?.users);
  const usersArray = Object.values(users);

  const currentUser = useSelector((state) => state.session.user);
  const currentUserId = currentUser?.id;

  const [edit, setEdit] = useState(false);
  const [editComment, setEditComment] = useState(false);

  // grab ALL tweets
  const tweets = useSelector((state) => state?.tweet);

  const tweetsArray = Object.values(tweets);

  const [targetTweet] = tweetsArray.filter((tweet) => tweet?.id === +tweetId);

  const [targetUser] = usersArray.filter(
    (user) => user?.id === targetTweet?.userId
  );

  const tweetz = tweets[tweetId];
  const tweetUserId = tweetsArray.filter((tweet) => tweet.userId);
  const tweetCommentId = tweetsArray.filter((tweet) => tweet?.id);



  // const [tweet, setTweet] = useState(tweetz?.tweet);
  // const [imgUrl, setImageUrl] = useState("");



  // grab comments
  const comments = useSelector((state) => state?.comments);
  const commentsArray = Object.values(comments);
  const [targetComment] = commentsArray.filter(
    (comment) => comment?.tweetId === targetTweet?.id
  );

  // const [comment, setComment] = useState(targetComment);

  function userCard(user) {
    if (user === undefined) return;
    const { username, imgUrl, bio } = user;
    return (
      <>
        <NavLink className="navLink" to={`/users/${user.id}`}>
          <div className="userInfoSingleTweetPageWrapper">
            <div>
              <img
                src={imgUrl}
                alt=""
                className="userProfilePicOnSingleTweetPage"
                onError={(event) => (event.target.style.display = "none")}
              />
            </div>
            <div className="singletweetUserNameWrapper">
              {/* <div>{username}</div> */}
              <div>@{username}</div>
              <i class="fas fa-check-circle" id="checkMark"></i>
              {/* <div className='singleTweetUserBio'>{bio}</div> */}
            </div>
          </div>
          <br></br>
          {/* <div className='singletweetBioNameWrapper'> */}
          <div className="singletweetBioNameWrapper">{bio}</div>
          {/* </div> */}
        </NavLink>
      </>
    );
  }



  useEffect(() => {
    (async () => {
      await dispatch(getTweets(tweetId));
      await dispatch(getUsers(tweetId));
      await dispatch(getComments(tweetId));
    })();
  }, [dispatch, tweetId]);

  const handleDeleteButton = (e) => {
    (async () => {
      if (window.confirm("Are you sure you want to delete this tweet?")) {
        await dispatch(deleteTweet(targetTweet));
        history.push("/tweets");
      }
    })();
  };

  // const handleSubmitTest = async (e) => {
  //   e.preventDefault();

  //   const payload = {
  //     id,
  //     userId: currentUserId,
  //     imgUrl,
  //     tweet,
  //   };

  //   const newTweet = await dispatch(editTweet(payload));
  // };

  // const handleSubmitComment = async (e) => {
  //   e.preventDefault();

  //   const payload = {
  //     ...targetComment,
  //     comment,
  //   };

  //   const editedComment = await dispatch(editComment(payload))


  // };

  return (
    <>
      {userCard(targetUser)}

      <div className="singleTweetBody2">
        <div className="singleTweetImgAndCreateAt">
          {/* <img src={targetUser.imgUrl} /> */}
          <div id="singleCreatedAt">{tweetz?.createdAt}</div>

          {usersArray.map((users) => {
            return (
              <>
                <NavLink className="navLink" to={`/users/${users.id}`}>
                  <div id="commentsUserNameAndPhoto2">
                    {users?.id === tweetz?.userId && (
                      <img
                        src={users.imgUrl}
                        alt=" "
                        onError={(event) =>
                          (event.target.style.display = "none")
                        }
                        className="userProfilePicOnComment"
                      />
                    )}
                    {users?.id === tweetz?.userId && (
                      <div>@{users.username}</div>
                    )}
                    {users?.id === tweetz?.userId && (
                      <i class="fas fa-check-circle" id="checkMark"></i>
                    )}
                  </div>
                </NavLink>
              </>
            );
          })}

          <img src={tweetz?.imgUrl} alt="" />

          {/* This is the previous way I displayed the tweet body */}
          {/* <div  id="singleTweet"> {tweetz?.tweet}</div> */}



          {/* This is the new edit tweet form that allows inline edits */}
          {/* {currentUserId === tweetz?.userId ? (
            <form  id='inlineEditForm' onSubmit={handleSubmitTest}>
              <textarea
                id="singleTweetInline"
                type="text"
                placeholder={tweet}
                value={tweet}
                onChange={(e) => setTweet(e.target.value)}
              />
              <div id="editInlineTweetButton">

              {tweetz?.userId === currentUserId && targetTweet && (
              <button id="buttonone" onClick={handleDeleteButton}>
                <i class="fa-solid fa-trash-can "></i>
              </button>
            )}
              <button id="buttonone" type="submit">
                Submit edit
              </button>
            </div>
            </form>
          ) : (
            <div id="singleTweet"> {tweetz?.tweet}</div>
          )} */}
           <div id="singleTweet">

                <EditTweet
                  tweetTweet={tweetz?.tweet}
                  tweetImg={tweetz?.imgUrl}
                  tweetId={tweetz?.id}
                  tweetCreater={tweetz?.userId}
                  deleteT={tweetz}
                  hideForm={() => setEdit(false)}
                />



                </div>

{/* This is the button to open the original edit tweet form */}
            {/* {tweetz?.userId === currentUserId && targetTweet && (
              <button id="buttonone" onClick={() => setEdit(!edit)}>
                {" "}
                <i class="fas fa-edit "></i>
              </button>
            )} */}
             {/* <div className="singleTweetsButton"> */}
             
            {/* {tweetz?.userId === currentUserId && targetTweet && (
              <button id="buttonone" onClick={handleDeleteButton}>
                <i class="fa-solid fa-trash-can "></i>
              </button>
            )} */}

{/* This is the orginal edit form-- replaced with inline edit */}
            {/* {edit && (
              <>
                <EditTweet
                  tweetTweet={tweetz?.tweet}
                  tweetImg={tweetz?.imgUrl}
                  tweetId={tweetz?.id}
                  tweetCreater={tweetz?.userId}
                  hideForm={() => setEdit(false)}
                />
              </>
            )} */}

          {/* </div> */}
          {/* <Likes tweetIden={tweets}/> */}
        </div>

        {tweetz?.id && <CreateComment tweetId={tweetId} />}

        {commentsArray.reverse().map((comment1) => {
          return (
            <>
              <div id="singleComment">
                {/* {(tweetz?.id === comment?.tweetId) && <div id='singleCommentCreatedAt' >{comment?.createdAt}</div>} */}
                <div id="commentFunctionCreatedWrapper">
                  {tweetz?.id && (
                    <CommentFunctions
                      id="commentFucntionsButton"
                      commentInfo={comment1}
                    />
                  )}
                  {/* <button  onClick={handleDelete}><i class="fa fa-trash" aria-hidden="true"></i></button> */}
                </div>
                {tweetz?.id === comment1?.tweetId && (
                  <div id="singleCommentText" key={comment1.id}>
                    {comment1?.comment}

                  </div>
                )}

                {usersArray.map((users) => {
                  return (
                    <>
                      <NavLink className="navLink" to={`/users/${users.id}`}>
                      {comment1?.userId === users?.id && (
                          <div id="singleCommentCreatedAt2">
                            {comment1?.createdAt}
                          </div>
                        )}
                        <div id="commentsUserNameAndPhoto">
                          {comment1?.userId === users?.id && (
                            <img
                              src={users.imgUrl}
                              alt=" "
                              onError={(event) =>
                                (event.target.style.display = "none")
                              }
                              className="userProfilePicOnComment"
                            />
                          )}
                          {comment1?.userId === users?.id && (
                            <div>@{users.username}</div>
                          )}

                          {comment1?.userId === users?.id && (
                            <i class="fas fa-check-circle" id="checkMark"></i>

                          )}

                        </div>

                      </NavLink>
                    </>
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
export default SingleTweet;
