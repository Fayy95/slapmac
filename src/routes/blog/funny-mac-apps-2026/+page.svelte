<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { Moon, Sun, Download } from 'lucide-svelte';
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from '$lib/seo/jsonld';
	import { DOWNLOAD_URL } from '$lib/slapmac/data';
	import { trackDownloadClick } from '$lib/analytics/mixpanel-seo';

	const PAGE_PATH = '/blog/funny-mac-apps-2026';
	const PAGE_TITLE = '9 Funny Mac Apps Worth Installing in 2026';
	const PAGE_DESCRIPTION =
		'SlapMac leads the list, but there\'s a whole ecosystem of delightful, absurd, and genuinely useful Mac apps that prove your computer doesn\'t have to be boring. 9 picks for 2026.';
	const PAGE_KEYWORDS =
		'funny mac apps, best mac apps 2026, slapmac alternatives, fun mac utilities, silly mac apps, entertaining mac software, weird mac apps, macbook fun apps';

	const breadcrumbs = buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: 'Funny Mac Apps 2026', path: PAGE_PATH }]);
	const webPage = buildWebPageJsonLd({ path: PAGE_PATH, name: PAGE_TITLE, description: PAGE_DESCRIPTION });

	const apps = [
		{ rank: 1, name: 'SlapMac', price: '$3 once', desc: 'The one that started it all — at least for this list. Slap your MacBook, it screams back. Seven voice packs, 160+ sounds, USB Moaner for charger events, Lid Creak. Unhinged in the best possible way. Requires M1 Pro+.', link: '/', linkLabel: 'Get SlapMac →' },
		{ rank: 2, name: 'Lungo', price: 'Free / $3.99', desc: 'Keeps your Mac awake. Not funny on its own — but the name (Italian for "long espresso") and the coffee-themed UI make it the most charming screen-awake app available. Beats Caffeine on aesthetics alone.', link: null, linkLabel: null },
		{ rank: 3, name: 'Hand Mirror', price: 'Free / $4.99', desc: 'A menu bar app that shows your camera feed so you can quickly check how you look before a call. Useful, slightly vain, and the name is perfect. Used by more professionals than will admit it.', link: null, linkLabel: null },
		{ rank: 4, name: 'Pockity', price: '$19.99', desc: 'A local-first Markdown notes app — not inherently funny, but its name and beaver mascot make it impossible to hate. Mentioned here because good software with a personality is rare.', link: null, linkLabel: null },
		{ rank: 5, name: 'Tot', price: '$19.99 or free on Setapp', desc: 'Seven dots in your menu bar, each a tiny scratchpad. The concept sounds trivial. In practice it\'s the fastest scratch pad you\'ll ever use. The dots are inexplicably delightful. It just makes you smile when you open it.', link: null, linkLabel: null },
		{ rank: 6, name: 'Mango 5Star', price: 'Free trial / paid', desc: 'Lets customers rate your business by holding up 1–5 fingers to your Mac\'s camera. Designed for retail. Also perfect for rating your own ideas, presentations, or meals cooked at home.', link: null, linkLabel: null },
		{ rank: 7, name: 'Desktop Curtain', price: '$4.99', desc: 'Hides your desktop with a plain colored curtain — because not everyone needs to see your 400 screenshots in a screen share. Simple, dignified, and solving a problem nobody talked about.', link: null, linkLabel: null },
		{ rank: 8, name: 'Typeeto', price: '$9.99', desc: 'Turns your Mac keyboard into a Bluetooth keyboard for iPad, iPhone, or Apple TV. Technically impressive, makes you feel like a wizard in ways that never get old.', link: null, linkLabel: null },
		{ rank: 9, name: 'Permute 3', price: '$14.99', desc: 'Drag files in, get converted files out — video, audio, images, everything. Not funny exactly, but the "just drop it in" UI philosophy is so satisfying that it qualifies as delightful software. Use it to prep custom sounds for SlapMac.', link: null, linkLabel: null }
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
			<a href="/">Home</a> <span>/</span> <a href="/blog">Blog</a> <span>/</span> <span>Funny Mac Apps 2026</span>
		</nav>
		<header class="article-header">
			<div class="article-meta-top">
				<span class="tag tag--green">Roundup</span>
				<span class="article-date">May 2026 · 7 min read</span>
			</div>
			<h1 class="article-title">9 Funny Mac Apps Worth Installing in 2026</h1>
			<p class="article-lede">
				Not every app needs to make you more productive. Some just need to make you — or someone
				nearby — laugh. Here are nine Mac apps that achieve that, led by the one that makes your
				MacBook scream.
			</p>
		</header>

		<div class="snippet-block">
			<p class="snippet-label">Quick list</p>
			<p>SlapMac (screams when slapped) · Lungo (keeps Mac awake, great name) · Hand Mirror (pre-call camera check) · Tot (seven-dot scratchpad) · Desktop Curtain (hides desktop in screen shares) · Typeeto (Mac keyboard → Bluetooth keyboard) · and four more below.</p>
		</div>

		<div class="article-body">
			{#each apps as app}
				<div class="app-card" class:app-card--featured={app.rank === 1}>
					<div class="app-header">
						<span class="app-rank">#{app.rank}</span>
						<div class="app-title-wrap">
							<h2 class="app-name">{app.name}</h2>
							<span class="app-price">{app.price}</span>
						</div>
					</div>
					<p class="app-desc">{app.desc}</p>
					{#if app.link}
						<a href={app.link} class="app-link" onclick={app.name === 'SlapMac' ? () => trackDownloadClick('funny_apps_blog') : undefined}>{app.linkLabel}</a>
					{/if}
				</div>
			{/each}

			<h2>The common thread</h2>
			<p>Every app on this list does one thing: it has a <em>personality</em>. Software with personality is rarer than it should be. Most apps are designed to be invisible and efficient. That's fine — but occasionally you want your computer to have opinions, or make sounds, or just have a name that makes you smile every time you look at it.</p>
			<p>SlapMac is the most extreme version of this — it has literally one feature and it cost the developer 48 hours. But Tot, Lungo, and Hand Mirror are all doing the same thing at a more subtle level: they care about the details that don't strictly need caring about.</p>
			<p>That's worth $3 (or $5, or $20).</p>

			<div class="inline-cta">
				<a href={DOWNLOAD_URL} class="btn-primary" onclick={() => trackDownloadClick('funny_apps_cta')}>
					<Download class="icon-sm" strokeWidth={2} /> Start with SlapMac — $3
				</a>
				<span class="inline-cta-meta">M1 Pro+ MacBook · macOS 14.6+ · One-time purchase</span>
			</div>
		</div>
	</article>

	<section class="related">
		<h2 class="related-title">More SlapMac guides</h2>
		<div class="related-grid">
			<a href="/blog/what-is-slapmac" class="related-card"><span class="related-emoji">👋</span><span class="related-name">What Is SlapMac?</span><span class="related-desc">Complete guide to the app</span></a>
			<a href="/blog/slapmac-review" class="related-card"><span class="related-emoji">⭐</span><span class="related-name">SlapMac Review</span><span class="related-desc">Is $3 worth it? Honest verdict.</span></a>
			<a href="/blog/slapmac-setup-guide" class="related-card"><span class="related-emoji">⚡</span><span class="related-name">Setup Guide</span><span class="related-desc">Get started in 2 minutes</span></a>
			<a href="/blog/slapmac-voice-packs" class="related-card"><span class="related-emoji">🔊</span><span class="related-name">Voice Packs</span><span class="related-desc">All 7 sound collections explained</span></a>
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
	.tag--green { background: color-mix(in oklab, var(--primary) 15%, transparent); color: var(--primary); }
	.article-title { font-size: 2rem; font-weight: 800; letter-spacing: -0.025em; line-height: 1.15; margin: 0 0 0.85rem; color: var(--foreground); }
	@media (min-width: 640px) { .article-title { font-size: 2.4rem; } }
	.article-lede { font-size: 1.05rem; line-height: 1.65; color: var(--muted-foreground); margin: 0; }
	.snippet-block { margin: 1.5rem 0; padding: 1.1rem 1.25rem; border-radius: 0.85rem; border-left: 3px solid var(--primary); background: color-mix(in oklab, var(--primary) 8%, var(--card)); font-size: 0.92rem; line-height: 1.6; }
	.snippet-label { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--primary); margin: 0 0 0.4rem; }
	.snippet-block p { margin: 0; color: var(--foreground); }
	.article-body { font-size: 0.97rem; line-height: 1.72; color: var(--foreground); }
	.article-body h2 { font-size: 1.45rem; font-weight: 700; letter-spacing: -0.02em; margin: 2.25rem 0 0.65rem; color: var(--foreground); }
	.article-body p { margin: 0 0 1rem; }
	.article-body em { font-style: italic; }
	.article-body a { color: var(--primary); text-decoration: underline; text-underline-offset: 3px; }
	.article-body a:hover { opacity: 0.8; }
	.app-card { margin: 1rem 0; padding: 1.25rem 1.25rem 1.1rem; border-radius: 1rem; border: 1px solid var(--border); background: var(--card); }
	.app-card--featured { border-color: color-mix(in oklab, var(--primary) 40%, var(--border)); background: linear-gradient(160deg, var(--card), color-mix(in oklab, var(--primary) 5%, var(--card))); }
	.app-header { display: flex; align-items: baseline; gap: 0.75rem; margin-bottom: 0.6rem; }
	.app-rank { font-size: 1.1rem; font-weight: 800; color: var(--primary); font-family: var(--font-mono); flex-shrink: 0; }
	.app-title-wrap { display: flex; align-items: baseline; gap: 0.65rem; flex-wrap: wrap; }
	.app-name { margin: 0; font-size: 1.1rem; font-weight: 700; color: var(--foreground); }
	.app-price { font-size: 0.75rem; color: var(--muted-foreground); font-family: var(--font-mono); }
	.app-desc { margin: 0 0 0.65rem; font-size: 0.9rem; line-height: 1.58; color: var(--muted-foreground); }
	.app-link { display: inline-block; font-size: 0.82rem; font-weight: 600; color: var(--primary); text-decoration: underline; text-underline-offset: 3px; }
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
