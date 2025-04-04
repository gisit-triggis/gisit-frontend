// src/lib/axiosInstance.ts
import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || 'http://gisit-triggis-hackathon.ru/api/v1', // URL вашего API
	headers: {
		'Content-Type': 'application/json'
	}
});

// Вспомогательная функция для получения cookie по имени
function getCookie(name: string): string | undefined {
	const match = document.cookie.match(
		new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
	);
	return match ? decodeURIComponent(match[1]) : undefined;
}

// Интерсептор запроса: добавляем токен из cookies под ключом "sso"
axiosInstance.interceptors.request.use(
	(config) => {
		const token = getCookie('sso');
		if (token && config.headers) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	(error: AxiosError) => Promise.reject(error)
);

// Интерсептор ответа: обработка ошибок (например, 401)
axiosInstance.interceptors.response.use(
	(response: AxiosResponse): AxiosResponse => response,
	(error: AxiosError) => {
		if (error.response && error.response.status === 401) {
			console.warn('Неавторизованный запрос, очищаем токен');
			// Удаляем cookie "sso" путем установки её с истёкшим сроком
			document.cookie = 'sso=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
			// При необходимости можно добавить редирект на страницу логина
			// import { goto } from '$app/navigation';
			// goto('/login');
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
