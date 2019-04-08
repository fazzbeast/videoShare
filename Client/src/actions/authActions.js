import axios from 'axios';

import { USER_LOADED, USER_LOADING, AUTH_ERROR, GET_ROOMS } from './types';

//check token and load user
export const loadUser = () => (dispatch, getState) => {
	//user loading

	dispatch({
		type: USER_LOADING
	});

	//get token

	const token = getState().Auth.token;
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	if (token) {
		config.headers['Authorization'] = `bearer ${token}`;
	}

	axios
		.get('/auth/user', config)
		.then((res) => {
			dispatch({
				type: USER_LOADED,
				payload: res.data
			});
			dispatch({
				type: GET_ROOMS,
				payload: res.data.data
			});
		})
		.catch((err) => {
			console.log(err);
			const errors = {
				msg: err.response.data,
				status: err.response.status
			};
			dispatch({
				type: AUTH_ERROR,
				payload: errors
			});
		});
};
