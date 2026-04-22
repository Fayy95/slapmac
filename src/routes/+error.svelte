<script lang="ts">
	import { page } from '$app/state';
	import SeoHead from '$lib/seo/SeoHead.svelte';

	const status = $derived(page.status);
	const message = $derived(page.error?.message ?? 'Something went wrong.');
	const title = $derived(
		status === 404 ? 'Page not found — SlapMyMac' : `Error ${status} — SlapMyMac`
	);
	const description = $derived(
		status === 404
			? 'The page you requested does not exist.'
			: 'An error occurred while loading this page.'
	);
</script>

<SeoHead {title} {description} noindex={true} />

<div class="error-shell">
	<p class="error-code">{status}</p>
	<h1>{status === 404 ? 'Not found' : 'Error'}</h1>
	<p class="error-msg">{message}</p>
	<a href="/" class="error-home">Back to home</a>
</div>

<style>
	.error-shell {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		text-align: center;
		background: var(--background);
		color: var(--foreground);
		font-family: var(--font-sans);
	}
	.error-code {
		font-size: 4rem;
		font-weight: 700;
		margin: 0;
		color: var(--muted-foreground);
		line-height: 1;
	}
	h1 {
		margin: 1rem 0 0.5rem;
		font-size: 1.5rem;
	}
	.error-msg {
		margin: 0 0 1.5rem;
		color: var(--muted-foreground);
		max-width: 28rem;
	}
	.error-home {
		color: var(--primary);
		font-weight: 500;
		text-decoration: underline;
		text-underline-offset: 4px;
	}
</style>
