import { writable } from 'svelte/store';
import type { IUser } from '../interfaces/user';

function getCookie(name: string): string | null {
	if (typeof document === 'undefined') return null;
	const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
	return match ? match[2] : null;
}

function setCookie(name: string, value: string, days: number = 7) {
	if (typeof document === 'undefined') return;
	const expires = new Date(Date.now() + days * 864e5).toUTCString();
	document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function deleteCookie(name: string) {
	if (typeof document === 'undefined') return;
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

let initialUser: IUser | null = null;

if (typeof document !== 'undefined') {
	const userCookie = getCookie('user');
	if (userCookie) {
		try {
			initialUser = JSON.parse(decodeURIComponent(userCookie)) as IUser;
		} catch (error) {
			console.error('Ошибка парсинга cookie "user":', error);
			initialUser = null;
		}
	}
}

export const userStore = writable<IUser | null>(initialUser);

if (typeof document !== 'undefined') {
	userStore.subscribe((value) => {
		if (value) {
			setCookie('user', JSON.stringify(value));
		} else {
			deleteCookie('user');
		}
	});
}
