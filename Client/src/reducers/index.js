import { combineReducers } from 'redux';
import userReducer from './userReducer';
import errors from './errors';
import Auth from './Auth';
export default combineReducers({
	userReducer,
	errors,
	Auth
});
