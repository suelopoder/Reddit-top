export const TYPES = {
  SET_REDDIT_TOKEN: 'SET_REDDIT_TOKEN',
  LOGIN_REDIRECTING: 'LOGIN_REDIRECTING',
  SET_REDDIT_TOP_DATA: 'SET_REDDIT_TOP_DATA',
};

export const setRedditToken = token => ({ type: TYPES.SET_REDDIT_TOKEN, token });
export const redirectingToLogin = () => ({ type: TYPES.LOGIN_REDIRECTING });

export const setTopData = payload => ({ type: TYPES.SET_REDDIT_TOP_DATA, payload });
