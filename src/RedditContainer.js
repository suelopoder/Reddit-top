import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import API from './API';
import { selectRedditToken, selectRedditTopData } from './selectors';
import { redirectingToLogin, setTopData } from './actions';
import { redirectToLogin } from './helpers';

export function RedditContainer() {
  const redditToken = useSelector(selectRedditToken);
  const data = useSelector(selectRedditTopData);
  const dispatch = useDispatch();
  useEffect(() => {
    API.getTopPosts(redditToken)
      .then(data => dispatch(setTopData(data)))
      .catch(() => {
        redirectToLogin();
        dispatch(redirectingToLogin());
      });
  }, [redditToken, dispatch]);

  return data ? JSON.stringify(data) : 'Loading...';
}