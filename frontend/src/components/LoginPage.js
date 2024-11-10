import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { Notif } from './Notif';


export const LoginPage = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const onSubmitHandler = (event) => {
      event.preventDefault();
      props.loginHandler(username, password);
    }
  
    const onChangeUsername = (event) => {
      setUsername(event.target.value);
    }
  
    const onChangePassword = (event) => {
      setPassword(event.target.value);
    }

    const navigate = useNavigate();

    const handleSignUpClick = () => {
      navigate('/signup'); // Redirects to the signup page
    };
  
    return (
      <div id="login-page">
        <div id="login">
          <Logo />
          <Notif message={props.notif.message} style={props.notif.style} />
          <form onSubmit={onSubmitHandler}>
            <label htmlFor="username">Username</label>
            <input id="username" autoComplete="off" onChange={onChangeUsername}  value={username} type="text" />
            <label htmlFor="password">Password</label>
            <input id="password" autoComplete="off" onChange={onChangePassword} value={password} type="password" />
            <button type="submit" className="btn">Login</button>
          </form>
          <button type="submit" className="btn" onClick={handleSignUpClick}>Sign up</button>
        </div>
      </div>
    )
}
