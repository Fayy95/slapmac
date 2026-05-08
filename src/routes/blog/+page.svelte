<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { Moon, Sun, Rss } from 'lucide-svelte';
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from '$lib/seo/jsonld';
	import { getSiteUrl } from '$lib/seo/site';

	const PAGE_PATH = '/blog';
	const PAGE_TITLE = 'SlapMac Blog — Tips, Guides & Mac App News';
	const PAGE_DESCRIPTION =
		'Guides, deep-dives, and tips for SlapMac — the viral MacBook app that makes your Mac scream when you slap it. Learn about slap detection, voice packs, custom sounds, and more.';

	const siteUrl = getSiteUrl();

	const breadcrumbs = buildBreadcrumbJsonLd([
		{ name: 'Home', path: '/' },
		{ name: 'Blog', path: PAGE_PATH }
	]);

	const webPage = buildWebPageJsonLd({
		path: PAGE_PATH,
		name: PAGE_TITLE,
		description: PAGE_DESCRIPTION
	});

	const posts = [
		{
			slug: 'what-is-slapmac',
			emoji: '👋',
			tag: 'Ultimate Guide',
			tagColor: 'green',
			title: 'What Is SlapMac? The MacBook App That Screams Back',
			desc: 'Everything you need to know about SlapMac — how slap detection works, what the voice packs sound like, which MacBooks are compatible, and why it went viral.',
			readTime: '8 min read',
			date: 'May 2026'
		},
		{
			slug: 'slapmac-setup-guide',
			emoji: '⚡',
			tag: 'How-To',
			tagColor: 'blue',
			title: 'How to Install and Set Up SlapMac in 2 Minutes',
			desc: 'Step-by-step setup: download, install, pick a voice pack, tune sensitivity, and land your first slap. Works on M1 Pro+ MacBooks running macOS 14.6+.',
			readTime: '4 min read',
			date: 'May 2026'
		},
		{
			slug: 'slapmac-voice-packs',
			emoji: '🔊',
			tag: 'Feature Deep-Dive',
			tagColor: 'purple',
			title: 'SlapMac Voice Packs: All 7 Sound Collections Explained',
			desc: 'Woman, Combo Hit, Whiny, Fart, Gentleman, Yamete, Goat — what each pack sounds like, how many sounds it has, and which one to use when.',
			readTime: '5 min read',
			date: 'May 2026'
		},
		{
			slug: 'macbook-accelerometer-slap-detection',
			emoji: '📡',
			tag: 'Technical',
			tagColor: 'orange',
			title: 'How SlapMac Detects Slaps Using Your MacBook\'s Accelerometer',
			desc: 'The engineering behind SlapMac\'s 5 detection algorithms — peak threshold, wave analysis, frequency, adaptive, and trend — and how to tune them.',
			readTime: '6 min read',
			date: 'May 2026'
		},
		{
			slug: 'slapmac-review',
			emoji: '⭐',
			tag: 'Review',
			tagColor: 'yellow',
			title: 'SlapMac Review: Is $3 Worth It for a MacBook Sound App?',
			desc: 'Honest review after daily use: what works brilliantly, what\'s missing, and who will get the most out of the world\'s most unnecessary (and delightful) Mac utility.',
			readTime: '6 min read',
			date: 'May 2026'
		},
		{
			slug: 'slapmac-custom-sounds',
			emoji: '🎵',
			tag: 'How-To',
			tagColor: 'blue',
			title: 'How to Add Custom Sounds to SlapMac',
			desc: 'Replace the built-in voice packs with your own MP3s and WAVs. This guide covers the folder structure, supported formats, and tips for perfect slap sounds.',
			readTime: '4 min read',
			date: 'May 2026'
		},
		{
			slug: 'slapmac-usb-moaner',
			emoji: '🔌',
			tag: 'Feature Deep-Dive',
			tagColor: 'purple',
			title: 'SlapMac USB Moaner: Play Sounds When Your MacBook Charges',
			desc: 'USB Moaner turns your charger events into comedy gold. Here\'s how to set it up, pick different sounds for connect vs disconnect, and troubleshoot common issues.',
			readTime: '5 min read',
			date: 'May 2026'
		},
		{
			slug: 'funny-mac-apps-2026',
			emoji: '😂',
			tag: 'Roundup',
			tagColor: 'green',
			title: '9 Funny Mac Apps Worth Installing in 2026',
			desc: 'SlapMac leads the list, but there\'s a whole ecosystem of playful Mac utilities that prove your computer doesn\'t have to be boring.',
			readTime: '7 min read',
			date: 'May 2026'
		},
		{
			slug: 'slapmac-requirements-compatibility',
			emoji: '💻',
			tag: 'Compatibility',
			tagColor: 'orange',
			title: 'SlapMac Requirements: Which MacBooks Are Compatible?',
			desc: 'SlapMac needs Apple Silicon M1 Pro or newer and macOS 14.6 Sonoma. Here\'s why, plus what to do if your Mac doesn\'t qualify.',
			readTime: '4 min read',
			date: 'May 2026'
		}
	];

	const tagColors: Record<string, string> = {
		green: 'tag--green',
		blue: 'tag--blue',
		purple: 'tag--purple',
		orange: 'tag--orange',
		yellow: 'tag--yellow'
	};

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

<SeoHead
	title={PAGE_TITLE}
	description={PAGE_DESCRIPTION}
	canonicalPath={PAGE_PATH}
	keywords="slapmac, slapmac blog, macbook slap app, slapmac guide, slapmac tips, mac utility apps, funny mac apps"
	structuredData={[webPage, breadcrumbs]}
/>

<div class="page-root">
	<div class="bg-rays" aria-hidden="true"></div>

	<nav class="nav">
		<a href="/" class="nav-back">← Home</a>
		<div class="nav-right">
			<a href="/features" class="nav-link">Features</a>
			<a href="/#faq" class="nav-link">FAQ</a>
			<button type="button" class="theme-btn" aria-label="Toggle dark mode" onclick={toggleTheme}>
				{#if dark}<Sun class="h-4 w-4" strokeWidth={2} />{:else}<Moon class="h-4 w-4" strokeWidth={2} />{/if}
			</button>
		</div>
	</nav>

	<header class="hero">
		<div class="hero-eyebrow">
			<span class="pill">
				<Rss class="h-3.5 w-3.5" strokeWidth={2.2} />
				SlapMac Blog
			</span>
		</div>
		<h1 class="hero-title">Tips, Guides &amp; Deep-Dives</h1>
		<p class="hero-sub">
			Everything about SlapMac — setup guides, voice pack breakdowns, technical explainers,
			and the occasional roundup of other apps that prove Macs can be fun.
		</p>
	</header>

	<main class="posts-grid">
		{#each posts as post, i}
			<a href="/blog/{post.slug}" class="post-card" class:post-card--featured={i === 0}>
				<div class="post-top">
					<span class="post-emoji" aria-hidden="true">{post.emoji}</span>
					<span class="tag {tagColors[post.tagColor]}">{post.tag}</span>
				</div>
				<h2 class="post-title">{post.title}</h2>
				<p class="post-desc">{post.desc}</p>
				<div class="post-meta">
					<span class="post-date">{post.date}</span>
					<span class="post-dot">·</span>
					<span class="post-read">{post.readTime}</span>
				</div>
			</a>
		{/each}
	</main>

	<section class="cta">
		<div class="cta-inner">
			<p class="cta-label">Ready to try it?</p>
			<h2 class="cta-title">Download SlapMac for $3</h2>
			<p class="cta-sub">One-time purchase · No subscription · M1 Pro+ · macOS 14.6+</p>
			<a href="/" class="btn-primary">Get SlapMac →</a>
		</div>
	</section>

	<footer class="site-foot">
		<div class="site-foot-nav">
			<a href="/" class="site-foot-link">Home</a>
			<span class="site-foot-dot">·</span>
			<a href="/blog" class="site-foot-link">Blog</a>
			<span class="site-foot-dot">·</span>
			<a href="/features" class="site-foot-link">Features</a>
			<span class="site-foot-dot">·</span>
			<a href="/mac-sound-on-charger-connect-disconnect" class="site-foot-link">Charger sound</a>
			<span class="site-foot-dot">·</span>
			<a href="/privacy" class="site-foot-link">Privacy</a>
			<span class="site-foot-dot">·</span>
			<a href="/terms" class="site-foot-link">Terms</a>
		</div>
	</footer>
</div>

<style>
	.page-root {
		position: relative;
		min-height: 100vh;
		background: var(--background);
		color: var(--foreground);
		overflow-x: hidden;
	}
	.bg-rays {
		position: absolute;
		inset: 0;
		pointer-events: none;
		background:
			radial-gradient(ellipse 70% 40% at 50% 0%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 60%),
			radial-gradient(ellipse 50% 30% at 85% 25%, color-mix(in oklab, var(--ring) 8%, transparent), transparent 55%);
		z-index: 0;
	}
	.nav {
		position: relative;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.5rem;
		max-width: 56rem;
		margin: 0 auto;
	}
	.nav-back { font-size: 0.85rem; color: var(--muted-foreground); transition: color 0.15s; }
	.nav-back:hover { color: var(--foreground); }
	.nav-right { display: flex; align-items: center; gap: 1rem; }
	.nav-link { font-size: 0.8rem; color: var(--muted-foreground); transition: color 0.15s; }
	.nav-link:hover { color: var(--foreground); }
	.theme-btn {
		display: flex; height: 2rem; width: 2rem;
		align-items: center; justify-content: center;
		border-radius: 9999px; border: 1px solid var(--border);
		background: transparent; color: var(--muted-foreground); cursor: pointer;
	}

	.hero {
		position: relative; z-index: 5;
		max-width: 44rem; margin: 1.5rem auto 0;
		padding: 2rem 1.5rem 1rem; text-align: center;
	}
	.hero-eyebrow { margin-bottom: 1rem; }
	.pill {
		display: inline-flex; align-items: center; gap: 0.35rem;
		padding: 0.3rem 0.75rem; font-size: 0.72rem; font-weight: 600;
		border-radius: 9999px; border: 1px solid var(--border);
		background: var(--card); color: var(--muted-foreground);
	}
	.h-3\.5 { height: 0.875rem; }
	.w-3\.5 { width: 0.875rem; }
	.h-4 { height: 1rem; }
	.w-4 { width: 1rem; }

	.hero-title {
		font-size: 2.4rem; font-weight: 800; letter-spacing: -0.025em;
		line-height: 1.1; margin: 0; color: var(--foreground);
	}
	@media (min-width: 640px) { .hero-title { font-size: 3rem; } }
	.hero-sub {
		margin: 1.1rem auto 0; max-width: 34rem;
		font-size: 1rem; line-height: 1.6; color: var(--muted-foreground);
	}

	.posts-grid {
		position: relative; z-index: 5;
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		max-width: 56rem;
		margin: 2.5rem auto 0;
		padding: 0 1.5rem;
	}
	@media (min-width: 640px) {
		.posts-grid { grid-template-columns: repeat(2, 1fr); }
	}
	@media (min-width: 900px) {
		.posts-grid { grid-template-columns: repeat(3, 1fr); }
		.post-card--featured {
			grid-column: span 2;
		}
	}

	.post-card {
		display: flex; flex-direction: column; gap: 0.6rem;
		padding: 1.4rem; border-radius: 1.1rem;
		border: 1px solid var(--border); background: var(--card);
		color: var(--foreground); text-decoration: none;
		transition: transform 0.18s, border-color 0.18s, box-shadow 0.18s;
		position: relative; overflow: hidden;
	}
	.post-card::after {
		content: '';
		position: absolute; inset: 0;
		background: radial-gradient(100% 70% at 0% 0%, color-mix(in oklab, var(--primary) 10%, transparent), transparent 55%);
		opacity: 0; transition: opacity 0.2s; pointer-events: none;
	}
	.post-card:hover {
		transform: translateY(-3px);
		border-color: color-mix(in oklab, var(--primary) 40%, var(--border));
		box-shadow: 0 12px 32px -16px color-mix(in oklab, var(--primary) 40%, transparent);
	}
	.post-card:hover::after { opacity: 1; }

	.post-card--featured .post-title { font-size: 1.35rem; }
	.post-card--featured .post-desc { font-size: 0.95rem; }

	.post-top { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.15rem; }
	.post-emoji { font-size: 1.5rem; line-height: 1; }

	.tag {
		display: inline-block; padding: 0.2rem 0.6rem;
		border-radius: 9999px; font-size: 0.65rem; font-weight: 700;
		letter-spacing: 0.06em; text-transform: uppercase;
	}
	.tag--green  { background: color-mix(in oklab, var(--primary) 15%, transparent); color: var(--primary); }
	.tag--blue   { background: #dbeafe; color: #1d4ed8; }
	.tag--purple { background: #ede9fe; color: #7c3aed; }
	.tag--orange { background: #ffedd5; color: #c2410c; }
	.tag--yellow { background: #fef9c3; color: #a16207; }
	:global(html.dark) .tag--blue   { background: #1e3a5f; color: #93c5fd; }
	:global(html.dark) .tag--purple { background: #2e1d5e; color: #c4b5fd; }
	:global(html.dark) .tag--orange { background: #431407; color: #fdba74; }
	:global(html.dark) .tag--yellow { background: #3b2a00; color: #fde047; }

	.post-title { margin: 0; font-size: 1.05rem; font-weight: 700; line-height: 1.3; color: var(--foreground); }
	.post-desc { margin: 0; font-size: 0.85rem; line-height: 1.55; color: var(--muted-foreground); flex: 1; }
	.post-meta { display: flex; align-items: center; gap: 0.35rem; margin-top: 0.4rem; }
	.post-date, .post-read { font-size: 0.72rem; color: var(--muted-foreground); font-family: var(--font-mono); }
	.post-dot { font-size: 0.65rem; color: var(--muted-foreground); }

	.cta {
		position: relative; z-index: 5;
		max-width: 44rem; margin: 4rem auto;
		padding: 0 1.5rem;
	}
	.cta-inner {
		padding: 2.5rem 1.75rem; border-radius: 1.25rem;
		border: 1px solid color-mix(in oklab, var(--primary) 30%, var(--border));
		background: radial-gradient(circle at 20% 0%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 60%), var(--card);
		text-align: center;
	}
	.cta-label { margin: 0 0 0.4rem; font-size: 0.72rem; font-weight: 600; color: var(--primary); text-transform: uppercase; letter-spacing: 0.08em; }
	.cta-title { margin: 0 0 0.5rem; font-size: 1.5rem; font-weight: 700; color: var(--foreground); }
	.cta-sub { margin: 0 0 1.25rem; font-size: 0.88rem; color: var(--muted-foreground); }
	.btn-primary {
		display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem;
		height: 2.75rem; padding: 0 1.5rem; border-radius: 9999px;
		font-size: 0.9rem; font-weight: 600;
		background: var(--primary); color: var(--primary-foreground);
		border: none; box-shadow: 0 8px 20px color-mix(in oklab, var(--primary) 30%, transparent);
		transition: transform 0.15s;
	}
	.btn-primary:hover { transform: translateY(-2px); }

	.site-foot {
		margin-top: 2rem; padding: 28px 0 36px;
		border-top: 1px solid color-mix(in oklab, var(--border) 70%, transparent);
	}
	.site-foot-nav {
		display: flex; flex-wrap: wrap;
		align-items: center; justify-content: center;
		gap: 10px 12px;
	}
	.site-foot-link {
		color: var(--muted-foreground); text-decoration: none;
		font-size: 13.5px; font-weight: 500; padding: 4px 2px;
		transition: color 0.15s;
	}
	.site-foot-link:hover { color: var(--foreground); text-decoration: underline; text-underline-offset: 3px; }
	.site-foot-dot { color: color-mix(in oklab, var(--muted-foreground) 55%, transparent); font-size: 12px; user-select: none; }
</style>
