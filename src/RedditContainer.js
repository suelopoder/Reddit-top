import React from 'react';
import useRedditData from './useRedditData';
import Loading from './components/Loading';

export function RedditContainer() {
  const { data, loading, error } = useRedditData();

  if (error && !data) {
    return <h1>{error}</h1>
  }

  if (loading && !data) {
    return <Loading />;
  }

  return JSON.stringify(data);
}