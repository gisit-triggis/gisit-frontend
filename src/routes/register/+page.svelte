<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { AuthService } from '../../services/auth/auth.service';
	import { userStore } from '../../stores/user.store';

	let email: string = '';
	let password: string = '';
	let errorMessage: string = '';

	// Если пользователь уже авторизован (проверка по cookie "sso"), перенаправляем сразу на главную
	onMount(() => {
		const isLoggedIn = document.cookie
			.split(';')
			.some((cookie) => cookie.trim().startsWith('sso='));
		if (isLoggedIn) {
			goto('/');
		}
	});

	async function handleRegister() {
		errorMessage = '';
		try {
			// Выполняем логин (метод login сохраняет токен в cookie под ключом "sso")
			await AuthService.register({ email, password });
			// Получаем профиль и обновляем store
			const profileResponse = await AuthService.getProfile();
			userStore.set(profileResponse.data);
			goto('/profile');
		} catch (error: any) {
			console.error(error);
			errorMessage = error?.response?.data?.message || 'Ошибка авторизации';
		}
	}
</script>

<form class="flex flex-col gap-3" on:submit|preventDefault={handleRegister}>
	<div class="text-2xl font-semibold">Registration</div>
	<label>
		Email:
		<input type="email" bind:value={email} required />
	</label>
	<label>
		Пароль:
		<input type="password" bind:value={password} required />
	</label>
	<button type="submit">Зарегистрироваться</button>
</form>

{#if errorMessage}
	<p style="color: red">{errorMessage}</p>
{/if}
