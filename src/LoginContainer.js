import React from 'react';
import './LoginContainer.css';
import { useRedditLogin } from './useRedditLogin';
import { LOGIN_STATE } from './constants';

const LoginContainer = ({ children }) => {
  const { loginStatus } = useRedditLogin();

  if (loginStatus === LOGIN_STATE.INIT) {
    return null;
  }

  if (loginStatus === LOGIN_STATE.REDIRECTING) {
    return (
      <div className="LoginContainer">
        We are redirecting you to the login page
      </div>
    );
  }

  return (
    <div className="LoginContainer">
      {children}
    </div>
  );
}

export default LoginContainer;
