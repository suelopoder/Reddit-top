import React from 'react';
import useRedditData from './useRedditData';
import Loading from './components/Loading';

export function RedditContainer() {
  const { data, loading, error } = useRedditData();

  if (error && !data) {
    return <h1>{error}</h1>
  }

  return (
    <>
      {loading && <Loading />}
      {data && JSON.stringify(data)}
    </>
  );
}