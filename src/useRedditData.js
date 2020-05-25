import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
import API from './API';
import { selectRedditToken, selectRedditData } from './selectors';
import { redirectingToLogin, setTopData, setLoading, setError } from './actions';
import { redirectToLogin, getPostsFromStorage, storePosts } from './helpers';

export default function useRedditData() {
  const redditToken = useSelector(selectRedditToken);
  const { data, loading, error } = useSelector(selectRedditData);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedData = getPostsFromStorage();
    if (storedData) {
      dispatch(setTopData(storedData));
    }
  }, [dispatch])

  useEffect(() => {
    if (!redditToken) return;

    dispatch(setLoading(true));
    API.getTopPosts(redditToken)
      .then(data => {
        storePosts(data);
        dispatch(setTopData(data));
      })
      .catch(error => {
        if (error.message === 'Invalid session') {
          redirectToLogin();
          dispatch(redirectingToLogin());
          return;
        }
        dispatch(setError(error.message));
      });
  }, [redditToken, dispatch]);

  const hasData = !_isEmpty(data);
  return { data, hasData, loading, error };
}