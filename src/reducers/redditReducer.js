import { TYPES } from '../actions';
import { getPostsFromStorage } from '../helpers';
import { combineReducers } from 'redux';

const INITIAL_STATE = getPostsFromStorage() || {};
const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.SET_REDDIT_TOP_DATA:
      return action.payload.reduce((posts, newPost) => ({
        ...posts,
        [newPost.id]: {
          ...posts[newPost.id],
          ...newPost,
        }
      }), state);
    case TYPES.MARK_POST_SEEN: return {
      ...state,
      [action.payload]: {
        ...state[action.payload],
        seen: true,
      }
    }
    default: return state;
  }
}

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case TYPES.SET_REDDIT_TOP_DATA_LOADING: return true;
    case TYPES.SET_REDDIT_TOP_DATA: return false;
    default: return state;
  }
}

const errorReducer = (state = null, action) => {
  switch (action.type) {
    case TYPES.SET_REDDIT_TOP_DATA_ERROR: return action.payload;
    case TYPES.SET_REDDIT_TOP_DATA: return null;
    default: return state;
  }
}

const activeIdReducer = (state = null, action) => {
  switch (action.type) {
    case TYPES.SET_SELECTED_POST: return action.payload;
    default: return state;
  }
}

export default combineReducers({
  data: dataReducer,
  loading: loadingReducer,
  error: errorReducer,
  activeId: activeIdReducer,
});
