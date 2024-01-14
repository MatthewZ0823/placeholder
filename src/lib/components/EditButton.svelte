<script lang="ts">
	import EditIcon from '$lib/assets/edit.svg';
	import CheckmarkIcon from '$lib/assets/checkmark.svg';
	import todoStore from '$lib/store';
	import type { Todo } from '$lib/types';
	import dayjs from 'dayjs';

	export let todo: Todo;

	let todoText: string = todo.text;

	let show: boolean = false;
	let dateString: string = '';

	const toggleShow = (): void => {
		show = !show;
	};

	const handleChangeText = (): void => {
		todoStore.editTodoText(todo.id, todoText);
	};
</script>

<main>
	<button on:click={toggleShow} class="btn btn-circle btn-sm">
		<img src={EditIcon} class="w-4" alt="Edit Icon" />
	</button>

	{#if show}
		<div class="modal modal-open">
			<div class="modal-box">
				<h3 class="font-bold text-lg">Edit</h3>
				<div class="flex flex-col justify-center">
					<div>
						<input bind:value={todoText} type="text" class="input input-bordered w-full max-w-xs" />
						<button class="btn btn-circle" on:click={handleChangeText}>
							<img src={CheckmarkIcon} class="w-4" alt="Checkmark Icon" />
						</button>
					</div>
					<div class="divider divider-vertical"></div>
					<div>
						<input
							bind:value={dateString}
							on:change={() => todoStore.editTodoDate(todo.id, dayjs(dateString))}
							type="datetime-local"
							class="input input-bordered w-full max-w-xs"
						/>
					</div>
				</div>

				<div class="modal-action">
					<form method="dialog">
						<button on:click={() => toggleShow()} class="btn">Close</button>
					</form>
				</div>
			</div>
		</div>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 10px;
	}
</style>
