<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { Moon, Sun, Download } from 'lucide-svelte';
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from '$lib/seo/jsonld';
	import { DOWNLOAD_URL } from '$lib/slapmac/data';
	import { trackDownloadClick } from '$lib/analytics/mixpanel-seo';

	const PAGE_PATH = '/blog/slapmac-review';
	const PAGE_TITLE = 'SlapMac Review: Is $3 Worth It for a MacBook Sound App?';
	const PAGE_DESCRIPTION =
		'Honest SlapMac review after daily use — what it does brilliantly, what\'s missing, who should buy it, and whether a $3 MacBook slap app is genuinely worth your money.';
	const PAGE_KEYWORDS =
		'slapmac review, is slapmac worth it, slapmac honest review, slapmac rating, slapmac pros cons, slapmac verdict, should i buy slapmac';

	const reviewJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Review',
		name: PAGE_TITLE,
		reviewBody: PAGE_DESCRIPTION,
		reviewRating: { '@type': 'Rating', ratingValue: '4.5', bestRating: '5', worstRating: '1' },
		itemReviewed: { '@type': 'SoftwareApplication', name: 'SlapMac', operatingSystem: 'macOS', applicationCategory: 'UtilitiesApplication', offers: { '@type': 'Offer', price: '3', priceCurrency: 'USD' } }
	};

	const breadcrumbs = buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: 'Review', path: PAGE_PATH }]);
	const webPage = buildWebPageJsonLd({ path: PAGE_PATH, name: PAGE_TITLE, description: PAGE_DESCRIPTION });

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

<SeoHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} keywords={PAGE_KEYWORDS} canonicalPath={PAGE_PATH} ogType="article" structuredData={[webPage, breadcrumbs, reviewJsonLd]} />

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
			<a href="/">Home</a> <span>/</span> <a href="/blog">Blog</a> <span>/</span> <span>Review</span>
		</nav>
		<header class="article-header">
			<div class="article-meta-top">
				<span class="tag tag--yellow">Review</span>
				<span class="article-date">May 2026 · 6 min read</span>
			</div>
			<h1 class="article-title">SlapMac Review: Is $3 Worth It for a MacBook Sound App?</h1>
			<p class="article-lede">
				SlapMac has a job. It does that job well. Here's an honest look at what it gets right,
				what it lacks, and exactly who should buy it.
			</p>
		</header>

		<div class="review-verdict">
			<div class="verdict-score">4.5<span>/5</span></div>
			<div class="verdict-text">
				<p class="verdict-summary">Brilliant for what it is — a tiny, native, well-built piece of MacBook entertainment. Docks half a point for the limited compatibility (M1 Pro+).</p>
				<div class="verdict-stars" aria-label="4.5 out of 5 stars">★★★★½</div>
			</div>
		</div>

		<div class="snippet-block">
			<p class="snippet-label">Quick verdict</p>
			<p>SlapMac is worth $3 if you own a compatible MacBook Pro (M1 Pro or newer). It's native Swift, no subscription, no tracking, works exactly as described, and the Goat voice pack alone justifies the price. Not compatible with MacBook Air or Intel Macs.</p>
		</div>

		<div class="article-body">
			<h2>What SlapMac does</h2>
			<p>A $3 menu bar app that listens to your MacBook's accelerometer and plays a sound when you slap it. Seven built-in voice packs (160+ sounds). Custom sound folder support. USB Moaner for charger events. Lid Creak. Slap counter. That's the whole product.</p>
			<p>There's no AI, no subscription, no social features, no dark patterns. It's a clean 8 MB app built in native Swift. The developer made it in 48 hours for fun and it went viral.</p>

			<h2>What it gets right</h2>
			<p><strong>The detection actually works.</strong> Five algorithms running simultaneously means false positives from typing or moving the laptop are rare once you tune sensitivity (takes 2 minutes). The sound fires within ~50ms of the impact — genuinely instant.</p>
			<p><strong>The voice packs are genuinely funny.</strong> Particularly the Goat pack, which has no right to be as universally funny as it is. Even the Gentleman pack ("Indubitably!") has gotten genuine laughs in Zoom calls.</p>
			<p><strong>It's native and lightweight.</strong> No Electron, no web views. Menu bar footprint is minimal — it doesn't show up in Activity Monitor in any meaningful way. Battery impact from the accelerometer polling is negligible.</p>
			<p><strong>One-time price, no nonsense.</strong> $3, license key by email, works forever. The developer could have charged $9/year. They didn't.</p>
			<p><strong>Custom sounds work well.</strong> Pointing it at a folder of MP3s and having them trigger on slap or charger events is a surprisingly capable feature for something described as a joke app.</p>

			<h2>What's missing</h2>
			<p><strong>Compatibility is limited.</strong> M1 Pro or newer only. No MacBook Air, no Intel. This is a real technical constraint (accelerometer fidelity), not artificial gating, but it still rules out a lot of Macs.</p>
			<p><strong>No iOS companion.</strong> Being able to slap your iPhone to trigger a sound on your Mac would be unhinged and perfect. It doesn't exist.</p>
			<p><strong>Sound pack customization is folder-level only.</strong> You can't mix and match individual sounds from different built-in packs.</p>

			<h2>Who should buy it</h2>
			<p>Buy SlapMac if: you own a MacBook Pro with M1 Pro or newer, you work with other humans (colleagues, family) who will be subjected to it, and you have any appreciation for spectacularly unnecessary software.</p>
			<p>Skip it if: you have a MacBook Air, an Intel Mac, or you genuinely cannot be in the same room as spontaneous sound effects.</p>

			<h2>The $3 question</h2>
			<p>$3 is less than a coffee. The entertainment-per-dollar ratio is among the highest of any software purchase you will ever make. The first time a colleague asks "what was that?" and you demonstrate, it pays for itself.</p>
			<p>The real risk is the 30-second attention span problem — you use it for a week, stop thinking about it, and it just lives quietly in your menu bar. That's fine. It's still $3.</p>

			<div class="inline-cta">
				<a href={DOWNLOAD_URL} class="btn-primary" onclick={() => trackDownloadClick('review_blog')}>
					<Download class="icon-sm" strokeWidth={2} /> Download SlapMac — $3
				</a>
				<span class="inline-cta-meta">One-time · No subscription · M1 Pro+ · macOS 14.6+</span>
			</div>
		</div>
	</article>

	<section class="related">
		<h2 class="related-title">Keep reading</h2>
		<div class="related-grid">
			<a href="/blog/what-is-slapmac" class="related-card"><span class="related-emoji">👋</span><span class="related-name">What Is SlapMac?</span><span class="related-desc">Complete guide to the app</span></a>
			<a href="/blog/slapmac-voice-packs" class="related-card"><span class="related-emoji">🔊</span><span class="related-name">Voice Packs</span><span class="related-desc">All 7 sound collections explained</span></a>
			<a href="/blog/slapmac-setup-guide" class="related-card"><span class="related-emoji">⚡</span><span class="related-name">Setup Guide</span><span class="related-desc">Get started in 2 minutes</span></a>
			<a href="/blog/slapmac-requirements-compatibility" class="related-card"><span class="related-emoji">💻</span><span class="related-name">Compatibility</span><span class="related-desc">Which MacBooks work?</span></a>
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
	.tag--yellow { background: #fef9c3; color: #a16207; }
	:global(html.dark) .tag--yellow { background: #3b2a00; color: #fde047; }
	.article-title { font-size: 2rem; font-weight: 800; letter-spacing: -0.025em; line-height: 1.15; margin: 0 0 0.85rem; color: var(--foreground); }
	@media (min-width: 640px) { .article-title { font-size: 2.4rem; } }
	.article-lede { font-size: 1.05rem; line-height: 1.65; color: var(--muted-foreground); margin: 0; }
	.review-verdict { display: flex; align-items: center; gap: 1.25rem; margin: 1.5rem 0; padding: 1.25rem 1.5rem; border-radius: 1rem; border: 1px solid color-mix(in oklab, var(--primary) 35%, var(--border)); background: color-mix(in oklab, var(--primary) 7%, var(--card)); }
	.verdict-score { font-size: 3rem; font-weight: 800; color: var(--primary); line-height: 1; flex-shrink: 0; }
	.verdict-score span { font-size: 1.2rem; color: var(--muted-foreground); font-weight: 400; }
	.verdict-summary { margin: 0 0 0.4rem; font-size: 0.9rem; line-height: 1.5; color: var(--foreground); }
	.verdict-stars { font-size: 1.2rem; color: var(--primary); letter-spacing: 0.05em; }
	.snippet-block { margin: 1.5rem 0; padding: 1.1rem 1.25rem; border-radius: 0.85rem; border-left: 3px solid var(--primary); background: color-mix(in oklab, var(--primary) 8%, var(--card)); font-size: 0.92rem; line-height: 1.6; }
	.snippet-label { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--primary); margin: 0 0 0.4rem; }
	.snippet-block p { margin: 0; color: var(--foreground); }
	.article-body { font-size: 0.97rem; line-height: 1.72; color: var(--foreground); }
	.article-body h2 { font-size: 1.45rem; font-weight: 700; letter-spacing: -0.02em; margin: 2.25rem 0 0.65rem; color: var(--foreground); }
	.article-body p { margin: 0 0 1rem; }
	.article-body strong { color: var(--foreground); font-weight: 600; }
	.article-body a { color: var(--primary); text-decoration: underline; text-underline-offset: 3px; }
	.article-body a:hover { opacity: 0.8; }
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
