import { createSelector } from 'reselect';

export const selectRedditToken = state => state.login.redditToken;
export const selectRedditData = state => state.reddit;
export const selectActivePost = state => state.reddit.activeId;
const selectSeenPostIds = state => state.reddit.seen;

export const redditPostsSelector = createSelector(
  selectRedditData,
  selectSeenPostIds,
  (posts, seen) =>
    Object.values(posts.data)
      .map(item => ({
        ...item,
        seen: seen.indexOf(item.id) > -1,
      }))
)