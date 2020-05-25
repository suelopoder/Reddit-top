import React from 'react';
import LoginContainer from './LoginContainer';
import { RedditContainer } from './RedditContainer';

export default function App() {
  return (
    <LoginContainer>
      <RedditContainer />
    </LoginContainer>
  )
};
