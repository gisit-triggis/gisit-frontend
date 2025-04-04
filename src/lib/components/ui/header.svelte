<script lang="ts">
	import { goto } from '$app/navigation';
	import Logo from '../logo.svelte';
	import { userStore } from '../../../stores/user.store';
	import { AuthService } from '../../../services/auth/auth.service';
</script>

<header class="flex flex-row items-center justify-between py-4">
	<a href="/"><Logo /></a>
	<div class="flex flex-row items-center gap-4">
		{#if $userStore}
			<span>Привет, {$userStore.full_name}!</span>
			<a href="/profile">Профиль</a>
			<button
				on:click={() => {
					AuthService.logout();
					userStore.set(null);
					goto('/login');
				}}>Выйти</button
			>
		{:else}
			<a href="/login">Войти</a>
			<a href="/register">Зарегистрироваться</a>
		{/if}
	</div>
</header>
