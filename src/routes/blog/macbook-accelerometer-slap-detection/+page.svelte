<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { Moon, Sun } from 'lucide-svelte';
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from '$lib/seo/jsonld';

	const PAGE_PATH = '/blog/macbook-accelerometer-slap-detection';
	const PAGE_TITLE = "How SlapMac Detects Slaps Using Your MacBook's Accelerometer";
	const PAGE_DESCRIPTION =
		"SlapMac uses the built-in accelerometer in Apple Silicon MacBook Pros and 5 detection algorithms — peak threshold, wave analysis, frequency, adaptive, and trend — to distinguish real slaps from accidental bumps.";
	const PAGE_KEYWORDS =
		'slapmac accelerometer, macbook accelerometer, slap detection algorithm, slapmac how it works, macbook motion sensor, apple silicon accelerometer, slapmac technical';

	const breadcrumbs = buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: 'Slap Detection', path: PAGE_PATH }]);
	const webPage = buildWebPageJsonLd({ path: PAGE_PATH, name: PAGE_TITLE, description: PAGE_DESCRIPTION });

	const algorithms = [
		{ name: 'Peak Threshold', icon: '📈', desc: 'The baseline algorithm. It monitors the raw magnitude of the acceleration vector and fires when a single peak exceeds your sensitivity threshold. Fast and reliable for obvious hard slaps. Can false-positive on desk bumps at low sensitivity.' },
		{ name: 'Wave Analysis', icon: '🌊', desc: 'Looks for the characteristic "impact wave" shape — a sharp spike followed by a rapid decay. Filters out slow rolls and gradual movements that would fool peak threshold. Better for distinguishing a slap from, say, moving your laptop across a desk.' },
		{ name: 'Frequency Analysis', icon: '🎵', desc: 'Analyzes the frequency content of the acceleration signal in a short window. Hard slaps have a distinctive high-frequency transient. This algorithm uses that signature to reject low-frequency events like the laptop being picked up.' },
		{ name: 'Adaptive', icon: '🤖', desc: 'Learns your ambient environment. If you work on a desk with regular low-level vibration (standing desk motors, mechanical keyboards), this algorithm adjusts its baseline dynamically so those don\'t count as slaps.' },
		{ name: 'Trend Analysis', icon: '📉', desc: 'Detects the overall motion trend across a slightly longer window. Useful for catching shake gestures — where no single peak is huge but the cumulative movement is significant. Powers the "shake" trigger in SlapMac.' }
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
			<a href="/">Home</a> <span>/</span> <a href="/blog">Blog</a> <span>/</span> <span>Slap Detection</span>
		</nav>
		<header class="article-header">
			<div class="article-meta-top">
				<span class="tag tag--orange">Technical</span>
				<span class="article-date">May 2026 · 6 min read</span>
			</div>
			<h1 class="article-title">How SlapMac Detects Slaps Using Your MacBook's Accelerometer</h1>
			<p class="article-lede">
				SlapMac doesn't use a camera, microphone, or machine learning model. It reads a hardware
				sensor that's been in MacBook Pros for years — and runs five algorithms on it simultaneously
				to tell your slap from a desk bump.
			</p>
		</header>

		<div class="snippet-block">
			<p class="snippet-label">Quick answer</p>
			<p>SlapMac reads the built-in 3-axis accelerometer in Apple Silicon MacBook Pro (M1 Pro+) via Apple's CoreMotion framework. It runs five detection algorithms simultaneously — peak threshold, wave analysis, frequency analysis, adaptive, and trend — and triggers sound when any algorithm fires above your sensitivity setting.</p>
		</div>

		<div class="article-body">
			<h2>The hardware: MacBook's accelerometer</h2>
			<p>Apple Silicon MacBook Pros contain a high-resolution 3-axis accelerometer — the same sensor family used in the iPhone for orientation, activity tracking, and the old "sudden motion sensor" that protected hard drives from drop damage. On M1 Pro and newer chips, this sensor samples at a high enough rate and with enough resolution that SlapMac can analyze the waveform of an impact, not just its peak value.</p>
			<p>This is why <strong>MacBook Air and Intel Macs aren't supported</strong>. MacBook Air models have the sensor, but it's sampled at a lower rate and with less granularity — not enough for reliable slap-vs-bump discrimination. Intel Macs have a different sensor pipeline entirely.</p>
			<p>SlapMac accesses the accelerometer through Apple's <strong>CoreMotion framework</strong> — the same framework used by health and fitness apps. It reads accelerometer data in real time with no elevated permissions beyond Accessibility (needed to show the overlay).</p>

			<h2>The 5 detection algorithms</h2>
			<p>SlapMac runs all five algorithms simultaneously on every frame of accelerometer data. Any one firing above your sensitivity threshold triggers a sound. They're designed to complement each other, not compete:</p>

			{#each algorithms as algo}
				<div class="algo-card">
					<div class="algo-header">
						<span class="algo-icon">{algo.icon}</span>
						<h3 class="algo-name">{algo.name}</h3>
					</div>
					<p class="algo-desc">{algo.desc}</p>
				</div>
			{/each}

			<h2>How sensitivity and cooldown interact with the algorithms</h2>
			<p><strong>Sensitivity</strong> sets the detection threshold across all algorithms. Higher sensitivity = more algorithms fire on lighter impacts. Lower sensitivity = only the most forceful slaps trigger any algorithm.</p>
			<p><strong>Cooldown</strong> is a post-fire lockout. After any algorithm fires, all five are suppressed for the cooldown period. This prevents a single slap from generating three sound events as its vibration rings out.</p>
			<p>For most users: sensitivity around 45–60, cooldown around 20–30 seconds gives reliable per-slap triggering without false positives from keyboard typing or moving the machine.</p>

			<h2>Common tuning problems</h2>
			<p><strong>"It fires when I type"</strong> — raise sensitivity by 15–20. Keyboard impacts don't have the same high-frequency signature as a slap, but at very low sensitivity the peak threshold can still catch them.</p>
			<p><strong>"It won't fire even when I slap hard"</strong> — lower sensitivity. The adaptive algorithm may have set a high baseline if you started the app during a period of high desk vibration (e.g., with a standing desk motor running).</p>
			<p><strong>"It fires twice per slap"</strong> — raise cooldown. The ringing vibration after a hard slap is catching a second trigger window. 25–35 seconds usually fixes this.</p>

			<h2>Is this safe for the MacBook?</h2>
			<p>Yes. SlapMac is a passive sensor reader — it doesn't control hardware or issue commands to the machine. The slap itself is the physical act; SlapMac just listens to what already happened. Apple Silicon MacBook Pros are engineered to withstand normal handling forces that exceed any reasonable desk slap. The sensor won't be damaged by normal use.</p>
		</div>
	</article>

	<section class="related">
		<h2 class="related-title">Keep reading</h2>
		<div class="related-grid">
			<a href="/blog/what-is-slapmac" class="related-card"><span class="related-emoji">👋</span><span class="related-name">What Is SlapMac?</span><span class="related-desc">Complete app overview</span></a>
			<a href="/blog/slapmac-setup-guide" class="related-card"><span class="related-emoji">⚡</span><span class="related-name">Setup Guide</span><span class="related-desc">Install and configure SlapMac</span></a>
			<a href="/blog/slapmac-requirements-compatibility" class="related-card"><span class="related-emoji">💻</span><span class="related-name">Compatibility</span><span class="related-desc">Which MacBooks are supported?</span></a>
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
	.article-body { font-size: 0.97rem; line-height: 1.72; color: var(--foreground); }
	.article-body h2 { font-size: 1.45rem; font-weight: 700; letter-spacing: -0.02em; margin: 2.25rem 0 0.65rem; color: var(--foreground); }
	.article-body p { margin: 0 0 1rem; }
	.article-body strong { color: var(--foreground); font-weight: 600; }
	.article-body a { color: var(--primary); text-decoration: underline; text-underline-offset: 3px; }
	.article-body a:hover { opacity: 0.8; }
	.algo-card { margin: 1rem 0; padding: 1.1rem 1.15rem; border-radius: 0.9rem; border: 1px solid var(--border); background: var(--card); }
	.algo-header { display: flex; align-items: center; gap: 0.7rem; margin-bottom: 0.5rem; }
	.algo-icon { font-size: 1.4rem; }
	.algo-name { margin: 0; font-size: 1rem; font-weight: 700; color: var(--foreground); }
	.algo-desc { margin: 0; font-size: 0.88rem; line-height: 1.58; color: var(--muted-foreground); }
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
