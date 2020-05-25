import React from 'react';
import { useRedditLogin } from './useRedditLogin';
import { LOGIN_STATE } from './constants';

const LoginContainer = ({ children }) => {
  const { loginStatus } = useRedditLogin();

  if (loginStatus === LOGIN_STATE.INIT) {
    return null;
  }

  if (loginStatus === LOGIN_STATE.REDIRECTING) {
    return <h1>You are being redirected to the login page</h1>;
  }

  return children;
}

export default LoginContainer;
