import { GET_ROOMS, REGISTER_USER, LOGIN_USER, LOGOUT_USER, FORM_DATA } from './types';
import axios from 'axios';

export const registerUser = (value) => (dispatch) => {
	// axios(`/registerUser`).then((cities) => {
	console.log('register');
	dispatch({
		type: REGISTER_USER,
		payload: value
	});
	// });
};

export const loginUser = (loginData) => (dispatch) => {
	axios('/auth/login', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		data: JSON.stringify(loginData)
	})
		.then((data) => {
			console.log(data);
			dispatch({
				type: LOGIN_USER,
				payload: loginData
			});
		})
		.catch((err) => console.log(err));
};

export const logoutUser = (cityName) => (dispatch) => {
	axios(`/api/fetchCity`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		data: {
			cityName: cityName
		}
	}).then((cities) => {
		if (cities.data.payload.length > 0) {
			dispatch({
				type: LOGOUT_USER,
				payload: [] //TODO: ADD PAYLOAD
			});
		}
	});
};

export const getRooms = () => (dispatch) => {
	//TODO: Add Axios for /User Data
	dispatch({
		type: GET_ROOMS,
		payload: [] //TODO: ADD PAYLOAD
	});
};
