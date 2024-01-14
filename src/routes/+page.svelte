<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    let code = null;
    let token = null; //after onMount, this becomes the access token used to access data from the user

    function handleOAuthCallback(){
        const authReq = new URLSearchParams(window.location.search);
        const authCode = authReq.get('code');

        return authCode;
    }

    onMount(() => {
        code = handleOAuthCallback();
        token = exchangeCodeForToken(code);
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



<h1 class="text-blue-500">TODO:</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
