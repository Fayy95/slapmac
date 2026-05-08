<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { Moon, Sun, Download } from 'lucide-svelte';
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from '$lib/seo/jsonld';
	import { getSiteUrl, SITE_NAME } from '$lib/seo/site';
	import { DOWNLOAD_URL } from '$lib/slapmac/data';
	import { trackDownloadClick } from '$lib/analytics/mixpanel-seo';

	const PAGE_PATH = '/blog/slapmac-setup-guide';
	const PAGE_TITLE = 'How to Install and Set Up SlapMac in 2 Minutes';
	const PAGE_DESCRIPTION =
		'Step-by-step guide to downloading, installing, and configuring SlapMac on your MacBook Pro. Pick a voice pack, tune sensitivity, enable USB Moaner — done in 2 minutes.';
	const PAGE_KEYWORDS =
		'slapmac setup, how to install slapmac, slapmac guide, slapmac download, slapmac configuration, slapmac sensitivity, slapmac voice pack setup';

	const siteUrl = getSiteUrl();
	const canonical = `${siteUrl}${PAGE_PATH}`;

	const howToJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'HowTo',
		name: 'How to install and set up SlapMac',
		description: PAGE_DESCRIPTION,
		url: canonical,
		totalTime: 'PT2M',
		step: [
			{ '@type': 'HowToStep', position: 1, name: 'Download SlapMac', text: 'Go to slapmymac.net and click Download. You\'ll get a .dmg file.' },
			{ '@type': 'HowToStep', position: 2, name: 'Install the app', text: 'Open the .dmg, drag SlapMyMac.app into your Applications folder, then open it from Applications or Spotlight.' },
			{ '@type': 'HowToStep', position: 3, name: 'Grant permissions', text: 'macOS will ask for Accessibility access. Go to System Settings → Privacy & Security → Accessibility and enable SlapMyMac.' },
			{ '@type': 'HowToStep', position: 4, name: 'Choose a voice pack', text: 'Click the SlapMac icon in the menu bar and select a voice pack from the list. Woman, Combo Hit, Goat — pick your poison.' },
			{ '@type': 'HowToStep', position: 5, name: 'Tune sensitivity', text: 'Drag the Sensitivity slider. Start at 50 and adjust after a few test slaps.' },
			{ '@type': 'HowToStep', position: 6, name: 'Slap your MacBook', text: 'Give the side of your MacBook a firm slap. If it screams, you\'re done.' }
		]
	};

	const breadcrumbs = buildBreadcrumbJsonLd([
		{ name: 'Home', path: '/' },
		{ name: 'Blog', path: '/blog' },
		{ name: 'Setup Guide', path: PAGE_PATH }
	]);
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

<SeoHead title={PAGE_TITLE} description={PAGE_DESCRIPTION} keywords={PAGE_KEYWORDS} canonicalPath={PAGE_PATH} ogType="article" structuredData={[webPage, breadcrumbs, howToJsonLd]} />

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
			<a href="/">Home</a> <span>/</span> <a href="/blog">Blog</a> <span>/</span> <span>Setup Guide</span>
		</nav>
		<header class="article-header">
			<div class="article-meta-top">
				<span class="tag tag--blue">How-To</span>
				<span class="article-date">May 2026 · 4 min read</span>
			</div>
			<h1 class="article-title">How to Install and Set Up SlapMac in 2 Minutes</h1>
			<p class="article-lede">
				SlapMac installs like any other Mac app and needs one permission to work. Here's the full
				setup — from download to your first slap — in six steps.
			</p>
		</header>

		<div class="snippet-block">
			<p class="snippet-label">Quick answer</p>
			<p>Download SlapMac from slapmymac.net, drag it to Applications, grant Accessibility permission in System Settings, pick a voice pack in the menu bar, set sensitivity to ~50, and slap your MacBook. Total time: under 2 minutes.</p>
		</div>

		<div class="article-body">
			<h2>Before you start — compatibility check</h2>
			<p>SlapMac requires <strong>Apple Silicon M1 Pro or newer</strong> and <strong>macOS 14.6 Sonoma or later</strong>. If you have a MacBook Air or an Intel Mac, it won't work. Check our <a href="/blog/slapmac-requirements-compatibility">compatibility guide</a> if you're unsure.</p>

			<h2>Step 1 — Download</h2>
			<p>Go to <a href="/">slapmymac.net</a> and click the Download button. You'll get a .dmg file (around 8 MB). The purchase is handled via Paddle — enter your email and card details, and you'll receive a license key by email.</p>

			<h2>Step 2 — Install</h2>
			<p>Open the .dmg file. Drag <strong>SlapMyMac.app</strong> into your Applications folder. Eject the disk image. Open the app from Applications, Spotlight, or Launchpad. You'll see the hand icon appear in your menu bar.</p>

			<h2>Step 3 — Grant Accessibility permission</h2>
			<p>SlapMac needs Accessibility access to read the accelerometer. macOS will prompt you automatically. If it doesn't:</p>
			<ul>
				<li>Open <strong>System Settings → Privacy & Security → Accessibility</strong></li>
				<li>Click the <strong>+</strong> button and add SlapMyMac</li>
				<li>Make sure the toggle is turned on</li>
			</ul>
			<p>Without this permission the menu bar icon appears but slap detection won't fire.</p>

			<h2>Step 4 — Pick a voice pack</h2>
			<p>Click the ✋ icon in the menu bar. You'll see the voice pack selector — seven options: Woman, Combo Hit, Whiny, Fart, Gentleman, Yamete, Goat. Click a pack name to preview a sample. When you've found one you like, it's selected automatically.</p>
			<p>Not sure which to pick? Start with <strong>Woman</strong> (the most dramatic) or <strong>Combo Hit</strong> (fighting game sounds — great for the office). Full breakdown: <a href="/blog/slapmac-voice-packs">all 7 voice packs explained →</a></p>

			<h2>Step 5 — Tune sensitivity and cooldown</h2>
			<p><strong>Sensitivity</strong> controls how hard you need to slap before it triggers. Start at 50 and adjust: if it fires from light desk vibrations, go higher (70–80). If it only fires when you really whale on it, go lower (30–40).</p>
			<p><strong>Cooldown</strong> controls the minimum time between sounds (in seconds). At 0 you can rapid-fire. At 30+ it won't trigger again for half a minute — good for offices where one slap is funny, ten are not.</p>

			<h2>Step 6 — Optional extras</h2>
			<p><strong>Enable USB Moaner</strong> in Settings to play sounds when your charger connects or disconnects. <strong>Enable Lid Creak</strong> for a horror-movie creak every time you open the lid. Both are off by default.</p>
			<p>Enable <strong>Launch at Login</strong> so SlapMac restarts automatically after a reboot.</p>

			<h2>Your first slap</h2>
			<p>Give the palm rest or side panel a firm-but-reasonable slap. Not a gentle tap — a solid hit, like you're testing a watermelon at the market. If a sound plays, you're done. If nothing happens, lower sensitivity by 10 and try again.</p>

			<div class="inline-cta">
				<a href={DOWNLOAD_URL} class="btn-primary" onclick={() => trackDownloadClick('setup_blog')}>
					<Download class="icon-sm" strokeWidth={2} /> Download SlapMac — $3
				</a>
				<span class="inline-cta-meta">One-time · No subscription · M1 Pro+ · macOS 14.6+</span>
			</div>

			<h2>What to read next</h2>
			<p>Now that SlapMac is running, explore what else it can do: <a href="/blog/slapmac-voice-packs">all 7 voice packs explained</a>, <a href="/blog/slapmac-custom-sounds">how to add your own sounds</a>, or <a href="/blog/slapmac-usb-moaner">setting up USB Moaner</a>.</p>
		</div>
	</article>

	<section class="related">
		<h2 class="related-title">Keep reading</h2>
		<div class="related-grid">
			<a href="/blog/what-is-slapmac" class="related-card"><span class="related-emoji">👋</span><span class="related-name">What Is SlapMac?</span><span class="related-desc">The complete guide to the app</span></a>
			<a href="/blog/slapmac-voice-packs" class="related-card"><span class="related-emoji">🔊</span><span class="related-name">Voice Packs</span><span class="related-desc">All 7 sound collections explained</span></a>
			<a href="/blog/slapmac-custom-sounds" class="related-card"><span class="related-emoji">🎵</span><span class="related-name">Custom Sounds</span><span class="related-desc">Use your own MP3s and WAVs</span></a>
			<a href="/blog/slapmac-requirements-compatibility" class="related-card"><span class="related-emoji">💻</span><span class="related-name">Compatibility</span><span class="related-desc">Which MacBooks work with SlapMac?</span></a>
		</div>
	</section>

	<footer class="site-foot">
		<div class="site-foot-nav">
			<a href="/" class="site-foot-link">Home</a><span class="site-foot-dot">·</span>
			<a href="/blog" class="site-foot-link">Blog</a><span class="site-foot-dot">·</span>
			<a href="/features" class="site-foot-link">Features</a><span class="site-foot-dot">·</span>
			<a href="/privacy" class="site-foot-link">Privacy</a><span class="site-foot-dot">·</span>
			<a href="/terms" class="site-foot-link">Terms</a>
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
	.nav-link:hover { color: var(--foreground); }
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
	.tag--blue { background: #dbeafe; color: #1d4ed8; }
	:global(html.dark) .tag--blue { background: #1e3a5f; color: #93c5fd; }
	.article-title { font-size: 2rem; font-weight: 800; letter-spacing: -0.025em; line-height: 1.15; margin: 0 0 0.85rem; color: var(--foreground); }
	@media (min-width: 640px) { .article-title { font-size: 2.4rem; } }
	.article-lede { font-size: 1.05rem; line-height: 1.65; color: var(--muted-foreground); margin: 0; }
	.snippet-block { margin: 1.5rem 0; padding: 1.1rem 1.25rem; border-radius: 0.85rem; border-left: 3px solid var(--primary); background: color-mix(in oklab, var(--primary) 8%, var(--card)); font-size: 0.92rem; line-height: 1.6; }
	.snippet-label { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--primary); margin: 0 0 0.4rem; }
	.snippet-block p { margin: 0; color: var(--foreground); }
	.article-body { font-size: 0.97rem; line-height: 1.72; color: var(--foreground); }
	.article-body h2 { font-size: 1.45rem; font-weight: 700; letter-spacing: -0.02em; margin: 2.25rem 0 0.65rem; color: var(--foreground); }
	.article-body p { margin: 0 0 1rem; }
	.article-body ul { padding-left: 1.25rem; margin: 0 0 1rem; }
	.article-body li { margin-bottom: 0.4rem; }
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
