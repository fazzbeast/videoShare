import {
	GET_ROOMS,
	REGISTER_USER,
	CREATE_ROOM,
	SUCCESS,
	GET_EMAIL_TOKEN,
	DELETE_ROOM,
	CLEAR_DATA
} from '../actions/types';

const initialState = {
	userInfo: [],
	Rooms: {},
	Videos: [],
	uploadSuccess: false,
	registerData: [],
	loginData: [],
	confirmationToken: null,
	createRoomData: []
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
				createRoomData: action.payload
			};
		case CREATE_ROOM:
			return {
				...state,
				createRoomData: action.payload
			};
		case DELETE_ROOM:
			return {
				...state,
				createRoomData: action.payload
			};
		case REGISTER_USER:
			return {
				...state,
				Videos: action.payload
			};

		case SUCCESS:
			return {
				...state,
				Success: !state.Success
			};

		case CLEAR_DATA:
			return {
				...state,
				createRoomData: []
			};
		default:
			return state;
	}
}
