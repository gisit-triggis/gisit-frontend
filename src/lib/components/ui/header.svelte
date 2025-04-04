<script lang="ts">
	import { goto } from '$app/navigation';
	import { onDestroy } from 'svelte';
	import { AuthService } from '../../../services/auth/auth.service';
	import Logo from '../logo.svelte';
	import type { IUser } from '../../../interfaces/user';
	import { userStore } from '../../../stores/user.store';

	let user: IUser | null = null;

	// Подписываемся на изменения в userStore
	const unsubscribe = userStore.subscribe((value) => {
		user = value;
	});

	onDestroy(() => {
		unsubscribe();
	});

	function logout() {
		AuthService.logout();
		userStore.set(null);
		goto('/login');
	}
</script>

<header class="flex flex-row items-center justify-between py-4">
	<a href="/"><Logo /></a>
	<div class="flex flex-row items-center gap-4">
		{#if user}
			<span>Привет, {user.full_name}!</span>
			<a href="/profile">Профиль</a>
			<button on:click={logout}>Выйти</button>
		{:else}
			<a href="/login">Войти</a>
			<a href="/register">Зарегистрироваться</a>
		{/if}
	</div>
</header>
