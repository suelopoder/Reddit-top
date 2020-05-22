import React from 'react';
import './App.css';
import { useRedditLogin } from './useRedditLogin';
import { LOGIN_STATE } from './constants';

const App = () => {
  const { loginState } = useRedditLogin();

  if (loginState === LOGIN_STATE.INIT) {
    return null;
  }

  if (loginState === LOGIN_STATE.REDIRECTING) {
    return (
      <div className="App">
        We are redirecting you to the login page
      </div>
    );
  }

  return (
    <div className="App">
      Here will go the app
    </div>
  );
}

export default App;
