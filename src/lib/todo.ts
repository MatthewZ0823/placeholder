// import * as dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

export type Todo = {
	id: number;
	text: string;
	completed: boolean;
	date: Dayjs | null;
};

const todoToJSON = (todo: Todo) => {
	return JSON.stringify({
		id: todo.id,
		text: todo.text,
		completed: todo.completed,
		date: todo.date?.toISOString() || null
	});
}

export const todosToJSON = (todos: Todo[]) => {
	return JSON.stringify(todos.map(todoToJSON));
}

const todoFromJSON = (todoJSON: string) => {
	const todo = JSON.parse(todoJSON);
	return {
		id: todo.id,
		text: todo.text,
		completed: todo.completed,
		date: todo.date ? dayjs(todo.date) : null
	} as Todo;
}

export const todosFromJSON = (todosJSON: string) => {
	return JSON.parse(todosJSON).map(todoFromJSON);
}