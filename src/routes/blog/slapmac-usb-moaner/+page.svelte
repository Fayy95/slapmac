<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { Moon, Sun, Download } from 'lucide-svelte';
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from '$lib/seo/jsonld';
	import { DOWNLOAD_URL } from '$lib/slapmac/data';
	import { trackDownloadClick } from '$lib/analytics/mixpanel-seo';

	const PAGE_PATH = '/blog/slapmac-usb-moaner';
	const PAGE_TITLE = 'SlapMac USB Moaner: Play Sounds When Your MacBook Charges';
	const PAGE_DESCRIPTION =
		'USB Moaner is SlapMac\'s feature that plays a sound when your MagSafe or USB-C charger connects or disconnects. Here\'s how to enable it, pick sounds, and troubleshoot.';
	const PAGE_KEYWORDS =
		'slapmac usb moaner, slapmac charger sound, slapmac magsafe sound, macbook charger connect sound, slapmac plug sound, usb moaner setup, slapmac charging notification';

	const breadcrumbs = buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: 'USB Moaner', path: PAGE_PATH }]);
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
			<a href="/">Home</a> <span>/</span> <a href="/blog">Blog</a> <span>/</span> <span>USB Moaner</span>
		</nav>
		<header class="article-header">
			<div class="article-meta-top">
				<span class="tag tag--purple">Feature Deep-Dive</span>
				<span class="article-date">May 2026 · 5 min read</span>
			</div>
			<h1 class="article-title">SlapMac USB Moaner: Play Sounds When Your MacBook Charges</h1>
			<p class="article-lede">
				USB Moaner turns your charger events into audio events. Plug in your MagSafe or USB-C
				cable — your Mac says something. Unplug it — different sound. Here's the full guide.
			</p>
		</header>

		<div class="snippet-block">
			<p class="snippet-label">Quick answer</p>
			<p>Enable USB Moaner in SlapMac Settings to play sounds when your charger connects or disconnects. Works with MagSafe 3 and any USB-C charger. Uses the same voice packs as slap detection, or your own custom audio files.</p>
		</div>

		<div class="article-body">
			<h2>What USB Moaner does</h2>
			<p>USB Moaner is SlapMac's second major feature — it listens for <strong>IOKit USB and power events</strong> from macOS and fires a sound the instant your charger state changes. Connect the charger: one sound. Disconnect: a different sound. Instant, no delay.</p>
			<p>This is different from what Shortcuts or Automator can do. Those tools poll for power state on a timer — meaning there's a 1–3 second lag between physical connection and the sound. USB Moaner uses a native event listener that fires in under 50ms.</p>

			<h2>How to enable USB Moaner</h2>
			<ol>
				<li>Click the ✋ icon in your menu bar</li>
				<li>Go to <strong>Settings</strong></li>
				<li>Toggle on <strong>USB Moaner</strong></li>
				<li>Plug or unplug your charger to test</li>
			</ol>
			<p>USB Moaner uses the same voice pack you've selected for slap detection. If you want different sounds for charger events, set up a <a href="/blog/slapmac-custom-sounds">custom sound folder</a> with a <code>connect</code> and <code>disconnect</code> subfolder.</p>

			<h2>Using custom sounds for connect vs disconnect</h2>
			<p>Create a folder with two subfolders:</p>
			<ul>
				<li><code>connect/</code> — sounds for when the charger plugs in</li>
				<li><code>disconnect/</code> — sounds for when the charger unplugs</li>
			</ul>
			<p>Put different audio files in each. In SlapMac Settings → Custom Sound Pack, point to the parent folder. Toggle on Use Custom Pack. Now charger connect and disconnect events play from their respective subfolders.</p>

			<h2>Works with MagSafe and USB-C</h2>
			<p>USB Moaner works with both <strong>MagSafe 3</strong> (the magnetic connector on MacBook Pro) and <strong>USB-C</strong> chargers. It listens to the OS-level power event, not the physical connector type — so any power source that macOS registers will trigger it.</p>
			<p>This includes USB-C docks and hubs that carry power. If you plug your laptop into a dock that also provides power, USB Moaner will fire.</p>

			<h2>Practical uses beyond the comedy</h2>
			<p><strong>Confirming cable connection.</strong> With MagSafe, you sometimes think the magnet caught but the laptop isn't actually charging. An instant audio confirmation removes all doubt.</p>
			<p><strong>Accidental unplug alerts.</strong> If a pet, colleague, or tangled bag unplugs your charger, you hear it immediately. Good for anyone who's been surprised by a dead battery in a meeting.</p>
			<p><strong>Accessibility.</strong> A clear audio cue is easier to register than glancing at the tiny battery icon in the menu bar, especially on larger screens where the menu bar is far away.</p>

			<h2>USB Moaner vs macOS Shortcuts</h2>
			<p>macOS Shortcuts can be set up to play a sound on charger events — but with significant downsides: 1–3 second delay, breaks after OS updates, and requires manual re-enabling after sleep cycles. USB Moaner is always-on, instant, and survives reboots because SlapMac launches at login.</p>
			<p>Full comparison: <a href="/mac-sound-on-charger-connect-disconnect">Mac charger sound page →</a></p>

			<h2>Troubleshooting</h2>
			<p><strong>"It doesn't fire when I plug in"</strong> — make sure USB Moaner is toggled on in Settings (the toggle can look on but be off if the app was just installed). Try toggling it off and back on.</p>
			<p><strong>"It fires twice"</strong> — some USB-C docks send two power events on connection (initial detection + negotiation). This is a macOS/dock behavior, not a SlapMac bug. Use a shorter cooldown for USB events in Settings (separate from slap cooldown in v1.3+).</p>

			<div class="inline-cta">
				<a href={DOWNLOAD_URL} class="btn-primary" onclick={() => trackDownloadClick('usb_moaner_blog')}>
					<Download class="icon-sm" strokeWidth={2} /> Download SlapMac — $3
				</a>
				<span class="inline-cta-meta">USB Moaner included · One-time · M1 Pro+ · macOS 14.6+</span>
			</div>
		</div>
	</article>

	<section class="related">
		<h2 class="related-title">Keep reading</h2>
		<div class="related-grid">
			<a href="/mac-sound-on-charger-connect-disconnect" class="related-card"><span class="related-emoji">🔌</span><span class="related-name">Charger Sound Page</span><span class="related-desc">Full MagSafe & USB-C guide</span></a>
			<a href="/blog/slapmac-custom-sounds" class="related-card"><span class="related-emoji">🎵</span><span class="related-name">Custom Sounds</span><span class="related-desc">Different sounds per event</span></a>
			<a href="/blog/slapmac-setup-guide" class="related-card"><span class="related-emoji">⚡</span><span class="related-name">Setup Guide</span><span class="related-desc">Full SlapMac configuration</span></a>
			<a href="/blog/slapmac-voice-packs" class="related-card"><span class="related-emoji">🔊</span><span class="related-name">Voice Packs</span><span class="related-desc">All 7 built-in sound packs</span></a>
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
	.tag--purple { background: #ede9fe; color: #7c3aed; }
	:global(html.dark) .tag--purple { background: #2e1d5e; color: #c4b5fd; }
	.article-title { font-size: 2rem; font-weight: 800; letter-spacing: -0.025em; line-height: 1.15; margin: 0 0 0.85rem; color: var(--foreground); }
	@media (min-width: 640px) { .article-title { font-size: 2.4rem; } }
	.article-lede { font-size: 1.05rem; line-height: 1.65; color: var(--muted-foreground); margin: 0; }
	.snippet-block { margin: 1.5rem 0; padding: 1.1rem 1.25rem; border-radius: 0.85rem; border-left: 3px solid var(--primary); background: color-mix(in oklab, var(--primary) 8%, var(--card)); font-size: 0.92rem; line-height: 1.6; }
	.snippet-label { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--primary); margin: 0 0 0.4rem; }
	.snippet-block p { margin: 0; color: var(--foreground); }
	.article-body { font-size: 0.97rem; line-height: 1.72; color: var(--foreground); }
	.article-body h2 { font-size: 1.45rem; font-weight: 700; letter-spacing: -0.02em; margin: 2.25rem 0 0.65rem; color: var(--foreground); }
	.article-body p { margin: 0 0 1rem; }
	.article-body ol, .article-body ul { padding-left: 1.25rem; margin: 0 0 1rem; }
	.article-body li { margin-bottom: 0.4rem; }
	.article-body strong { color: var(--foreground); font-weight: 600; }
	.article-body code { font-family: var(--font-mono); background: color-mix(in oklab, var(--primary) 12%, var(--card)); border: 1px solid var(--border); padding: 0.1rem 0.4rem; border-radius: 0.3rem; font-size: 0.88em; }
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
