const REDDIT_BASE_URI = process.env.REACT_APP_REDDIT_BASE_URI;
const REDDIT_APP_ID = process.env.REACT_APP_REDDIT_APP_ID;
const REDDIT_REDIRECT_URI = encodeURIComponent(process.env.REACT_APP_REDDIT_APP_REDIRECT_URI);
const REDDIT_AUTH = `${REDDIT_BASE_URI}/api/v1/authorize?client_id=${REDDIT_APP_ID}&response_type=code&state=REDDIT_TEST_CLIENT&redirect_uri=${REDDIT_REDIRECT_URI}&duration=permanent&scope=read`;
const OAUTH_URL = `${REDDIT_BASE_URI}/login/?dest=${encodeURIComponent(REDDIT_AUTH)}`;
export const redirectToLogin = () => location.replace(OAUTH_URL);

const { location, localStorage } = window;
const REDDIT_TOKEN_KEY = 'REDDIT_CLIENT__REDDIT_TOKEN_KEY';
export const getRedditTokenFromStorage = () => localStorage.getItem(REDDIT_TOKEN_KEY);
export const storeRedditToken = token => localStorage.setItem(REDDIT_TOKEN_KEY, token);

const REDDIT_POSTS_KEY = 'REDDIT_CLIENT__REDDIT_POSTS';
export const getPostsFromStorage = () => JSON.parse(localStorage.getItem(REDDIT_POSTS_KEY));
export const storePosts = data => localStorage.setItem(REDDIT_POSTS_KEY, JSON.stringify(data));

// https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
export function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}