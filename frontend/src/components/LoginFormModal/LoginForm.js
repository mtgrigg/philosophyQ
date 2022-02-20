import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import "./LoginForm.css";
import { useHistory } from 'react-router-dom';


function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();



  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );



  };

  const demoLogin = (e) => {
    e.preventDefault();
    const demo= dispatch(sessionActions.login({credential: "demo@user.io", password: 'password' }));
    history.push("/tweets")
    return demo
  };

  return (
    <>
    <div className='flexHelpLogin'>
      <div className="logInContainer">
      <form onSubmit={handleSubmit}>
        Login
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
        <button className='demoButton' onClick={demoLogin}  type="submit">Log in as Socrates(Demo)</button>
      </form>
      </div>
      </div>
    </>
  );
}

export default LoginForm;
