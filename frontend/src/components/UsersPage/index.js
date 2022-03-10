import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink} from "react-router-dom";
import { getUsers } from "../../store/users";
import { getTweets } from "../../store/tweets";
import "./UsersPage.css";
import UserDisplay from "../UsersDisplay";
import TweetAssembly from "../TweetAssembly";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  // grab ALL users
  const users = useSelector((state) => state?.users);
  const usersArray = Object.values(users);

  const tweetObj = useSelector((state) => state.tweet);
  const tweetArray = Object.values(tweetObj);

  function userCard(user) {
    if (user === undefined) return;
    const { username, imgUrl, bio } = user;
    return (
      <>
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
            <div>@{username}</div>
            <i class="fas fa-check-circle" id="checkMark"></i>
          </div>
        </div>
        <br></br>

        <div className="singletweetBioNameWrapper">{bio}</div>
      </>
    );
  }

  useEffect(() => {
    (async () => {
      await dispatch(getTweets());
      await dispatch(getUsers());
    })();
  }, [dispatch]);

  return (
    <>
      {usersArray
        .filter((user) => user.id == userId)
        .map((user) => {
          return <>{userCard(user)}</>;
        })}

      <div className="tweetFeedBody">
        {tweetArray
          .filter((tweet) => tweet.userId == userId)
          .reverse()
          .map((tweet) => {
            return (
              <div className="tweetFeedSingleTweetWrapper" id="item2">
                <div className="tweetCreatedAtTweetsFeed">
                  {tweet.createdAt}
                </div>
                <NavLink
                  key={tweet.id + 1}
                  to={`/tweets/${tweet.id}`}
                  tweet={tweet}
                >
                  <div className="userPhotoTweetFeed">
                    <UserDisplay tweetId={tweet.userId} />
                  </div>

                  <TweetAssembly
                    className="test"
                    key={tweet.id}
                    tweets={tweet}
                  />
                </NavLink>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default UsersPage;
