import axios, { Method } from 'axios';

import StorageService from "utils/storage";

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
	const language = 'tr'
	let authToken = ''
	let formattedApiUrl = '';

	if (typeof window !== "undefined") {
		const { token }: any = StorageService.getAuthData();
		authToken = token;
	}

	if (url.includes('&')) {
		formattedApiUrl = `https://kampi.kampp.in/v1/${url}&lang=${language}`;
	} else {
		formattedApiUrl = `https://kampi.kampp.in/v1/${url}?lang=${language}`;
	}

	const apiUrl = isSearch ? `https://kampi.kampp.in/v1/${url}` : formattedApiUrl;

	return axios(apiUrl, {
		method,
		// credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
			Authorization: authToken
		},
		data,
	});
};