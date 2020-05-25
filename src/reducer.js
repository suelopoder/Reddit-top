import { LOGIN_STATE } from './constants';
import { TYPES } from './actions';

const INITIAL_STATE = {
  redditToken: null,
  loginStatus: LOGIN_STATE.INIT,
  redditTopData: null,
};

export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TYPES.LOGIN_REDIRECTING: return {
      ...state,
      loginStatus: LOGIN_STATE.REDIRECTING,
    }
    case TYPES.SET_REDDIT_TOKEN: return {
      ...state,
      loginStatus: LOGIN_STATE.LOGGED_IN,
      redditToken: action.token,
    }
    case TYPES.SET_REDDIT_TOP_DATA: return {
      ...state,
      redditTopData: action.payload,
    }
    default: return state;
  }
};
