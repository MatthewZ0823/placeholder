<script lang="ts">
    import todoStore from '$lib/store';
    export let todo: Todo;
</script>

<div class="flex items-center mb-2">
  <input type="checkbox" bind:checked={todo.completed} class="mr-2" />
  <span class="{todo.completed ? 'line-through text-gray-400' : ''}">{todo.text}</span>
</div>
