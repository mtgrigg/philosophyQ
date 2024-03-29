import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import LoginFormModal from '../LoginFormModal';
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
    const demo= dispatch(sessionActions.login({credential: "socrates@user.io", password: 'password' }));
    return demo
  };

  const demoLogin1 = (e) => {
    e.preventDefault();
    const demo= dispatch(sessionActions.login({credential: "nietzsche@user.io", password: 'password' }));
    return demo
  };
  const demoLogin2 = (e) => {
    e.preventDefault();
    const demo= dispatch(sessionActions.login({credential: "wittgenstein@user.io", password: 'password' }));
    return demo
  };




  return (
    <>
<div className='flexHelp'>
    {/* <div className="leftBackGroundSignUp"></div> */}
    <div className='flameWrapper'>
    <input type="checkbox" id="animation" />
<label for="animation"></label>

<div className="match"></div>
</div>


      <div className="signUpContainer">
        <div className='signUpLogo'> </div>
        <div className='siteTitleSignUpPage ' >PhilosophyHQ</div>
        <div className='siteSubTitleSignUpPage ' >A twitter clone built to allow users to interact with their favorite philosophers, dead and alive. </div>
      <form  className='signUpForm'onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li id='erros' key={idx}>{error}</li>)}
        </ul>
        {/* <div>Email</div> */}
        <label>
          {/* Email */}
          <input
          className='signUpInput'
            type="text"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {/* <div>Username</div> */}
        <label>
          {/* Username */}
          <input
          className='signUpInput'
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {/* <div>Password</div> */}
        <label>
          {/* Password */}
          <input
          className='signUpInput'
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {/* <div>Confirm Password</div> */}
        <label>
          {/* Confirm Password */}
          <input
          className='signUpInput'
            type="password"
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {/* <div>Profile Photo (Url)</div> */}
        <label>
          {/* imgUrl */}
          <input
          className='signUpInput'
            type="text"
            placeholder='Profile Photo(URL)'
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}

          />
        </label>
        {/* <div> User Bio</div> */}
        <label>
          {/* Bio */}
          <textarea
          className='signUpInput'
          id="bioButton"
            type="text"
            placeholder='Bio'
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />
        </label>
        <button type="submit"  className='signUpButton'>Sign Up</button>
        <button  className='signUpButton' onClick={demoLogin}  type="submit">Log in as Socrates(Demo)</button>
        <button  className='signUpButton' onClick={demoLogin1}  type="submit">Log in as Nietzsche(Demo)</button>
        <button  className='signUpButton' onClick={demoLogin2}  type="submit">Log in as Wittgenstein(Demo)</button>


      </form>
      <div id='loginWords'>
      <NavLink  to='/login' className='loginModalSignUpPage'> Already have an account? Login</NavLink>
      </div>
      </div>

      </div>
    </>
  );
}

export default SignupFormPage;
