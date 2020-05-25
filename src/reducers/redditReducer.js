import { TYPES } from '../actions';
import { getPostsFromStorage } from '../helpers';

const INITIAL_STATE = {
  data: getPostsFromStorage(),
  loading: false,
  error: null,
  activeId: null,
};

export default function redditDataReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case TYPES.SET_REDDIT_TOP_DATA_LOADING: return {
      ...state,
      loading: true,
    }
    case TYPES.SET_REDDIT_TOP_DATA_ERROR: return {
      ...state,
      error: action.payload,
    }
    case TYPES.SET_REDDIT_TOP_DATA: return {
      ...state,
      loading: false,
      data: action.payload.reduce((posts, post) => ({
        ...posts,
        [post.id]: {
          ...posts[post.id],
          post,
        },
      }), state.data),
      error: null,
    }
    case TYPES.SET_SELECTED_POST: return {
      ...state,
      activeId: action.payload,
    }
    case TYPES.MARK_POST_SEEN: return {
      ...state,
      data: {
        ...state.data,
        [action.payload]: {
          ...state.data[action.payload],
          seen: true,
        }
      },
    }
    default: return state;
  }
};
