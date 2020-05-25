export const TYPES = {
  SET_REDDIT_TOKEN: 'SET_REDDIT_TOKEN',
  LOGIN_REDIRECTING: 'LOGIN_REDIRECTING',
  SET_REDDIT_TOP_DATA: 'SET_REDDIT_TOP_DATA',
  SET_REDDIT_TOP_DATA_LOADING: 'SET_REDDIT_TOP_DATA_LOADING',
  SET_REDDIT_TOP_DATA_ERROR: 'SET_REDDIT_TOP_DATA_ERROR',
  SET_SELECTED_POST: 'SET_SELECTED_POST',
};

export const setRedditToken = token => ({ type: TYPES.SET_REDDIT_TOKEN, token });
export const redirectingToLogin = () => ({ type: TYPES.LOGIN_REDIRECTING });

export const setTopData = payload => ({ type: TYPES.SET_REDDIT_TOP_DATA, payload });
export const setLoading = payload => ({ type: TYPES.SET_REDDIT_TOP_DATA_LOADING, payload });
export const setError = payload => ({ type: TYPES.SET_REDDIT_TOP_DATA_ERROR, payload });

export const selectPost = payload => ({ type: TYPES.SET_SELECTED_POST, payload });