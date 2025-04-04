<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { AuthService } from '../../services/auth/auth.service';
	import type { IProfileResponse } from '../../interfaces/user';
	import { userStore } from '../../stores/user.store';

	let errorMessage = '';

	// Тип профиля меняем на IProfileResponse | null, чтобы можно было отслеживать его загрузку
	let profile: IProfileResponse | null = null;
	let isEditing = false;

	// Локальные переменные для редактирования профиля
	let editedName = '';
	let editedSurname = '';

	onMount(async () => {
		try {
			profile = await AuthService.getProfile();
			// Инициализируем поля редактирования данными из профиля
			editedName = profile.data.name;
			editedSurname = profile.data.surname;
		} catch (error: any) {
			console.error('Ошибка загрузки профиля:', error);
			errorMessage = 'Не удалось загрузить профиль';
			goto('/login');
		}
	});

	// Функция сохранения изменений
	async function handleSave() {
		errorMessage = '';
		try {
			// Вызываем метод изменения профиля с новыми данными
			const updatedProfile = await AuthService.changeProfile({
				name: editedName,
				surname: editedSurname
			});
			// Обновляем локальный профиль
			if (profile) {
				profile.data.name = updatedProfile.data.name;
				profile.data.surname = updatedProfile.data.surname;
				// Добавляем пробел между именем и фамилией
				profile.data.full_name = `${updatedProfile.data.name} ${updatedProfile.data.surname}`;
				userStore.set(profile.data);
			}
			// Обновляем глобальный store, чтобы header и другие компоненты сразу получили изменения
			// userStore.set(updatedProfile.data);

			isEditing = false;
		} catch (error: any) {
			console.error('Ошибка обновления профиля:', error);
			errorMessage = error?.response?.data?.message || 'Ошибка обновления профиля';
		}
	}

	// Функция отмены редактирования, возвращает значения из профиля
	function handleCancel() {
		if (profile) {
			editedName = profile.data.name;
			editedSurname = profile.data.surname;
		}
		isEditing = false;
	}
</script>

{#if profile}
	<h1>Профиль пользователя</h1>
	{#if isEditing}
		<div>
			<label>
				Имя:
				<input type="text" bind:value={editedName} />
			</label>
			<label>
				Фамилия:
				<input type="text" bind:value={editedSurname} />
			</label>
			<div class="mt-4 flex gap-2">
				<button on:click={handleSave}>Сохранить</button>
				<button on:click={handleCancel}>Отменить</button>
			</div>
		</div>
	{:else}
		<p>Имя: {profile.data.name}</p>
		<p>Фамилия: {profile.data.surname}</p>
		<p>Email: {profile.data.email}</p>
		<button on:click={() => (isEditing = true)}>Изменить</button>
	{/if}
{:else if errorMessage}
	<p style="color: red">{errorMessage}</p>
{:else}
	<p>Загрузка...</p>
{/if}
