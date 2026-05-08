<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { Moon, Sun, Download } from 'lucide-svelte';
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from '$lib/seo/jsonld';
	import { getSiteUrl, SITE_NAME } from '$lib/seo/site';
	import { DOWNLOAD_URL } from '$lib/slapmac/data';
	import { trackDownloadClick } from '$lib/analytics/mixpanel-seo';

	const PAGE_PATH = '/blog/what-is-slapmac';
	const PAGE_TITLE = 'What Is SlapMac? The MacBook App That Screams Back — Complete Guide';
	const PAGE_DESCRIPTION =
		'SlapMac is a $3 Mac menu bar app that uses your MacBook\'s accelerometer to detect slaps — then screams back with 160+ hilarious sounds. Here\'s everything you need to know.';
	const PAGE_KEYWORDS =
		'what is slapmac, slapmac app, slapmac macbook, slapmac review, slapmac guide, macbook slap detection app, funny mac app, slapmac voice packs';

	const siteUrl = getSiteUrl();
	const canonical = `${siteUrl}${PAGE_PATH}`;

	const faqItems = [
		{
			q: 'What is SlapMac?',
			a: 'SlapMac is a Mac menu bar app that uses the built-in accelerometer on Apple Silicon MacBooks (M1 Pro and newer) to detect slaps, shakes, and taps — then plays one of 160+ sounds from seven built-in voice packs. It was built in 48 hours by an Amsterdam-based developer and went viral after earning thousands of dollars in its first week.'
		},
		{
			q: 'How much does SlapMac cost?',
			a: 'SlapMac costs $3 as a one-time purchase. There is no subscription. Once you buy it, you own it forever including all future updates to the version you purchased.'
		},
		{
			q: 'What MacBooks work with SlapMac?',
			a: 'SlapMac requires Apple Silicon M1 Pro or newer. That means MacBook Pro models from late 2021 onward, or MacBook Pro 14" / 16" with M1 Pro, M1 Max, M2 Pro, M2 Max, M3 Pro, M3 Max, M4 Pro, or M4 Max chips. Intel Macs and the base M1 / M2 / M3 MacBook Air are not supported because they lack the high-fidelity accelerometer SlapMac needs.'
		},
		{
			q: 'Which macOS version does SlapMac need?',
			a: 'SlapMac requires macOS 14.6 Sonoma or later. It works on Sequoia and any future release as long as the underlying accelerometer API remains available.'
		},
		{
			q: 'Is SlapMac safe for my MacBook?',
			a: 'Yes. SlapMac only reads the accelerometer — it does not control hardware or send commands to the machine. The slap itself is no different from the physical stress of putting your laptop down on a desk. Apple Silicon MacBooks are engineered to withstand normal physical handling. That said, don\'t drop your laptop.'
		}
	];

	const faqJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqItems.map((it) => ({
			'@type': 'Question',
			name: it.q,
			acceptedAnswer: { '@type': 'Answer', text: it.a }
		}))
	};

	const articleJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: PAGE_TITLE,
		description: PAGE_DESCRIPTION,
		url: canonical,
		datePublished: '2026-05-09',
		dateModified: '2026-05-09',
		author: { '@type': 'Organization', name: SITE_NAME, url: siteUrl },
		publisher: { '@type': 'Organization', name: SITE_NAME, url: siteUrl },
		mainEntityOfPage: { '@type': 'WebPage', '@id': canonical }
	};

	const breadcrumbs = buildBreadcrumbJsonLd([
		{ name: 'Home', path: '/' },
		{ name: 'Blog', path: '/blog' },
		{ name: 'What Is SlapMac?', path: PAGE_PATH }
	]);

	const webPage = buildWebPageJsonLd({ path: PAGE_PATH, name: PAGE_TITLE, description: PAGE_DESCRIPTION });

	let dark = $state(false);
	let themeReady = $state(false);
	let openFaq = $state<number | null>(null);

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
	function toggleFaq(i: number) { openFaq = openFaq === i ? null : i; }
</script>

<SeoHead
	title={PAGE_TITLE}
	description={PAGE_DESCRIPTION}
	keywords={PAGE_KEYWORDS}
	canonicalPath={PAGE_PATH}
	ogType="article"
	structuredData={[webPage, breadcrumbs, articleJsonLd, faqJsonLd]}
/>

<div class="page-root">
	<div class="bg-rays" aria-hidden="true"></div>

	<nav class="nav">
		<a href="/blog" class="nav-back">← Blog</a>
		<div class="nav-right">
			<a href="/" class="nav-link">Home</a>
			<a href="/features" class="nav-link">Features</a>
			<button type="button" class="theme-btn" aria-label="Toggle dark mode" onclick={toggleTheme}>
				{#if dark}<Sun class="icon-sm" strokeWidth={2} />{:else}<Moon class="icon-sm" strokeWidth={2} />{/if}
			</button>
		</div>
	</nav>

	<article class="article">
		<!-- Breadcrumb -->
		<nav class="breadcrumb" aria-label="Breadcrumb">
			<a href="/">Home</a>
			<span aria-hidden="true"> / </span>
			<a href="/blog">Blog</a>
			<span aria-hidden="true"> / </span>
			<span>What Is SlapMac?</span>
		</nav>

		<header class="article-header">
			<div class="article-meta-top">
				<span class="tag tag--green">Ultimate Guide</span>
				<span class="article-date">May 2026 · 8 min read</span>
			</div>
			<h1 class="article-title">What Is SlapMac? The MacBook App That Screams Back</h1>
			<p class="article-lede">
				SlapMac is a $3 Mac menu bar app that turns your MacBook into a reactive sound machine.
				Slap it — it screams back. Shake it — it groans. Tap it — it reacts. Here's everything
				you need to know about the app that went viral overnight.
			</p>
		</header>

		<!-- Snippet block -->
		<div class="snippet-block">
			<p class="snippet-label">Quick answer</p>
			<p>
				<strong>SlapMac</strong> is a Mac menu bar utility that uses the built-in accelerometer
				on Apple Silicon MacBooks (M1 Pro+) to detect physical impacts — slaps, taps, shakes —
				and respond with one of 160+ sounds from seven themed voice packs. It costs $3 once and
				runs silently in your menu bar.
			</p>
		</div>

		<div class="article-body">

			<h2>The one-line pitch</h2>
			<p>
				You slap your MacBook. It screams back. That's it.
			</p>
			<p>
				SlapMac is a small, native SwiftUI app that lives in your Mac's menu bar. It does one
				thing remarkably well: it reads the accelerometer inside your MacBook Pro, detects when
				you've hit it, and plays a sound proportional to the force. Light tap — a soft whimper.
				Full slap — a full-volume shriek. Shake the whole laptop — dramatic combination hits.
			</p>

			<h2>Who built it and why it went viral</h2>
			<p>
				SlapMac was built by an Amsterdam-based developer who completed the entire project —
				Swift app, landing page, and payment integration — in 48 hours. After posting about it,
				it spread quickly across tech Twitter, Product Hunt, and news sites including TechSpot
				and Digital Trends. The app reportedly earned thousands of dollars in its first few days.
			</p>
			<p>
				Why did it blow up? Because it's legitimately funny, costs less than a coffee, and
				works exactly as described. The developer didn't oversell it. The tagline is literally
				"Slap your MacBook. It screams back." People appreciated the honesty.
			</p>

			<h2>What SlapMac actually does — feature by feature</h2>

			<h3>Slap detection</h3>
			<p>
				The core feature. SlapMac runs five detection algorithms simultaneously on accelerometer
				data: peak threshold detection, wave analysis, frequency analysis, adaptive detection, and
				trend analysis. You can tune <strong>sensitivity</strong> (how hard a slap needs to be) and
				<strong>cooldown</strong> (minimum time between triggers) from the menu bar.
				See our <a href="/blog/macbook-accelerometer-slap-detection">deep-dive on the slap detection algorithms</a>.
			</p>

			<h3>Seven voice packs, 160+ sounds</h3>
			<p>
				SlapMac ships with seven built-in sound collections:
			</p>
			<ul>
				<li><strong>Woman</strong> — dramatic gasps, screams, and reactions</li>
				<li><strong>Combo Hit</strong> — fighting game sound effects</li>
				<li><strong>Whiny</strong> — exaggerated whimpers and groans</li>
				<li><strong>Fart</strong> — exactly what it sounds like</li>
				<li><strong>Gentleman</strong> — dignified British exclamations</li>
				<li><strong>Yamete</strong> — anime-style protest sounds</li>
				<li><strong>Goat</strong> — goat screams, because of course</li>
			</ul>
			<p>Each pack contains roughly 20+ sounds that rotate randomly so repetition is rare. Read the full
			<a href="/blog/slapmac-voice-packs">voice packs breakdown</a> for samples and recommendations.</p>

			<h3>Custom sound packs</h3>
			<p>
				Not satisfied with the built-ins? Point SlapMac at any folder of MP3 or WAV files and
				it'll use those instead. You can bind different sounds to different events — slap,
				shake, lid open, charger connect, and charger disconnect.
				<a href="/blog/slapmac-custom-sounds">Here's how to set up custom sounds →</a>
			</p>

			<h3>USB Moaner (charger sounds)</h3>
			<p>
				Enable USB Moaner in settings and SlapMac will also play a sound when your MagSafe or
				USB-C charger connects or disconnects. Great for confirming a flaky cable is actually
				drawing power. Learn more on the
				<a href="/mac-sound-on-charger-connect-disconnect">charger sound page</a> or in our
				<a href="/blog/slapmac-usb-moaner">USB Moaner guide</a>.
			</p>

			<h3>Lid Creak</h3>
			<p>
				When you open your MacBook's lid, SlapMac can play a creaking sound — like a horror
				movie door. Subtle, delightful, deeply unnecessary.
			</p>

			<h3>Slap counter</h3>
			<p>
				The menu bar icon shows a counter for how many times you've slapped your Mac this session.
				It's a completely useless metric that everyone checks obsessively.
			</p>

			<h2>What MacBooks does SlapMac support?</h2>
			<p>
				SlapMac requires <strong>Apple Silicon M1 Pro or newer</strong> and
				<strong>macOS 14.6 Sonoma or later</strong>. That includes:
			</p>
			<ul>
				<li>MacBook Pro 14" and 16" (2021 and later) — M1 Pro, M1 Max</li>
				<li>MacBook Pro 14" and 16" (2023 and later) — M2 Pro, M2 Max</li>
				<li>MacBook Pro 14" and 16" (2024 and later) — M3 Pro, M3 Max</li>
				<li>MacBook Pro with M4 Pro or M4 Max</li>
			</ul>
			<p>
				Base MacBook Air (M1/M2/M3) and Intel Macs are <em>not</em> supported. The
				accelerometer hardware in MacBook Air models lacks the granularity that SlapMac's
				detection algorithms need. See the full
				<a href="/blog/slapmac-requirements-compatibility">compatibility guide</a>.
			</p>

			<h2>How to get started</h2>
			<p>
				Setup takes under two minutes. Download the .dmg from
				<a href="/">slapmymac.net</a>, drag it to Applications, open it, pick a voice pack,
				set sensitivity, and slap. Full walkthrough:
				<a href="/blog/slapmac-setup-guide">SlapMac setup guide →</a>
			</p>

			<h2>Is SlapMac worth $3?</h2>
			<p>
				If you own a compatible MacBook Pro and have any sense of humor, yes. It's the cheapest
				possible unit of joy per dollar: you'll show it to every colleague within the first hour.
				It's also genuinely well-built — native Swift, no Electron, no tracking, no subscription.
				For the full breakdown: <a href="/blog/slapmac-review">SlapMac review →</a>
			</p>

			<!-- CTA -->
			<div class="inline-cta">
				<a
					href={DOWNLOAD_URL}
					class="btn-primary"
					onclick={() => trackDownloadClick('pillar_blog')}
				>
					<Download class="icon-sm" strokeWidth={2} />
					Download SlapMac — $3
				</a>
				<span class="inline-cta-meta">One-time · No subscription · M1 Pro+ · macOS 14.6+</span>
			</div>

			<!-- FAQ -->
			<h2 id="faq">Frequently asked questions</h2>
			<div class="faq-list">
				{#each faqItems as item, i}
					<details class="faq-item">
						<summary class="faq-q">{item.q}</summary>
						<p class="faq-a">{item.a}</p>
					</details>
				{/each}
			</div>

		</div><!-- /article-body -->
	</article>

	<!-- Related posts -->
	<section class="related">
		<h2 class="related-title">Keep reading</h2>
		<div class="related-grid">
			<a href="/blog/slapmac-setup-guide" class="related-card">
				<span class="related-emoji">⚡</span>
				<span class="related-name">Setup Guide</span>
				<span class="related-desc">Install and configure SlapMac in 2 minutes</span>
			</a>
			<a href="/blog/slapmac-voice-packs" class="related-card">
				<span class="related-emoji">🔊</span>
				<span class="related-name">Voice Packs Explained</span>
				<span class="related-desc">All 7 sound collections, rated and compared</span>
			</a>
			<a href="/blog/slapmac-review" class="related-card">
				<span class="related-emoji">⭐</span>
				<span class="related-name">SlapMac Review</span>
				<span class="related-desc">Is $3 worth it? Honest verdict after daily use.</span>
			</a>
			<a href="/blog/macbook-accelerometer-slap-detection" class="related-card">
				<span class="related-emoji">📡</span>
				<span class="related-name">How Slap Detection Works</span>
				<span class="related-desc">The accelerometer tech inside SlapMac</span>
			</a>
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
		position: relative; min-height: 100vh;
		background: var(--background); color: var(--foreground); overflow-x: hidden;
	}
	.bg-rays {
		position: absolute; inset: 0; pointer-events: none;
		background: radial-gradient(ellipse 70% 35% at 50% 0%, color-mix(in oklab, var(--primary) 10%, transparent), transparent 55%);
		z-index: 0;
	}
	.nav {
		position: relative; z-index: 10;
		display: flex; align-items: center; justify-content: space-between;
		padding: 1rem 1.5rem; max-width: 48rem; margin: 0 auto;
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
	.icon-sm { height: 1rem; width: 1rem; }

	.article {
		position: relative; z-index: 5;
		max-width: 44rem; margin: 0 auto; padding: 1.5rem 1.5rem 2rem;
	}

	.breadcrumb {
		font-size: 0.75rem; color: var(--muted-foreground);
		margin-bottom: 1.5rem; display: flex; flex-wrap: wrap; gap: 0.2rem; align-items: center;
	}
	.breadcrumb a { color: var(--muted-foreground); text-decoration: underline; text-underline-offset: 3px; }
	.breadcrumb a:hover { color: var(--foreground); }

	.article-header { margin-bottom: 1.5rem; }
	.article-meta-top { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.85rem; }
	.article-date { font-size: 0.75rem; color: var(--muted-foreground); font-family: var(--font-mono); }

	.tag {
		display: inline-block; padding: 0.2rem 0.65rem;
		border-radius: 9999px; font-size: 0.65rem; font-weight: 700;
		letter-spacing: 0.06em; text-transform: uppercase;
	}
	.tag--green { background: color-mix(in oklab, var(--primary) 15%, transparent); color: var(--primary); }

	.article-title {
		font-size: 2rem; font-weight: 800; letter-spacing: -0.025em;
		line-height: 1.15; margin: 0 0 0.85rem; color: var(--foreground);
	}
	@media (min-width: 640px) { .article-title { font-size: 2.5rem; } }

	.article-lede {
		font-size: 1.05rem; line-height: 1.65;
		color: var(--muted-foreground); margin: 0;
	}

	.snippet-block {
		margin: 1.5rem 0;
		padding: 1.1rem 1.25rem;
		border-radius: 0.85rem;
		border-left: 3px solid var(--primary);
		background: color-mix(in oklab, var(--primary) 8%, var(--card));
		font-size: 0.92rem; line-height: 1.6;
	}
	.snippet-label {
		font-size: 0.65rem; font-weight: 700; text-transform: uppercase;
		letter-spacing: 0.08em; color: var(--primary); margin: 0 0 0.4rem;
	}
	.snippet-block p { margin: 0; color: var(--foreground); }

	.article-body { font-size: 0.97rem; line-height: 1.72; color: var(--foreground); }

	.article-body h2 {
		font-size: 1.45rem; font-weight: 700; letter-spacing: -0.02em;
		margin: 2.25rem 0 0.65rem; color: var(--foreground);
	}
	.article-body h3 {
		font-size: 1.1rem; font-weight: 600; margin: 1.5rem 0 0.4rem; color: var(--foreground);
	}
	.article-body p { margin: 0 0 1rem; }
	.article-body ul { padding-left: 1.25rem; margin: 0 0 1rem; }
	.article-body li { margin-bottom: 0.4rem; }
	.article-body strong { color: var(--foreground); font-weight: 600; }
	.article-body em { color: var(--muted-foreground); font-style: normal; }
	.article-body a { color: var(--primary); text-decoration: underline; text-underline-offset: 3px; }
	.article-body a:hover { opacity: 0.8; }

	.inline-cta {
		display: flex; flex-direction: column; align-items: flex-start; gap: 0.5rem;
		margin: 2rem 0;
	}
	.btn-primary {
		display: inline-flex; align-items: center; gap: 0.4rem;
		height: 2.75rem; padding: 0 1.5rem; border-radius: 9999px;
		font-size: 0.9rem; font-weight: 600; background: var(--primary);
		color: var(--primary-foreground); border: none;
		box-shadow: 0 8px 20px color-mix(in oklab, var(--primary) 30%, transparent);
		transition: transform 0.15s; cursor: pointer;
	}
	.btn-primary:hover { transform: translateY(-2px); }
	.inline-cta-meta { font-size: 0.72rem; color: var(--muted-foreground); font-family: var(--font-mono); }

	.faq-list { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1rem; }
	.faq-item {
		border: 1px solid var(--border); background: var(--card);
		border-radius: 0.85rem; padding: 0.75rem 1rem;
	}
	.faq-item[open] { border-color: color-mix(in oklab, var(--primary) 30%, var(--border)); }
	.faq-q {
		cursor: pointer; font-weight: 600; font-size: 0.92rem;
		color: var(--card-foreground); list-style: none; padding: 0.25rem 0;
	}
	.faq-q::-webkit-details-marker { display: none; }
	.faq-q::after { content: '+'; float: right; color: var(--muted-foreground); font-weight: 400; }
	.faq-item[open] .faq-q::after { content: '–'; }
	.faq-a { margin: 0.5rem 0 0.3rem; font-size: 0.88rem; line-height: 1.55; color: var(--muted-foreground); }

	.related {
		position: relative; z-index: 5;
		max-width: 44rem; margin: 3rem auto 0; padding: 0 1.5rem;
	}
	.related-title { font-size: 1.3rem; font-weight: 700; margin: 0 0 1rem; color: var(--foreground); }
	.related-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.85rem;
	}
	@media (max-width: 500px) { .related-grid { grid-template-columns: 1fr; } }
	.related-card {
		display: flex; flex-direction: column; gap: 0.3rem;
		padding: 1.1rem 1.15rem; border-radius: 1rem;
		border: 1px solid var(--border); background: var(--card);
		text-decoration: none; color: var(--foreground);
		transition: transform 0.18s, border-color 0.18s, box-shadow 0.18s;
	}
	.related-card:hover {
		transform: translateY(-2px);
		border-color: color-mix(in oklab, var(--primary) 40%, var(--border));
		box-shadow: 0 8px 20px -12px color-mix(in oklab, var(--primary) 40%, transparent);
	}
	.related-emoji { font-size: 1.4rem; }
	.related-name { font-weight: 600; font-size: 0.9rem; color: var(--foreground); }
	.related-desc { font-size: 0.8rem; line-height: 1.45; color: var(--muted-foreground); }

	.site-foot {
		margin-top: 4rem; padding: 28px 0 36px;
		border-top: 1px solid color-mix(in oklab, var(--border) 70%, transparent);
	}
	.site-foot-nav {
		display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 10px 12px;
	}
	.site-foot-link { color: var(--muted-foreground); text-decoration: none; font-size: 13.5px; font-weight: 500; transition: color 0.15s; }
	.site-foot-link:hover { color: var(--foreground); text-decoration: underline; text-underline-offset: 3px; }
	.site-foot-dot { color: color-mix(in oklab, var(--muted-foreground) 55%, transparent); font-size: 12px; user-select: none; }
</style>
