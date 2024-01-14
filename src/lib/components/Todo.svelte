<script lang="ts">
	import todoStore from '$lib/store';
	import EditButton from '$lib/components/EditButton.svelte';
	import type { Todo } from '$lib/todo';
	export let todo: Todo;

	let hovering = false;
</script>

<div
	role="button"
	tabindex="0"
	on:mouseenter={() => (hovering = true)}
	on:mouseleave={() => (hovering = false)}
	class="flex items-center mb-2"
>
	<input
		type="checkbox"
		on:click={() => todoStore.toggleTodo(todo.id)}
		bind:checked={todo.completed}
		class="mr-2 checkbox checkbox-secondary"
	/>
	<span class={todo.completed ? 'line-through text-gray-400' : ''}>{todo.text}</span>
	{#if hovering}
		<EditButton {todo} />
		<button class="btn btn-circle btn-sm" on:click={() => todoStore.deleteTodo(todo.id)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/></svg
			>
		</button>
	{/if}
</div>
