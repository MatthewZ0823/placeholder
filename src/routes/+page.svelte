<script lang="ts">
	import { onMount } from 'svelte';
	import Todo from '$lib/components/Todo.svelte';
	import CreateTodo from '$lib/components/CreateTodo.svelte';
	import todoStore from '$lib/store';
	import { page } from '$app/stores';

	let token: string;
	$: {
		// @ts-ignore
		token = $page.data.session?.accessToken ?? '';
		console.log(token);
	}

	onMount(() => {
		todoStore.updateFromLocalStorage();
	});

	const getChannelMessages = () => {
		fetch(`https://discord.com/api/v10/channels/1195809970281775187/messages`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		})
		.then((response) => {
			if (!response.ok) {
				console.error(response);
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.json();
		})
		.then((data) => {
			console.log('API Response:', data);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}
</script>

<main>
	<h1 class="text-2xl font-bold mb-4">Svelte Daisy Todo App</h1>

	<CreateTodo />

	{#each $todoStore as todo (todo.id)}
		<Todo {todo} />
	{/each}
</main>
<button on:click={getChannelMessages}>
	Get Channel Messages
</button>

<style>
	main {
		max-width: 400px;
		margin: 0 auto;
		padding: 20px;
	}
</style>
