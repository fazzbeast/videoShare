import axios from 'axios';
import {} from './';

import { USER_LOADED, USER_LOADING, AUTH_ERROR } from './types';

//check token and load user
export const loadUser = (dispatch, getState) => {
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
		config.headers['Authorization'] = `Token ${token}`;
	}
};
