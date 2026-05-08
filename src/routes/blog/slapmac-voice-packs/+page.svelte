<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { Moon, Sun, Download } from 'lucide-svelte';
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from '$lib/seo/jsonld';
	import { getSiteUrl } from '$lib/seo/site';
	import { DOWNLOAD_URL } from '$lib/slapmac/data';
	import { trackDownloadClick } from '$lib/analytics/mixpanel-seo';

	const PAGE_PATH = '/blog/slapmac-voice-packs';
	const PAGE_TITLE = 'SlapMac Voice Packs: All 7 Sound Collections Explained';
	const PAGE_DESCRIPTION =
		'A complete breakdown of every SlapMac voice pack — Woman, Combo Hit, Whiny, Fart, Gentleman, Yamete, and Goat — with descriptions, best-use cases, and how to switch between them.';
	const PAGE_KEYWORDS =
		'slapmac voice packs, slapmac sounds, slapmac sound collections, slapmac woman pack, slapmac combo hit, slapmac goat, slapmac fart, slapmac gentleman';

	const breadcrumbs = buildBreadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: 'Voice Packs', path: PAGE_PATH }]);
	const webPage = buildWebPageJsonLd({ path: PAGE_PATH, name: PAGE_TITLE, description: PAGE_DESCRIPTION });

	const packs = [
		{ emoji: '😱', name: 'Woman', vibe: 'Dramatic · Cinematic · Maximum chaos', desc: 'The most expressive pack. Sounds range from a startled gasp at light taps to a full theatrical scream at maximum force. This is what most people imagine when they think of SlapMac. Best for first-time demos.', best: 'First demos, co-workers who need to see it to believe it' },
		{ emoji: '🥊', name: 'Combo Hit', vibe: 'Fighting game · Satisfying · Punchy', desc: 'Street Fighter-style impact sounds — the kind that play when a character takes a hit. Light taps get a soft thud; hard slaps get the full multi-hit combo sound. Deeply satisfying if you grew up in arcades.', best: 'Gamers, standing desks, anywhere you want audible dopamine' },
		{ emoji: '😭', name: 'Whiny', vibe: 'Melodramatic · Groany · Absurd', desc: 'Exaggerated whimpers, groans, and complaints — the sound of a toddler being told it\'s bedtime. The pitch rises with force in a way that\'s almost too realistic. This pack tends to make bystanders concerned.', best: 'Annoying your colleagues, solo late-night work sessions' },
		{ emoji: '💨', name: 'Fart', vibe: 'Juvenile · Reliable · Timeless', desc: 'Exactly what it says. The volume and wetness scale with slap force in a way that the developer clearly spent too long calibrating. Not recommended for open-plan offices unless you work somewhere great.', best: 'Anyone under 14 (or who remains 14 at heart)' },
		{ emoji: '🎩', name: 'Gentleman', vibe: 'Dignified · British · Unexpectedly funny', desc: 'Polished exclamations — "Indubitably!", "Good heavens!", "I say!" — delivered with impeccable calm. The contrast between a slap and a composed British response is 80% of the humor. Slow down, sir.', best: 'Professional settings, Zoom calls where you want a double-take' },
		{ emoji: '🌸', name: 'Yamete', vibe: 'Anime · High-pitched · A lot', desc: 'Anime-style protest sounds. This pack has the highest entertainment-to-regret ratio. Absolutely phenomenal for showing people who don\'t expect it; immediately silenced at family gatherings.', best: 'Anime fans, controlled environments, trolling your flatmates' },
		{ emoji: '🐐', name: 'Goat', vibe: 'Pure chaos · Inexplicably funny · Eternal', desc: 'Goat screams. Genuine, uncut goat screams at various intensities. Nobody can explain why goats screaming is funny. It just is. This pack is the one people screenshot and share without context.', best: 'Everything. Universally appropriate except at funerals.' }
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
			<a href="/">Home</a> <span>/</span> <a href="/blog">Blog</a> <span>/</span> <span>Voice Packs</span>
		</nav>
		<header class="article-header">
			<div class="article-meta-top">
				<span class="tag tag--purple">Feature Deep-Dive</span>
				<span class="article-date">May 2026 · 5 min read</span>
			</div>
			<h1 class="article-title">SlapMac Voice Packs: All 7 Sound Collections Explained</h1>
			<p class="article-lede">
				SlapMac ships with seven built-in voice packs containing 160+ sounds total. Here's what
				each pack sounds like, who it's for, and how to switch between them.
			</p>
		</header>

		<div class="snippet-block">
			<p class="snippet-label">Quick answer</p>
			<p>SlapMac's seven voice packs are: <strong>Woman</strong> (dramatic screams), <strong>Combo Hit</strong> (fighting game sounds), <strong>Whiny</strong> (melodramatic groans), <strong>Fart</strong> (self-explanatory), <strong>Gentleman</strong> (polished British exclamations), <strong>Yamete</strong> (anime protest sounds), and <strong>Goat</strong> (goat screams). Switch between them in the menu bar.</p>
		</div>

		<div class="article-body">
			<h2>How to switch voice packs</h2>
			<p>Click the ✋ icon in your menu bar → the pack selector is at the top of the dropdown. Click any pack name to activate it. Sounds take effect immediately — no restart needed. You can switch mid-slap-session.</p>

			<h2>The 7 voice packs, explained</h2>

			{#each packs as pack}
				<div class="pack-card">
					<div class="pack-header">
						<span class="pack-emoji">{pack.emoji}</span>
						<div>
							<h3 class="pack-name">{pack.name}</h3>
							<p class="pack-vibe">{pack.vibe}</p>
						</div>
					</div>
					<p class="pack-desc">{pack.desc}</p>
					<p class="pack-best"><strong>Best for:</strong> {pack.best}</p>
				</div>
			{/each}

			<h2>Which pack should you start with?</h2>
			<p><strong>Woman</strong> if you want maximum dramatic impact for first demos. <strong>Combo Hit</strong> if you want something that feels satisfying day-to-day. <strong>Goat</strong> if you just want to watch the world burn (lovingly).</p>
			<p>The good news: switching takes one click, so there's no wrong answer. Most people rotate based on who's in the room.</p>

			<h2>Want to use your own sounds?</h2>
			<p>SlapMac supports custom sound folders. Point it at any directory of MP3 or WAV files and it'll use those instead of — or alongside — the built-in packs. Guide: <a href="/blog/slapmac-custom-sounds">how to add custom sounds to SlapMac →</a></p>

			<div class="inline-cta">
				<a href={DOWNLOAD_URL} class="btn-primary" onclick={() => trackDownloadClick('voice_packs_blog')}>
					<Download class="icon-sm" strokeWidth={2} /> Download SlapMac — $3
				</a>
				<span class="inline-cta-meta">All 7 packs included · One-time purchase · M1 Pro+ · macOS 14.6+</span>
			</div>
		</div>
	</article>

	<section class="related">
		<h2 class="related-title">Keep reading</h2>
		<div class="related-grid">
			<a href="/blog/slapmac-custom-sounds" class="related-card"><span class="related-emoji">🎵</span><span class="related-name">Custom Sounds</span><span class="related-desc">Add your own MP3s and WAVs</span></a>
			<a href="/blog/slapmac-setup-guide" class="related-card"><span class="related-emoji">⚡</span><span class="related-name">Setup Guide</span><span class="related-desc">Get SlapMac running in 2 minutes</span></a>
			<a href="/blog/what-is-slapmac" class="related-card"><span class="related-emoji">👋</span><span class="related-name">What Is SlapMac?</span><span class="related-desc">The complete app overview</span></a>
			<a href="/blog/slapmac-review" class="related-card"><span class="related-emoji">⭐</span><span class="related-name">SlapMac Review</span><span class="related-desc">Is $3 worth it? Honest verdict.</span></a>
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
	.article-body strong { color: var(--foreground); font-weight: 600; }
	.article-body a { color: var(--primary); text-decoration: underline; text-underline-offset: 3px; }
	.article-body a:hover { opacity: 0.8; }
	.pack-card { margin: 1.25rem 0; padding: 1.25rem 1.25rem 1rem; border-radius: 1rem; border: 1px solid var(--border); background: var(--card); }
	.pack-header { display: flex; align-items: flex-start; gap: 0.85rem; margin-bottom: 0.65rem; }
	.pack-emoji { font-size: 2rem; line-height: 1; flex-shrink: 0; margin-top: 0.1rem; }
	.pack-name { margin: 0; font-size: 1.1rem; font-weight: 700; color: var(--foreground); }
	.pack-vibe { margin: 0.15rem 0 0; font-size: 0.75rem; color: var(--primary); font-weight: 600; font-family: var(--font-mono); }
	.pack-desc { margin: 0 0 0.6rem; font-size: 0.9rem; line-height: 1.58; color: var(--muted-foreground); }
	.pack-best { margin: 0; font-size: 0.82rem; color: var(--muted-foreground); }
	.pack-best strong { color: var(--foreground); }
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
