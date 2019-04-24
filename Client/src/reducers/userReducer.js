import {
	GET_ROOMS,
	REGISTER_USER,
	CREATE_ROOM,
	SUCCESS,
	GET_EMAIL_TOKEN,
	DELETE_ROOM,
	CLEAR_DATA,
	GET_VIDEOS,
	DELETE_VIDEO,
	ADD_VIDEOS,
	ADD_RECENTLY_PLAYED,
	DELETE_RECENTLY_PLAYED,
	UPDATE_RECENTLY_PLAYED,
	RESET_FORM
} from '../actions/types';

const initialState = {
	userInfo: [],
	Rooms: {},
	Videos: [],
	uploadSuccess: false,
	registerData: [],
	loginData: [],
	confirmationToken: null,
	createRoomData: [],
	videosUpdated: false,
	recentlyPlayed: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case UPDATE_RECENTLY_PLAYED:
			return {
				...state,
				recentlyPlayed: action.payload
			};
		case DELETE_RECENTLY_PLAYED:
			return {
				...state,
				recentlyPlayed: action.payload
			};
		case ADD_RECENTLY_PLAYED:
			return {
				...state,
				recentlyPlayed: state.recentlyPlayed.concat(action.payload)
			};
		case ADD_VIDEOS:
			return {
				...state,
				videosUpdated: action.payload
			};
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
				Videos: action.payload,
				uploadSuccess: true
			};
		case RESET_FORM:
			return {
				...state,
				uploadSuccess: null
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
