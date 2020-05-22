import React, { Component } from 'react';
import './App.css';
import { setRedditToken, getRedditToken, redirectToLogin } from './helpers';

class App extends Component {
  componentDidMount() {
    const authorizationCode = new URLSearchParams(window.location.search).get('code');
    if (authorizationCode) {
      return fetch(`./reddit_token?code=${authorizationCode}`)
        .then(res => res.json())
        .then(res => res.access_token
          ? setRedditToken(res.access_token)
          : redirectToLogin())
        .catch(redirectToLogin);
    }

    const token = getRedditToken();
    if (!token) {
      redirectToLogin()
    }
  }

  render () {
    return (
      <div className="App">
        Here will go the app
      </div>
    );
  }
}

export default App;
