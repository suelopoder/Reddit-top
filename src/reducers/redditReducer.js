import { TYPES } from '../actions';

const INITIAL_STATE = {
  data: null,
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
      data: action.payload,
      error: null,
    }
    case TYPES.SET_SELECTED_POST: return {
      ...state,
      activeId: action.payload,
    }
    default: return state;
  }
};
