<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { AuthService } from '../../services/auth/auth.service';
	import { userStore } from '../../stores/user.store';
	import { get } from 'svelte/store';

	let email: string = '';
	let password: string = '';
	let errorMessage: string = '';

	// Если пользователь уже авторизован (данные есть в userStore), сразу перенаправляем на главную
	onMount(() => {
		if (get(userStore)) {
			goto('/');
		}
	});

	async function handleLogin() {
		errorMessage = '';
		try {
			// Выполняем логин; метод login сохраняет токен в cookie под ключом "sso"
			await AuthService.login({ email, password });
			// Получаем профиль и обновляем writable store
			const profileResponse = await AuthService.getProfile();
			userStore.set(profileResponse.data);
			goto('/profile');
		} catch (error: any) {
			console.error(error);
			errorMessage = error?.response?.data?.message || 'Ошибка авторизации';
		}
	}
</script>

<form class="flex flex-col gap-3" on:submit|preventDefault={handleLogin}>
	<div class="text-2xl font-semibold">Login</div>
	<label>
		Email:
		<input type="email" bind:value={email} required />
	</label>
	<label>
		Пароль:
		<input type="password" bind:value={password} required />
	</label>
	<button type="submit">Войти</button>
</form>

{#if errorMessage}
	<p style="color: red">{errorMessage}</p>
{/if}
