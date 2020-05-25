import { combineReducers } from 'redux'
import redditReducer from './redditReducer';
import loginReducer from './loginReducer';

export default combineReducers({ login: loginReducer, reddit: redditReducer });