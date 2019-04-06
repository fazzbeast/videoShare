import { GET_ROOMS, REGISTER_USER, LOGIN_USER, LOGOUT_USER, FORM_DATA, SUCCESS, GET_ERRORS } from './types';
import axios from 'axios';

export const registerUser = (newUserData) => (dispatch) => {
	axios('/registerUser', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		data: JSON.stringify(newUserData)
	})
		.then((payload) => {
			console.log(payload);
			if (payload.data.token) {
				localStorage.setItem('token', payload.data.token);
			}
			dispatch({
				type: REGISTER_USER,
				payload: newUserData
			});
		})
		.catch((err) => {
			const errors = {
				msg: err.response.data,
				status: err.response.status
			};
			dispatch({
				type: GET_ERRORS,
				payload: errors
			});
		});
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
