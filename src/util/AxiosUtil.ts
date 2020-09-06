import axios from 'axios';
import { Error, setError } from '../redux/Error/ErrorSlice';
import store from '../redux/store';

axios.interceptors.response.use(
	(response) => {
		return Promise.resolve(response);
	},
	(error) => {
		if (error.response.status === 403) {
			localStorage.removeItem('auth');
			window.location.reload();
		}

		const errorObj: Error = {
			code: error.response.data.error.status,
			name: error.response.data.error.code,
			message: error.response.data.error.message,
		};
		store.dispatch(setError(errorObj));
		return Promise.reject(error);
	}
);

axios.interceptors.request.use(
	function (config) {
		const authObj = localStorage.getItem('auth') || '{}';
		const auth = JSON.parse(authObj);

		if (auth.token != null) {
			//Back end breaks if token is included
			//config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	function (err) {
		return Promise.reject(err);
	}
);
