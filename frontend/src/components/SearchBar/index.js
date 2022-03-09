import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './SearchBar.css'

import { getUsers } from '../../store/users';
import { getTweets } from '../../store/tweets';


function SearchBar() {
    const dispatch = useDispatch();

     // grab ALL users
    const user = useSelector(state => state.session.user);
    const userId = user?.id

    const users = useSelector(state => state?.users)
    const usersArray = Object.values(users)

     // grab ALL tweets
      const tweets = useSelector(state => state?.tweet);
      const tweetsArray = Object.values(tweets)




    const [searchWords, setSearchWords] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchResults2, setSearchResults2] = useState([]);


    useEffect(() => {
      dispatch(getUsers());
      dispatch(getTweets());
      setSearchResults([])
      setSearchWords("")
    }, [dispatch]);

    const handleSubmit = (e) => {
      e.preventDefault();



      const searchResults2 = usersArray.filter((user) => (
        user.username.toLowerCase().includes(searchWords.toLowerCase())
      ));

      const searchResults = tweetsArray.filter((tweet) => (
        tweet.tweet.toLowerCase().includes(searchWords.toLowerCase())
      ));


      setSearchResults2(searchResults2)
      setSearchResults(searchResults);
      setSearchWords('');

      if(!searchResults.length && !searchResults2.length){
       return  alert(`${searchWords} does not exist.`)

      }

    };



    return (
        <>
      <div className='searchBar'>
          <div className='searchHeader'>

          </div>
         <div  id="searchFormMeta" >
          <input
          id="searchForm"
            type="text"
            onChange={(e) => setSearchWords(e.target.value)}
            value={searchWords}
            placeholder="Search by tweet or username..."
            name="searchWords"
          />
          </div>
          <div className="searchButton">
          <button id='searchButtonButton' type="submit" onClick={handleSubmit} >Search</button>
            </div>
            </div>
        <ul className='ulForSearchedTweets'>
          {searchResults.map((searchTerm) => (
            <li key={searchTerm.id}  onClick={(e) => {
              e.preventDefault();

            }}>
                {/* <h2 className='searchH2'>Search Results:</h2> */}

              <NavLink className='liSearchList'
                to={`tweets/${searchTerm.id}`}
                style={{textDecoration: 'none'}}
              >

                {searchTerm.tweet}
              </NavLink>
            </li>))}
        </ul>


        <ul className='ulForSearchedUsers'>
          {searchResults2.map((searchTerm) => (
            <li key={searchTerm.id}  onClick={(e) => {
              e.preventDefault();

            }}>
                {/* <h2 className='searchH2'>Search Results:</h2> */}

              <NavLink className='liSearchListUsers'
                to={`tweets/${searchTerm.id}`}
                style={{textDecoration: 'none'}}
              >
                <img src={searchTerm.imgUrl} alt=''  className='userProfilePicOnSearch' onError={(event) => event.target.style.display = 'none'}/>
                @{searchTerm.username}
              </NavLink>
            </li>))}
        </ul>

      </>

    );
  };

  export default SearchBar;
