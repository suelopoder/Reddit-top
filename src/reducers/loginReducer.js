import { LOGIN_STATE } from '../constants';
import { TYPES } from '../actions';

const INITIAL_STATE = {
  redditToken: null,
  loginStatus: LOGIN_STATE.INIT,
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TYPES.LOGIN_REDIRECTING: return {
      ...state,
      loginStatus: LOGIN_STATE.REDIRECTING,
    }
    case TYPES.SET_REDDIT_TOKEN: return {
      loginStatus: LOGIN_STATE.LOGGED_IN,
      redditToken: action.token,
    }
    default: return state;
  }
};
