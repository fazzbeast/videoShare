import {
	GET_ROOMS,
	REGISTER_USER,
	CREATE_ROOM,
	SUCCESS,
	GET_EMAIL_TOKEN,
	DELETE_ROOM,
	CLEAR_DATA,
	GET_VIDEOS,
	DELETE_VIDEO
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
		case GET_VIDEOS:
			return {
				...state,
				Videos: action.payload
			};
		case DELETE_VIDEO:
			return {
				...state,
				Videos: this.Videos.filter((video) => video.url !== action.payload)
			};
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
