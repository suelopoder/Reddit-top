import React from 'react';
import useRedditData from './useRedditData';
import Loading from './components/Loading';
import Main from './components/Main';

export function RedditContainer() {
  const { hasData, loading, error } = useRedditData();

  if (hasData) {
    return <Main />;
  }

  if (error) {
    return <h1>{error}</h1>
  }

  if (loading) {
    return <Loading />;
  }

  return null;
}