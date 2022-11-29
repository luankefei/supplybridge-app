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
	

	const apiUrl = `https://supplyapi.kampp.in/${url}`;

	return axios(apiUrl, {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
		data,
	});
};