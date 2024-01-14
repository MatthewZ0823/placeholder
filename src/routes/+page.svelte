<script lang="ts">
	import { onMount } from 'svelte';
	import Todo from '$lib/components/Todo.svelte';
	import CreateTodo from '$lib/components/CreateTodo.svelte';
	import todoStore from '$lib/store';

	onMount(() => {
		todoStore.updateFromLocalStorage();
	});
</script>

<main>
	<h1 class="text-2xl font-bold mb-4">Svelte Daisy Todo App</h1>

	<CreateTodo />

	{#each $todoStore as todo (todo.id)}
		<Todo {todo} />
	{/each}
</main>

<style>
	main {
		max-width: 400px;
		margin: 0 auto;
		padding: 20px;
	}
</style>
