import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./SearchBarAlt.css";

import { getUsers } from "../../store/users";
import { getTweets } from "../../store/tweets";

function SearchBarAlt() {
  const dispatch = useDispatch();

  // grab ALL users
  const user = useSelector((state) => state.session.user);
  const userId = user?.id;

  // grab ALL tweets
  const tweets = useSelector((state) => state?.tweet);
  let tweetsArray = Object.values(tweets);

  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(getTweets());
  }, [dispatch]);

  const handleChange= (e) => {
      e.preventDefault();
      setInput(e.target.value)

  }

  if(input.length >0){
      tweetsArray= tweetsArray.filter((i)=>{
          return i.tweet.toLowerCase().match(input)
      })
  }

  return (
    <div>
        <input
        type='text'
        placholder="search for tweet here"
        onChange={handleChange}
        value={input}
        />
      {tweetsArray.map((tweet, index) => {
        return (
          <div>
            <ul>
              <li>{tweet.tweet}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default SearchBarAlt;
