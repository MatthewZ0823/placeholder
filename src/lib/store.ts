import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type { Todo } from './todo';
import { todosFromJSON, todosToJSON } from './todo';
import type { Dayjs } from 'dayjs';

function createTodoStore() {
	const todoStore: Writable<Todo[]> = writable([]);
	const { subscribe, set, update } = todoStore;

	const updateFromLocalStorage = () => {
		const fromLocal = todosFromJSON(localStorage.getItem('todos') || '[]')
		set(fromLocal);
	};

	const updatePlusLocalStorage = (fn: (todos: Todo[]) => Todo[]) => {
		update((todos) => {
			const newTodos = fn(todos);
			localStorage.setItem('todos', todosToJSON(newTodos));
			return newTodos;
		});
	}

	const createTodo = (text: string) => {
		const todo = {
			id: new Date().getTime(),
			text,
			completed: false,
			date: null
		};

		updatePlusLocalStorage((todos) => [...todos, todo]);
	};

	const toggleTodo = (id: number) => {
		updatePlusLocalStorage((todos) => {
			return todos.map((todo: Todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			);
		});
	};

	const deleteTodo = (id: number) => {
		updatePlusLocalStorage((todos) => {
			return todos.filter((todo: Todo) => todo.id !== id);
		});
	};

	const editTodoText = (id: number, text: string) => {
		updatePlusLocalStorage((todos) => {
			return todos.map((todo: Todo) => (todo.id === id ? { ...todo, text } : todo));
		});
	};

	const editTodoDate = (id: number, date: Dayjs) => {
		updatePlusLocalStorage((todos) => {
			return todos.map((todo: Todo) => (todo.id === id ? { ...todo, date } : todo));
		});
	};

	return {
		subscribe,
		createTodo,
		toggleTodo,
		deleteTodo,
		editTodoText,
		editTodoDate,
		updateFromLocalStorage
	};
}

export default createTodoStore();
