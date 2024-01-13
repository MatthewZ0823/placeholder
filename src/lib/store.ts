import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';


function createTodoStore() {
    const todoStore: Writable<Todo[]> = writable([]);
    const { subscribe, set, update } = todoStore;

    const createTodo = (text: string) => {
        const todo = {
            id: new Date().getTime(),
            text,
            completed: false,
        };

        update((todos) => [...todos, todo]);
    };

    const toggleTodo = (id: number) => {
        update((todos) => {
            return todos.map((todo: Todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
        });
    };

    const deleteTodo = (id: number) => {
        update((todos) => {
            return todos.filter((todo: Todo) => todo.id !== id);
        });
    };

    return {
        subscribe,
        set,
        update,
        createTodo,
        toggleTodo,
        deleteTodo
    }
}

export default createTodoStore();