import React from 'react';
import useRedditData from './useRedditData';
import Loading from './components/Loading';
import Main from './components/Main';
import { validURL } from './helpers';

const getImage = item => {
  if (!item.thumbnail) return null;
  if (!validURL(item.thumbnail)) return null;
  return item.thumbnail;
}

const HOUR_IN_MS = 1000 * 60 * 60;
const getCreatedTimeLabel = item => {
  if (!item.created) return null;
  const time = +new Date(item.created * 1000);
  const now = +new Date();
  const diff = Math.ceil((now - time) / HOUR_IN_MS);
  return `${diff} hours ago`;
}

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

  return <Main
    posts={data.map(item => ({
      id: item.id,
      author: item.author_fullname,
      time: getCreatedTimeLabel(item),
      imgUrl: getImage(item),
      title: item.title,
      comments: item.num_comments,
    }))}
  />;
}