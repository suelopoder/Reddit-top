import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { storeRedditToken, getRedditTokenFromStorage, redirectToLogin } from './helpers';
import { setRedditToken, redirectingToLogin } from "./actions";
import API from "./API";

export function useRedditLogin() {
  const dispatch = useDispatch();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const authorizationCode = query.get('code');
    if (authorizationCode) {
      API.getAccessToken(authorizationCode)
        .then(accessToken => {
          storeRedditToken(accessToken);
          // Remove authorization code from URL for security
          window.location.replace('/');
        })
        .catch(() => {
          redirectToLogin();
          dispatch(redirectingToLogin());
        });
      return;
    }

    const token = getRedditTokenFromStorage();
    if (!token) {
      redirectToLogin();
      dispatch(redirectingToLogin());
      return;
    }

    dispatch(setRedditToken(token));
  }, [dispatch]);

  const loginStatus = useSelector(state => state.login.loginStatus);
  return { loginStatus };
}