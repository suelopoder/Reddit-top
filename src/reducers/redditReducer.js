import { TYPES } from '../actions';

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
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
      loading: false,
      data: action.payload,
      error: null,
    }
    default: return state;
  }
};
