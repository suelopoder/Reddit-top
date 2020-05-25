import { createSelector } from 'reselect';

export const selectRedditToken = state => state.login.redditToken;
export const selectRedditData = state => state.reddit;
export const selectActivePost = state => state.reddit.activeId;

export const redditPostsSelector = createSelector(
  selectRedditData,
  redditData => Object.values(redditData.data),
)