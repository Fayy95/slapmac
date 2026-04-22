<script lang="ts">
	import { buildTermsPageJsonLd } from '$lib/seo/jsonld';
	import SeoHead from '$lib/seo/SeoHead.svelte';

	const TERMS_DESCRIPTION =
		'Terms of use for SlapMyMac. Official legal terms are published on slapmac.com; this page links to the canonical policy.';
</script>

<SeoHead
	title="Terms — SlapMyMac"
	description={TERMS_DESCRIPTION}
	keywords="SlapMyMac terms, terms of use, SlapMyMac legal"
	canonicalPath="/terms"
	structuredData={buildTermsPageJsonLd(TERMS_DESCRIPTION)}
/>

<main class="doc-page">
	<h1>Terms</h1>
	<p>
		The official SlapMyMac terms are published at
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
