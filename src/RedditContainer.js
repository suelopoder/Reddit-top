import React from 'react';
import useRedditData from './useRedditData';
import Loading from './components/Loading';
import PostList from './components/PostList';

export function RedditContainer() {
  const { data, loading, error } = useRedditData();

  if (error && !data) {
    return <h1>{error}</h1>
  }

  if (loading && !data) {
    return <Loading />;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <PostList
        posts={data.map(item => ({
          id: item.id,
          author: item.author_fullname,
          time: item.created,
          imgUrl: item.thumbnail,
          title: item.title,
          comments: item.num_comments,
        }))}
      />
    </>
  );
}