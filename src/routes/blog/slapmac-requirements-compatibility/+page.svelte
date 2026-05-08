<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { Moon, Sun, Download } from 'lucide-svelte';
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from '$lib/seo/jsonld';
	import { DOWNLOAD_URL } from '$lib/slapmac/data';
	import { trackDownloadClick } from '$lib/analytics/mixpanel-seo';

	const PAGE_PATH = '/blog/slapmac-requirements-compatibility';
	const PAGE_TITLE = 'SlapMac Requirements: Which MacBooks Are Compatible?';
	const PAGE_DESCRIPTION =
		'SlapMac requires Apple Silicon M1 Pro or newer and macOS 14.6 Sonoma. Here\'s the full compatibility list — supported MacBook Pros, why MacBook Air isn\'t supported, and what to do if your Mac doesn\'t qualify.';
	const PAGE_KEYWORDS =
		'slapmac requirements, slapmac compatibility, slapmac macbook pro, slapmac m1 pro, slapmac m2, slapmac m3, slapmac m4, which mac works with slapmac, slapmac macos version';

	const breadcrumbs = buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: 'Requirements', path: PAGE_PATH }]);
	const webPage = buildWebPageJsonLd({ path: PAGE_PATH, name: PAGE_TITLE, description: PAGE_DESCRIPTION });

	const supported = [
		{ chip: 'M1 Pro / M1 Max', models: 'MacBook Pro 14" and 16" (late 2021)' },
		{ chip: 'M2 Pro / M2 Max', models: 'MacBook Pro 14" and 16" (Jan 2023)' },
		{ chip: 'M3 Pro / M3 Max', models: 'MacBook Pro 14" and 16" (Nov 2023)' },
		{ chip: 'M4 Pro / M4 Max', models: 'MacBook Pro 14" and 16" (Nov 2024)' }
	];

	const notSupported = [
		{ device: 'MacBook Air (all models)', reason: 'Accelerometer lacks the sample rate/resolution SlapMac needs' },
		{ device: 'MacBook Pro with M1, M2, M3, M4 (base)', reason: 'Same accelerometer limitation as MacBook Air' },
		{ device: 'Intel MacBook Pro (pre-2020)', reason: 'Different sensor pipeline, not supported by CoreMotion in the same way' },
		{ device: 'Mac mini, iMac, Mac Studio, Mac Pro', reason: 'No built-in accelerometer' },
		{ device: 'MacBook (12", discontinued)', reason: 'Intel-based, no compatible accelerometer' }
	];

	let dark = $state(false);
	let themeReady = $state(false);
	onMount(() => {
		const s = localStorage.getItem('slapmac-theme');
		dark = s === 'dark' || (!s && window.matchMedia('(prefers-color-scheme: dark)').matches);
		themeReady = true;
	});
	$effect(() => {
		if (!browser || !themeReady) return;
		document.documentElement.classList.toggle('dark', dark);
		localStorage.setItem('slapmac-theme', dark ? 'dark' : 'light');
	});
	function toggleTheme() { dark = !dark; }
</script>

<SeoHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} keywords={PAGE_KEYWORDS} canonicalPath={PAGE_PATH} ogType="article" structuredData={[webPage, breadcrumbs]} />

<div class="page-root">
	<div class="bg-rays" aria-hidden="true"></div>
	<nav class="nav">
		<a href="/blog" class="nav-back">← Blog</a>
		<div class="nav-right">
			<a href="/" class="nav-link">Home</a>
			<button type="button" class="theme-btn" aria-label="Toggle dark mode" onclick={toggleTheme}>
				{#if dark}<Sun class="icon-sm" strokeWidth={2} />{:else}<Moon class="icon-sm" strokeWidth={2} />{/if}
			</button>
		</div>
	</nav>

	<article class="article">
		<nav class="breadcrumb" aria-label="Breadcrumb">
			<a href="/">Home</a> <span>/</span> <a href="/blog">Blog</a> <span>/</span> <span>Requirements</span>
		</nav>
		<header class="article-header">
			<div class="article-meta-top">
				<span class="tag tag--orange">Compatibility</span>
				<span class="article-date">May 2026 · 4 min read</span>
			</div>
			<h1 class="article-title">SlapMac Requirements: Which MacBooks Are Compatible?</h1>
			<p class="article-lede">
				SlapMac works on fewer Macs than you'd expect — not by design, but because slap detection
				depends on a specific accelerometer configuration. Here's the full list.
			</p>
		</header>

		<div class="snippet-block">
			<p class="snippet-label">Quick answer</p>
			<p>SlapMac requires <strong>Apple Silicon M1 Pro or newer</strong> (MacBook Pro 14" or 16" from late 2021 onward) and <strong>macOS 14.6 Sonoma or later</strong>. MacBook Air, Intel Macs, and base M1/M2/M3/M4 chips are not supported.</p>
		</div>

		<div class="article-body">
			<h2>Supported MacBooks</h2>
			<div class="compat-table">
				<div class="compat-row compat-row--header">
					<span>Chip</span>
					<span>Models</span>
					<span>Status</span>
				</div>
				{#each supported as row}
					<div class="compat-row">
						<span class="chip-name">{row.chip}</span>
						<span class="model-name">{row.models}</span>
						<span class="status status--yes">✓ Supported</span>
					</div>
				{/each}
			</div>

			<h2>Not supported</h2>
			<div class="compat-table">
				<div class="compat-row compat-row--header">
					<span>Device</span>
					<span>Reason</span>
				</div>
				{#each notSupported as row}
					<div class="compat-row compat-row--no">
						<span class="chip-name">{row.device}</span>
						<span class="model-name">{row.reason}</span>
					</div>
				{/each}
			</div>

			<h2>Why not MacBook Air?</h2>
			<p>MacBook Air models (M1, M2, M3) have a built-in accelerometer, but it samples at a lower rate and with less resolution than the MacBook Pro variant. SlapMac's slap detection algorithms need a high-fidelity accelerometer signal to distinguish a hard slap from normal desk vibration. The Air's sensor doesn't provide enough data for reliable discrimination.</p>
			<p>This isn't artificial exclusion — it's a hardware capability gap. The developer has confirmed they tried to support MacBook Air and the false positive rate was unacceptable.</p>

			<h2>Why M1 Pro and not base M1?</h2>
			<p>The same reason applies to the base M1 chip. Apple Silicon MacBook Pro models with Pro/Max chips use a higher-resolution motion sensor than the MacBook Air (which shares its sensor spec with the base M1). SlapMac requires the Pro/Max variant.</p>

			<h2>macOS requirement — why 14.6 Sonoma?</h2>
			<p>SlapMac uses CoreMotion APIs and SwiftUI features introduced in macOS 14 Sonoma. The developer targeted 14.6 specifically because it was the stable release when SlapMac was built. It runs on macOS 15 Sequoia and any future macOS release as long as Apple doesn't deprecate the underlying sensor APIs (which they have no reason to do).</p>

			<h2>How to check your Mac</h2>
			<p>To verify your Mac's chip: click the  menu (top-left) → <strong>About This Mac</strong>. Look for the chip name. If it says "M1 Pro", "M1 Max", "M2 Pro", "M2 Max", "M3 Pro", "M3 Max", "M4 Pro", or "M4 Max" — you're supported. If it says just "M1", "M2", "M3", "M4", or any Intel processor — SlapMac won't work.</p>

			<h2>What if my Mac isn't supported?</h2>
			<p>There's no workaround for the hardware limitation. If you want the USB Moaner feature specifically (charger sounds), check out the <a href="/mac-sound-on-charger-connect-disconnect">charger sound alternatives guide</a> for Shortcuts-based solutions that work on any Mac (with caveats around speed and reliability).</p>

			<div class="inline-cta">
				<a href={DOWNLOAD_URL} class="btn-primary" onclick={() => trackDownloadClick('requirements_blog')}>
					<Download class="icon-sm" strokeWidth={2} /> Download SlapMac — $3
				</a>
				<span class="inline-cta-meta">M1 Pro / M2 Pro / M3 Pro / M4 Pro · macOS 14.6+ · One-time</span>
			</div>
		</div>
	</article>

	<section class="related">
		<h2 class="related-title">Keep reading</h2>
		<div class="related-grid">
			<a href="/blog/what-is-slapmac" class="related-card"><span class="related-emoji">👋</span><span class="related-name">What Is SlapMac?</span><span class="related-desc">Complete app overview</span></a>
			<a href="/blog/macbook-accelerometer-slap-detection" class="related-card"><span class="related-emoji">📡</span><span class="related-name">How Slap Detection Works</span><span class="related-desc">The accelerometer tech explained</span></a>
			<a href="/blog/slapmac-setup-guide" class="related-card"><span class="related-emoji">⚡</span><span class="related-name">Setup Guide</span><span class="related-desc">Install SlapMac in 2 minutes</span></a>
			<a href="/blog/slapmac-review" class="related-card"><span class="related-emoji">⭐</span><span class="related-name">SlapMac Review</span><span class="related-desc">Honest verdict after daily use</span></a>
		</div>
	</section>

	<footer class="site-foot">
		<div class="site-foot-nav">
			<a href="/" class="site-foot-link">Home</a><span class="site-foot-dot">·</span>
			<a href="/blog" class="site-foot-link">Blog</a><span class="site-foot-dot">·</span>
			<a href="/features" class="site-foot-link">Features</a><span class="site-foot-dot">·</span>
			<a href="/privacy" class="site-foot-link">Privacy</a>
		</div>
	</footer>
</div>

<style>
	.page-root { position: relative; min-height: 100vh; background: var(--background); color: var(--foreground); overflow-x: hidden; }
	.bg-rays { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse 70% 35% at 50% 0%, color-mix(in oklab, var(--primary) 10%, transparent), transparent 55%); z-index: 0; }
	.nav { position: relative; z-index: 10; display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.5rem; max-width: 48rem; margin: 0 auto; }
	.nav-back { font-size: 0.85rem; color: var(--muted-foreground); transition: color 0.15s; }
	.nav-back:hover { color: var(--foreground); }
	.nav-right { display: flex; align-items: center; gap: 1rem; }
	.nav-link { font-size: 0.8rem; color: var(--muted-foreground); transition: color 0.15s; }
	.theme-btn { display: flex; height: 2rem; width: 2rem; align-items: center; justify-content: center; border-radius: 9999px; border: 1px solid var(--border); background: transparent; color: var(--muted-foreground); cursor: pointer; }
	.icon-sm { height: 1rem; width: 1rem; }
	.article { position: relative; z-index: 5; max-width: 44rem; margin: 0 auto; padding: 1.5rem 1.5rem 2rem; }
	.breadcrumb { font-size: 0.75rem; color: var(--muted-foreground); margin-bottom: 1.5rem; display: flex; flex-wrap: wrap; gap: 0.25rem; align-items: center; }
	.breadcrumb a { color: var(--muted-foreground); text-decoration: underline; text-underline-offset: 3px; }
	.breadcrumb a:hover { color: var(--foreground); }
	.article-header { margin-bottom: 1.5rem; }
	.article-meta-top { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.85rem; }
	.article-date { font-size: 0.75rem; color: var(--muted-foreground); font-family: var(--font-mono); }
	.tag { display: inline-block; padding: 0.2rem 0.65rem; border-radius: 9999px; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }
	.tag--orange { background: #ffedd5; color: #c2410c; }
	:global(html.dark) .tag--orange { background: #431407; color: #fdba74; }
	.article-title { font-size: 2rem; font-weight: 800; letter-spacing: -0.025em; line-height: 1.15; margin: 0 0 0.85rem; color: var(--foreground); }
	@media (min-width: 640px) { .article-title { font-size: 2.4rem; } }
	.article-lede { font-size: 1.05rem; line-height: 1.65; color: var(--muted-foreground); margin: 0; }
	.snippet-block { margin: 1.5rem 0; padding: 1.1rem 1.25rem; border-radius: 0.85rem; border-left: 3px solid var(--primary); background: color-mix(in oklab, var(--primary) 8%, var(--card)); font-size: 0.92rem; line-height: 1.6; }
	.snippet-label { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--primary); margin: 0 0 0.4rem; }
	.snippet-block p { margin: 0; color: var(--foreground); }
	.snippet-block strong { color: var(--foreground); font-weight: 600; }
	.article-body { font-size: 0.97rem; line-height: 1.72; color: var(--foreground); }
	.article-body h2 { font-size: 1.45rem; font-weight: 700; letter-spacing: -0.02em; margin: 2.25rem 0 0.65rem; color: var(--foreground); }
	.article-body p { margin: 0 0 1rem; }
	.article-body strong { color: var(--foreground); font-weight: 600; }
	.article-body a { color: var(--primary); text-decoration: underline; text-underline-offset: 3px; }
	.article-body a:hover { opacity: 0.8; }
	.compat-table { border: 1px solid var(--border); border-radius: 0.85rem; overflow: hidden; margin: 0 0 1.25rem; }
	.compat-row { display: grid; grid-template-columns: 1fr 2fr; gap: 0; padding: 0.7rem 1rem; border-bottom: 1px solid var(--border); font-size: 0.88rem; }
	.compat-row:last-child { border-bottom: none; }
	.compat-row--header { background: var(--muted); font-weight: 600; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted-foreground); }
	.compat-row:not(.compat-row--header) { grid-template-columns: 1fr 2fr auto; align-items: center; }
	.compat-row--no { grid-template-columns: 1fr 2fr !important; background: color-mix(in oklab, #ef4343 5%, transparent); }
	.chip-name { font-weight: 600; color: var(--foreground); }
	.model-name { color: var(--muted-foreground); font-size: 0.85rem; }
	.status--yes { color: var(--primary); font-weight: 700; font-size: 0.8rem; white-space: nowrap; }
	.inline-cta { display: flex; flex-direction: column; align-items: flex-start; gap: 0.5rem; margin: 2rem 0; }
	.btn-primary { display: inline-flex; align-items: center; gap: 0.4rem; height: 2.75rem; padding: 0 1.5rem; border-radius: 9999px; font-size: 0.9rem; font-weight: 600; background: var(--primary); color: var(--primary-foreground); border: none; box-shadow: 0 8px 20px color-mix(in oklab, var(--primary) 30%, transparent); transition: transform 0.15s; cursor: pointer; }
	.btn-primary:hover { transform: translateY(-2px); }
	.inline-cta-meta { font-size: 0.72rem; color: var(--muted-foreground); font-family: var(--font-mono); }
	.related { position: relative; z-index: 5; max-width: 44rem; margin: 3rem auto 0; padding: 0 1.5rem; }
	.related-title { font-size: 1.3rem; font-weight: 700; margin: 0 0 1rem; color: var(--foreground); }
	.related-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.85rem; }
	@media (max-width: 500px) { .related-grid { grid-template-columns: 1fr; } }
	.related-card { display: flex; flex-direction: column; gap: 0.3rem; padding: 1.1rem 1.15rem; border-radius: 1rem; border: 1px solid var(--border); background: var(--card); text-decoration: none; color: var(--foreground); transition: transform 0.18s, border-color 0.18s; }
	.related-card:hover { transform: translateY(-2px); border-color: color-mix(in oklab, var(--primary) 40%, var(--border)); }
	.related-emoji { font-size: 1.4rem; }
	.related-name { font-weight: 600; font-size: 0.9rem; }
	.related-desc { font-size: 0.8rem; line-height: 1.45; color: var(--muted-foreground); }
	.site-foot { margin-top: 4rem; padding: 28px 0 36px; border-top: 1px solid color-mix(in oklab, var(--border) 70%, transparent); }
	.site-foot-nav { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 10px 12px; }
	.site-foot-link { color: var(--muted-foreground); text-decoration: none; font-size: 13.5px; font-weight: 500; transition: color 0.15s; }
	.site-foot-link:hover { color: var(--foreground); }
	.site-foot-dot { color: color-mix(in oklab, var(--muted-foreground) 55%, transparent); font-size: 12px; user-select: none; }
</style>
