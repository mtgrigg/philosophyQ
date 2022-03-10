import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import { Modal } from './context/Modal';
import TweetsPage from "./components/Tweets";
import SingleTweet from "./components/SingleTweet"
import TweetAssembly from './components/TweetAssembly';
import {  useSelector } from "react-redux";
import UsersPage from './components/UsersPage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const { pathname } = useLocation();
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>


      {pathname !== '/' && <Navigation isLoaded={isLoaded} />}
      {/* <button onClick={() => setShowModal(true)}>Modal</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h1>Hello I am a Modal</h1>
        </Modal>
      )} */}

      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
           <Route exact path='/'>
            <SignupFormPage />
          </Route>

        <Route exact path='/tweets'>
            <TweetsPage />
          </Route>
          <Route path='/tweets/:tweetId' exact={true}>
            <SingleTweet />
          </Route>

          <Route path='/users/:userId' >
            <UsersPage />
          </Route>
          {/* <Route  path='/kevin'>
            <TweetAssembly />
          </Route> */}
        </Switch>
      )}

    </>
  );
}

export default App;
