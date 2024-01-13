<script lang="ts">
  import { onMount } from 'svelte';
  import Todo from '$lib/components/Todo.svelte'
  import todoStore from '$lib/store';

  let newTodo = '';

  onMount(() => {
    todoStore.createTodo('silly qwirky amongus');
  });

  function addTodo() {
    if (newTodo) {
      todoStore.createTodo(newTodo);
      newTodo = '';
    }
  }

  function toggle(todo: Todo) {
    todoStore.toggleTodo(todo.id);
  }

  function remove(todo: Todo) {
    todoStore.deleteTodo(todo.id);
  }
</script>

<main>
  <h1 class="text-2xl font-bold mb-4">Svelte Daisy Todo App</h1>

  <div class="mb-4">
    <input bind:value={newTodo} placeholder="Add a new todo" class="input input-bordered" />
    <button on:click={addTodo} class="btn btn-primary ml-2">Add Todo</button>
  </div>

  {#each $todoStore as todo (todo.id)}
    <Todo {todo} on:toggle={() => toggle(todo)} on:remove={remove} />
  {/each}
</main>

<style>
  main {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }
</style>
