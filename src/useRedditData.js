import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
import API from './API';
import { selectRedditToken, selectRedditData } from './selectors';
import { redirectingToLogin, setTopData, setLoading, setError } from './actions';
import { redirectToLogin } from './helpers';

export default function useRedditData() {
  const redditToken = useSelector(selectRedditToken);
  const { data, loading, error } = useSelector(selectRedditData);
  const dispatch = useDispatch();
  const [lastData, setLastData] = useState(null);

  const loadData = () => {
    if (loading) return;

    dispatch(setLoading(true));
    API.getTopPosts(redditToken, lastData)
      .then(data => {
        setLastData(data.next);
        dispatch(setTopData(data.data));
      })
      .catch(error => {
        if (error.message === 'Invalid session') {
          redirectToLogin();
          dispatch(redirectingToLogin());
          return;
        }
        dispatch(setError(error.message));
      });
  };

  // exhaustive deps is disabled because we don't want to load
  // all pages at once, but instead only when user clicks "load more"
  useEffect(() => {
    if (!redditToken) return;
    loadData();
  }, [redditToken]); // eslint-disable-line react-hooks/exhaustive-deps

  const hasData = !_isEmpty(data);
  return { data, hasData, loading, error, loadMore: loadData };
}