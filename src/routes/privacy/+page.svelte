<script lang="ts">
	import { buildPrivacyPageJsonLd } from '$lib/seo/jsonld';
	import SeoHead from '$lib/seo/SeoHead.svelte';

	const PRIVACY_DESCRIPTION =
		'Privacy information for SlapMac. Official privacy policy is published on slapmac.com; this page links to the canonical policy.';
</script>

<SeoHead
	title="Privacy — SlapMac"
	description={PRIVACY_DESCRIPTION}
	keywords="SlapMac privacy, privacy policy, data policy"
	canonicalPath="/privacy"
	structuredData={buildPrivacyPageJsonLd(PRIVACY_DESCRIPTION)}
/>

<main class="doc-page">
	<h1>Privacy</h1>
	<p>
		The official SlapMac privacy policy is published at
		<a href="https://slapmac.com/privacy" rel="noopener noreferrer">slapmac.com/privacy</a>.
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
