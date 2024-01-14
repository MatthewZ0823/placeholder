<script>
	// @ts-nocheck
	import { page } from '$app/stores';
	import '../app.css';

	$: page.subscribe((value) => {
		console.log(value);
	});
</script>

{#if $page.data.session}
	{#if $page.data.session.user?.image}
		<span style="background-image: url('{$page.data.session.user.image}')" class="avatar" />
	{/if}

	<span>
		<small>Signed in as</small>
		<br />
		<strong>
			{$page.data.session.user?.email ?? $page.data.session.user?.name}
		</strong>
	</span>

	<a href="/auth/signout" class="button" data-sveltekit-preload-data="off"> Sign out </a>
{:else}
	<span class="notSignedInText"> You are not signed in </span>

	<a href="/auth/signin" class="buttonPrimary" data-sveltekit-preload-data="off"> Sign in </a>
{/if}

<html lang="en" data-theme="retro">
	<slot token={$page.data.session?.token} />
</html>
