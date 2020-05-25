import { TYPES } from './actions';
import { selectRedditData } from './selectors';
import { storePosts } from './helpers';

const actionsChangingData = [
  TYPES.MARK_POST_SEEN,
  TYPES.SET_REDDIT_TOP_DATA,
];

const redditDataMiddleware = store => next => action => {
  let result = next(action);

  if (actionsChangingData.indexOf(action.type) === -1) {
    return result;
  }

  const dataToPersist = selectRedditData(store.getState()).data;
  console.log('persist', dataToPersist);
  storePosts(dataToPersist);
  return result;
}

export default redditDataMiddleware;