import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setRedditToken, getRedditToken, redirectToLogin } from './helpers';
import {
  setRedditToken as setRedditTokenAction,
  redirectingToLogin,
} from "./actions";

const API = {
  getAccessToken: async authorizationCode => {
    const res = await fetch(`./reddit_token?code=${authorizationCode}`);
    const data = await res.json();
    if (!data.access_token) {
      throw new Error();
    }
    return data.access_token;
  }
}

export function useRedditLogin() {
  const dispatch = useDispatch();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const authorizationCode = query.get('code');
    if (authorizationCode) {
      API.getAccessToken(authorizationCode)
        .then(accessToken => {
          setRedditToken(accessToken);
          window.location.replace('/');
        })
        .catch(() => {
          redirectToLogin();
          dispatch(redirectingToLogin());
        });
      return;
    }

    const token = getRedditToken();
    if (!token) {
      redirectToLogin();
      dispatch(redirectingToLogin());
      return;
    }

    dispatch(setRedditTokenAction(token));
  }, [dispatch]);

  return { loginStatus: useSelector(state => state.loginStatus) };
}