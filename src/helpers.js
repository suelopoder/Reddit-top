const REDDIT_BASE_URI = process.env.REACT_APP_REDDIT_BASE_URI;
const REDDIT_APP_ID = process.env.REACT_APP_REDDIT_APP_ID;
const REDDIT_REDIRECT_URI = encodeURIComponent(process.env.REACT_APP_REDDIT_APP_REDIRECT_URI);
const REDDIT_AUTH = `${REDDIT_BASE_URI}/api/v1/authorize?client_id=${REDDIT_APP_ID}&response_type=code&state=REDDIT_TEST_CLIENT&redirect_uri=${REDDIT_REDIRECT_URI}&duration=permanent&scope=read`;
const OAUTH_URL = `${REDDIT_BASE_URI}/login/?dest=${encodeURIComponent(REDDIT_AUTH)}`;
const REDDIT_TOKEN_KEY = 'REDDIT_CLIENT__REDDIT_TOKEN_KEY';

const { location, localStorage } = window;
export const getRedditToken = () => localStorage.getItem(REDDIT_TOKEN_KEY);
export const setRedditToken = token => localStorage.setItem(REDDIT_TOKEN_KEY, token);
export const redirectToLogin = () => location.replace(OAUTH_URL);