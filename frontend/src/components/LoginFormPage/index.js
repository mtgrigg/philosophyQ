import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink, useHistory } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const history = useHistory()

  if (sessionUser) return <Redirect to="/tweets" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const demoLogin = async (e) => {
    e.preventDefault();

    setCredential("socrates@user.io");
     setPassword("password");
    const demo= await dispatch(sessionActions.login({credential:"socrates@user.io" , password: 'password' }));

    history.push('/tweets')

    return demo
  };

  return (
    <>
    <div id='loginWrapper'>
    <div className='container'>

      <div className='logo'></div>
      <div className='title'>PhilosophyHQ</div>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Username or Email
          <input
          className='logInput'
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
          className='logInput'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button  className='logInButton'type="submit">Log In</button>
        <button className='logInButton'  onClick={demoLogin}   type="submit">Log in as Socrates(Demo)</button>
      </form>
      <div id='loginWords'>
      <NavLink  to='/' className='loginModalSignUpPage'> Need an account? Sign up</NavLink>
      </div>
      </div>
      </div>
    </>
  );
}

export default LoginFormPage;
