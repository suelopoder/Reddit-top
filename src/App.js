import React, { Component } from 'react';
import './App.css';

const REDDIT_TOKEN_KEY = 'REDDIT_CLIENT__REDDIT_TOKEN_KEY';
const getRedditToken = () => window.localStorage.getItem(REDDIT_TOKEN_KEY);

const REDDIT_APP_ID = process.env.REACT_APP_REDDIT_APP_ID;
const REDDIT_REDIRECT_URI = encodeURIComponent(process.env.REACT_APP_REDDIT_APP_REDIRECT_URI);
const REDDIT_AUTH = `https://www.reddit.com/api/v1/authorize?client_id=${REDDIT_APP_ID}&response_type=code&state=REDDIT_TEST_CLIENT&redirect_uri=${REDDIT_REDIRECT_URI}&duration=temporary&scope=read+identity+modmail`;
const OAUTH_URL = `https://www.reddit.com/login/?dest=${encodeURIComponent(REDDIT_AUTH)}`;

class App extends Component {
  componentDidMount() {
    const token = getRedditToken();
    if (!token) {
      window.location.replace(OAUTH_URL);
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
