<script lang="ts">
	import SeoHead from '$lib/seo/SeoHead.svelte';
</script>

<SeoHead
	title="Terms — SlapMac"
	description="Terms of use for SlapMac. Read the official terms on slapmac.com."
	canonicalPath="/terms"
/>

<main class="doc-page">
	<h1>Terms</h1>
	<p>
		The official SlapMac terms are published at
		<a href="https://slapmac.com/terms" rel="noopener noreferrer">slapmac.com/terms</a>.
	</p>
	<p><a href="/">← Back to home</a></p>
</main>

<style>
	.doc-page {
		max-width: 42rem;
		margin: 0 auto;
		padding: 2.5rem 1.5rem 4rem;
		color: var(--foreground);
		font-family: var(--font-sans);
		line-height: 1.6;
	}
	.doc-page h1 {
		font-size: 1.75rem;
		margin-bottom: 1rem;
	}
	.doc-page a {
		color: var(--primary);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
