import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGOUT_USER, LOGIN_USER, LOGIN_ERROR } from '../actions/types';
const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: false,
	isLoading: false,
	user: null,
	error: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case USER_LOADING:
			return {
				...state,
				isLoading: true
			};
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				user: action.payload
			};
		case LOGIN_USER:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				user: action.payload
			};
		case LOGIN_ERROR:
			return {
				...state,
				error: action.payload
			};

		case AUTH_ERROR:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
				isLoading: false
			};
		case LOGOUT_USER:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
				isLoading: false
			};
		default:
			return state;
	}
}
