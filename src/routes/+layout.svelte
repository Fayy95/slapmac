<script lang="ts">
	import '../app.css';
	import { registerSlapmacSeoLoadTracking } from '$lib/analytics/mixpanel-seo';

	let { children } = $props();

	registerSlapmacSeoLoadTracking();
</script>

<svelte:head>
	<link rel="icon" href="/slapmac_logo_no_text.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/slapmac_logo_no_text.svg" />
	<link rel="manifest" href="/site.webmanifest" />
	<meta name="application-name" content="SlapMyMac" />
	<meta name="format-detection" content="telephone=no" />
	<link rel="dns-prefetch" href="https://slapmac.com" />
	<link rel="preconnect" href="https://slapmac.com" crossorigin="" />
	<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin="" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
</svelte:head>

{@render children()}
