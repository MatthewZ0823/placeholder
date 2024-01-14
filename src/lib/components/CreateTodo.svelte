<script lang="ts">
	import todoStore from '$lib/store';

	let newTodo = '';

	function addTodo() {
		if (newTodo) {
			todoStore.createTodo(newTodo);
			newTodo = '';
		}
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			addTodo();
		}
	}
</script>

<div class="mb-4">
	<input
		bind:value={newTodo}
		on:keydown={handleKeyPress}
		placeholder="Add a new todo"
		class="input input-bordered"
	/>
</div>
