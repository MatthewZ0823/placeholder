import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type { Todo } from './types';
import type { Dayjs } from 'dayjs';

function createTodoStore() {
	const todoStore: Writable<Todo[]> = writable([]);
	const { subscribe, set, update } = todoStore;

	const createTodo = (text: string) => {
		const todo = {
			id: new Date().getTime(),
			text,
			completed: false,
			date: null
		};

		update((todos) => [...todos, todo]);
	};

	const toggleTodo = (id: number) => {
		update((todos) => {
			return todos.map((todo: Todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			);
		});
	};

	const deleteTodo = (id: number) => {
		update((todos) => {
			return todos.filter((todo: Todo) => todo.id !== id);
		});
	};

	const editTodoText = (id: number, text: string) => {
		update((todos) => {
			return todos.map((todo: Todo) => (todo.id === id ? { ...todo, text } : todo));
		});
	};

	const editTodoDate = (id: number, date: Dayjs) => {
		update((todos) => {
			return todos.map((todo: Todo) => (todo.id === id ? { ...todo, date } : todo));
		});
	};

	return {
		subscribe,
		set,
		update,
		createTodo,
		toggleTodo,
		deleteTodo,
		editTodoText,
		editTodoDate
	};
}

export default createTodoStore();
