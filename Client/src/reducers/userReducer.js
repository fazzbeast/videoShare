import { GET_ROOMS, REGISTER_USER, LOGIN_USER, LOGOUT_USER } from '../actions/types';

const initialState = {
	userInfo: [],
	Rooms: {},
	Videos: [],
	uploadSuccess: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_ROOMS:
			return {
				...state,
				availableCities: action.payload
			};

		case REGISTER_USER:
			return {
				...state,
				uploadSuccess: action.payload
			};
		case LOGIN_USER:
			return {
				...state,
				cities: action.payload
			};
		case LOGOUT_USER:
			return {
				...state,
				cities: []
			};
		default:
			return state;
	}
}
