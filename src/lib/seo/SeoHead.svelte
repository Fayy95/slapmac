<script lang="ts">
	import { page } from '$app/state';
	import {
		DEFAULT_DESCRIPTION,
		DEFAULT_OG_IMAGE,
		SITE_NAME,
		TWITTER_CREATOR,
		TWITTER_SITE,
		absoluteUrl,
		getSiteUrl
	} from './site';

	interface Props {
		title: string;
		description?: string;
		/** Override canonical path; defaults to current `page.url.pathname` */
		canonicalPath?: string;
		image?: string;
		imageWidth?: number;
		imageHeight?: number;
		imageAlt?: string;
		keywords?: string;
		noindex?: boolean;
		ogType?: string;
		/** One or more JSON-LD objects (each emitted as its own script tag). */
		structuredData?: unknown | unknown[];
	}

	let {
		title,
		description = DEFAULT_DESCRIPTION,
		canonicalPath,
		image,
		imageWidth = 1920,
		imageHeight = 1080,
		imageAlt,
		keywords,
		noindex = false,
		ogType = 'website',
		structuredData
	}: Props = $props();

	let path = $derived(canonicalPath ?? page.url.pathname);
	let canonical = $derived(`${getSiteUrl()}${path === '/' ? '' : path}`);
	let ogImage = $derived(
		image ? absoluteUrl(image, getSiteUrl()) : DEFAULT_OG_IMAGE
	);
	let ogAlt = $derived(imageAlt ?? title);

	let ldBlocks = $derived(
		structuredData == null
			? []
			: Array.isArray(structuredData)
				? structuredData
				: [structuredData]
	);

	function guessOgImageType(imgUrl: string): string {
		const u = imgUrl.toLowerCase();
		if (u.endsWith('.png') || u.includes('.png?')) return 'image/png';
		if (u.endsWith('.webp') || u.includes('.webp?')) return 'image/webp';
		if (u.endsWith('.svg') || u.includes('.svg?')) return 'image/svg+xml';
		return 'image/jpeg';
	}
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	{#if keywords}
		<meta name="keywords" content={keywords} />
	{/if}

	<link rel="canonical" href={canonical} />

	{#if !noindex}
		<link rel="alternate" hreflang="x-default" href={canonical} />
		<link rel="alternate" hreflang="en" href={canonical} />
	{/if}

	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<meta
			name="robots"
			content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
		/>
	{/if}

	<meta name="referrer" content="strict-origin-when-cross-origin" />
	<meta name="author" content={SITE_NAME} />
	<meta name="theme-color" content="#fdf7f0" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#312d27" media="(prefers-color-scheme: dark)" />

	<meta property="og:type" content={ogType} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content={String(imageWidth)} />
	<meta property="og:image:height" content={String(imageHeight)} />
	<meta property="og:image:alt" content={ogAlt} />
	<meta property="og:image:type" content={guessOgImageType(ogImage)} />
	{#if ogImage.startsWith('https://')}
		<meta property="og:image:secure_url" content={ogImage} />
	{/if}

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={TWITTER_SITE} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
	<meta name="twitter:creator" content={TWITTER_CREATOR} />

	{#each ldBlocks as block}
		{@html `<script type="application/ld+json">${JSON.stringify(block).replace(/</g, '\\u003c')}</script>`}
	{/each}
</svelte:head>
