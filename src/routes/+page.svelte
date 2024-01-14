<script lang="ts">
	import { onMount } from 'svelte';
	import Todo from '$lib/components/Todo.svelte';
	import CreateTodo from '$lib/components/CreateTodo.svelte';
	import todoStore from '$lib/store';

    let code = null;
    let token = null; //after onMount, this becomes the access token used to access data from the user

	onMount(() => {
		todoStore.createTodo('silly qwirky amongus');
        code = handleOAuthCallback();
        token = exchangeCodeForToken(code);
	});


    function handleOAuthCallback(){
        const authReq = new URLSearchParams(window.location.search);
        const authCode = authReq.get('code');

        return authCode;
    }

    onMount(() => {
    })

    function exchangeCodeForToken(code){
        const tokenReq = new URLSearchParams({grant_type: 'authorization_code', 
                                        code: code, 
                                        redirect_uri: 'http://localhost:5175/', 
                                        client_id: '1195809578366017707', 
                                        client_secret: 'Uw2ijjjdptOv-gW9fEprk-SW_JI38hJ_'});    
        
        fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: tokenReq, 
        })  
        .then(response => response.json())
        .then(data => {
            const token = data.access_token;
            console.log('Access Token: ', token);
            return token;
        })
        .catch(error => console.error('Error exchanging code for token: ', error));
    }
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