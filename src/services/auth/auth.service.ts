import type {
	ILoginRequest,
	ILoginResponse,
	IRegisterRequest,
	IRegisterResponse
} from '../../interfaces/auth';
import axiosInstance from '../../api/api.interceptor';
import type { IProfileChange, IProfileChangeResponse, IProfileResponse } from '../../interfaces/user';

export const AuthService = {
	async login(data: ILoginRequest): Promise<ILoginResponse> {
		const response = await axiosInstance({ url: '/auth/login', method: 'POST', data });

		const token = response.data?.data?.token;
		console.log(response.data, token);
		if (token) {
			document.cookie = `sso=${token}; path=/;`;
		}

		return response.data;
	},
	async register(data: IRegisterRequest): Promise<IRegisterResponse> {
		const response = await axiosInstance({ url: 'auth/register', method: 'POST', data });

		const token = response.data?.data?.token;
		console.log(response.data, token);
		if (token) {
			document.cookie = `sso=${token}; path=/;`;
		}

		return response.data;
	},
	async changeProfile(data: IProfileChange): Promise<IProfileChangeResponse> {
		const response = await axiosInstance({ url: '/user/me', method: 'PATCH', data });

		return response.data;
	},
	logout(): void {
		document.cookie = 'sso=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
	},
	async getProfile(): Promise<IProfileResponse> {
		const response = await axiosInstance({ url: 'user/me', method: 'GET' });

		return response.data;
	}
};
