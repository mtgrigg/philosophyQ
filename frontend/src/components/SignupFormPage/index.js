import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);
  const [bio, setBio] = useState([]);

  if (sessionUser) return <Redirect to="/tweets" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password, imgUrl, bio }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const demoLogin = (e) => {
    e.preventDefault();
    const demo= dispatch(sessionActions.login({credential: "demo@user.io", password: 'password' }));
    return demo
  };

  return (
    <>
    <div className='flexHelp'>
    <div className="leftBackGroundSignUp"></div>


      <div className="signUpContainer">
        <div className='signUpLogo'></div>
      <form  className='signUpForm'onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Email
          <input
          className='signUpInput'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
          className='signUpInput'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
          className='signUpInput'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
          className='signUpInput'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <label>
          imgUrl
          <input
          className='signUpInput'
            type="text"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}

          />
        </label>
        <label>
          Bio
          <input
          className='signUpInput'
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />
        </label>
        <button type="submit"  className='signUpButton'>Sign Up</button>
        <button  className='signUpButton' onClick={demoLogin}  type="submit">Log in as Socrates(Demo)</button>
      </form>
      </div>
      </div>
    </>
  );
}

export default SignupFormPage;
