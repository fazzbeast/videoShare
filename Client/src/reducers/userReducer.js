import { GET_ROOMS, REGISTER_USER, LOGIN_USER, SUCCESS, GET_EMAIL_TOKEN } from '../actions/types';

const initialState = {
	userInfo: [],
	Rooms: {},
	Videos: [],
	uploadSuccess: false,
	registerData: [],
	loginData: [],
	confirmationToken: null
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_EMAIL_TOKEN:
			return {
				...state,
				confirmationToken: action.payload
			};
		case GET_ROOMS:
			return {
				...state,
				availableCities: action.payload
			};

		case REGISTER_USER:
			return {
				...state,
				registerData: action.payload
			};

		case SUCCESS:
			return {
				...state,
				Success: !state.Success
			};
		default:
			return state;
	}
}
