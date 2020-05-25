import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import API from './API';
import { selectRedditToken, selectRedditData } from './selectors';
import { redirectingToLogin, setTopData, setLoading, setError } from './actions';
import { redirectToLogin } from './helpers';

export default function useRedditData() {
  const redditToken = useSelector(selectRedditToken);
  const { data, loading, error } = useSelector(selectRedditData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!redditToken) return;

    dispatch(setLoading(true));
    API.getTopPosts(redditToken)
      .then(data => dispatch(setTopData(data)))
      .catch(error => {
        if (error.message === 'Invalid session') {
          redirectToLogin();
          dispatch(redirectingToLogin());
          return;
        }
        dispatch(setError(error.message));
      });
  }, [redditToken, dispatch]);

  return { data, loading, error };
}