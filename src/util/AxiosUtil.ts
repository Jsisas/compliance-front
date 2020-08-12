import axios from 'axios';

axios.interceptors.response.use(
	(response) => {
		return Promise.resolve(response);
	},
	(error) => {
		if (error.status === 403) {
			localStorage.removeItem('auth');
			window.location.reload();
		} else {
			console.log(`${error.status} : ${error.statusText} => ${error.data}`);
		}
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
