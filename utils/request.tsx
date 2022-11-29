import axios, { Method } from 'axios';

// axios.interceptors.response.use(
// 	(response: any) => {
// 		return response.data;
// 	},
// 	(error: any) => {
// 		// if (error?.response?.status === 401) {
// 		// 	helpers.removeAuthToken();
// 		// }
// 		return Promise.reject(error);
// 	},
// );

export const request = (url: string, method: Method, data?: any, isSearch = false) => {
	

	const apiUrl = `http://207.154.196.158:5858/${url}`;

	return axios(apiUrl, {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
		data,
	});
};