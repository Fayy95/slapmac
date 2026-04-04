<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/slapmac_logo_no_text.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/slapmac_logo_no_text.svg" />
	<meta name="application-name" content="SlapMac" />
	<meta name="format-detection" content="telephone=no" />
	<link rel="dns-prefetch" href="https://slapmac.com" />
	<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin="" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
</svelte:head>

{@render children()}
