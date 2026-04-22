<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import {
		BatteryCharging,
		CircleCheck,
		Cable,
		Download,
		Moon,
		Plug,
		Settings2,
		Sun,
		Volume2,
		Zap
	} from 'lucide-svelte';
	import { DOWNLOAD_URL } from '$lib/slapmac/data';
	import { trackDownloadClick } from '$lib/analytics/mixpanel-seo';
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { getSiteUrl, SITE_NAME } from '$lib/seo/site';
	import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from '$lib/seo/jsonld';

	const PAGE_PATH = '/mac-sound-on-charger-connect-disconnect';
	const PAGE_TITLE =
		'Play a Sound on Mac When Charger Connects or Disconnects (MagSafe & USB‑C) — SlapMyMac';
	const PAGE_DESCRIPTION =
		'Want your Mac to play a sound when the charger connects or disconnects? SlapMyMac triggers a custom sound on MagSafe or USB‑C plug/unplug events. M1 Pro+ · macOS 14.6+.';
	const PAGE_KEYWORDS =
		'mac sound on charger connect disconnect, macbook charger sound, sound when mac charger plugged in, magsafe connect sound, usb-c charger sound mac, macbook plug sound, mac unplug notification, charger connected sound mac, charger disconnected sound mac';

	const url = getSiteUrl();
	const canonical = `${url}${PAGE_PATH}`;

	const howToJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'HowTo',
		name: 'How to play a sound on Mac when the charger connects or disconnects',
		description: PAGE_DESCRIPTION,
		url: canonical,
		totalTime: 'PT2M',
		tool: [
			{ '@type': 'HowToTool', name: SITE_NAME },
			{ '@type': 'HowToTool', name: 'MagSafe or USB‑C charger' }
		],
		supply: [
			{ '@type': 'HowToSupply', name: 'MacBook with Apple Silicon (M1 Pro or newer)' },
			{ '@type': 'HowToSupply', name: 'macOS 14.6 or newer' }
		],
		step: [
			{
				'@type': 'HowToStep',
				position: 1,
				name: 'Download and install SlapMyMac',
				text: 'Download SlapMyMac from slapmymac.net and drag the app into your Applications folder. It lives in the menu bar — no dock icon.',
				url: `${canonical}#step-install`
			},
			{
				'@type': 'HowToStep',
				position: 2,
				name: 'Enable USB Moaner mode',
				text: 'Open SlapMyMac from the menu bar, go to Settings, and toggle on USB Moaner. This listens for USB and power events — including MagSafe and USB‑C charger plug/unplug.',
				url: `${canonical}#step-enable`
			},
			{
				'@type': 'HowToStep',
				position: 3,
				name: 'Pick a voice pack or add your own sounds',
				text: 'Choose one of the 7 built-in voice packs, or point SlapMyMac at a folder of your own MP3 / WAV files to play a custom sound on connect and a different one on disconnect.',
				url: `${canonical}#step-sounds`
			},
			{
				'@type': 'HowToStep',
				position: 4,
				name: 'Plug or unplug your charger',
				text: 'Connect or disconnect your MagSafe or USB‑C charger. Your Mac will now play the sound every time the charger state changes.',
				url: `${canonical}#step-test`
			}
		]
	};

	const pageFaq = [
		{
			q: 'Can my Mac play a sound when the charger is connected or disconnected?',
			a: "Yes. macOS doesn't do this natively, but with SlapMyMac you can assign any sound — built-in voice pack or your own audio file — to fire whenever the charger plugs in or unplugs. Works on MagSafe 3 and USB‑C power adapters."
		},
		{
			q: 'Does this work with both MagSafe and USB‑C chargers?',
			a: 'Yes. SlapMyMac listens for IOKit USB and power events, so both MagSafe (MagSafe 3 on Apple Silicon MacBook Pro) and any USB‑C charger will trigger the sound.'
		},
		{
			q: 'Can I use a different sound for connect vs disconnect?',
			a: "Yes. With custom sound packs (v1.3+) you can point SlapMyMac at a folder of audio files and bind different sounds to the 'charger connected' and 'charger disconnected' events — plus slap and lid creak events."
		},
		{
			q: 'Will it work on Intel Macs?',
			a: 'No. SlapMyMac requires Apple Silicon (M1 Pro or newer) because the detection pipeline reads the built-in accelerometer used for slap detection. The charger-sound feature is bundled with the same app.'
		},
		{
			q: 'Does it drain my battery?',
			a: 'No. The USB/power event listener is event-driven — it only wakes up when hardware changes. It uses less battery than having iTunes open.'
		},
		{
			q: 'How is this different from a Shortcut or Automator action?',
			a: "Shortcuts and Automator can play a sound on power events, but they fire after a 1–3 second delay and stop working when you restart. SlapMyMac is instant, native (SwiftUI), survives sleep/restart, and lets you pick from 7 voice packs — all for $2 once."
		}
	];

	const faqJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: pageFaq.map((it) => ({
			'@type': 'Question',
			name: it.q,
			acceptedAnswer: { '@type': 'Answer', text: it.a }
		}))
	};

	const breadcrumbs = buildBreadcrumbJsonLd([
		{ name: 'Home', path: '/' },
		{ name: 'Sound on charger connect / disconnect', path: PAGE_PATH }
	]);

	const webPage = buildWebPageJsonLd({
		path: PAGE_PATH,
		name: PAGE_TITLE,
		description: PAGE_DESCRIPTION
	});

	let dark = $state(false);
	let themeReady = $state(false);
	let plugState = $state<'connected' | 'disconnected'>('connected');

	onMount(() => {
		const s = localStorage.getItem('slapmac-theme');
		dark =
			s === 'dark' ||
			(!s && window.matchMedia('(prefers-color-scheme: dark)').matches);
		themeReady = true;
	});

	$effect(() => {
		if (!browser || !themeReady) return;
		document.documentElement.classList.toggle('dark', dark);
		localStorage.setItem('slapmac-theme', dark ? 'dark' : 'light');
	});

	function toggleTheme() {
		dark = !dark;
	}

	function togglePlug() {
		plugState = plugState === 'connected' ? 'disconnected' : 'connected';
	}
</script>

<SeoHead
	title={PAGE_TITLE}
	description={PAGE_DESCRIPTION}
	keywords={PAGE_KEYWORDS}
	canonicalPath={PAGE_PATH}
	structuredData={[webPage, breadcrumbs, howToJsonLd, faqJsonLd]}
/>

<div class="page-root">
	<div class="bg-rays" aria-hidden="true"></div>

	<nav class="nav">
		<a href="/" class="nav-back">← Home</a>
		<div class="nav-right">
			<a href="/features" class="nav-link">Features</a>
			<a href="/#faq" class="nav-link">FAQ</a>
			<button
				type="button"
				class="theme-btn"
				aria-label="Toggle dark mode"
				onclick={toggleTheme}
			>
				{#if dark}
					<Sun class="h-4 w-4" strokeWidth={2} />
				{:else}
					<Moon class="h-4 w-4" strokeWidth={2} />
				{/if}
			</button>
		</div>
	</nav>

	<header class="hero">
		<div class="hero-eyebrow">
			<span class="pill pill--green">
				<BatteryCharging class="h-3.5 w-3.5" strokeWidth={2.2} />
				USB‑C · MagSafe · macOS 14.6+
			</span>
		</div>
		<h1 class="hero-title">
			Play a Sound on Your Mac When the
			<span class="hero-accent">Charger Connects or Disconnects</span>
		</h1>
		<p class="hero-sub">
			macOS doesn't make a sound when you plug or unplug the charger — so we built one that does.
			<strong>SlapMyMac</strong> fires a custom sound the instant your MagSafe or USB‑C charger
			connects or disconnects. Pick from 7 voice packs, or drop in your own MP3s.
		</p>
		<div class="hero-cta">
			<a
				href={DOWNLOAD_URL}
				class="btn-primary"
				onclick={() => trackDownloadClick('charger_hero')}
			>
				<Download class="h-4 w-4" strokeWidth={2} />
				Download SlapMyMac — $2
			</a>
			<span class="hero-cta-meta">One‑time · No subscription · No tracking</span>
		</div>
	</header>

	<!-- Interactive demo -->
	<section class="demo-wrap">
		<div class="demo-card">
			<p class="demo-label">Click to simulate</p>
			<button type="button" class="demo-stage" onclick={togglePlug} aria-label="Toggle charger state">
				<div class="demo-mac" class:is-on={plugState === 'connected'}>
					<div class="demo-screen">
						{#if plugState === 'connected'}
							<BatteryCharging class="h-10 w-10 demo-screen-icon demo-screen-icon--on" strokeWidth={1.8} />
							<span class="demo-screen-text demo-screen-text--on">🔌 “I'm fed.”</span>
						{:else}
							<Plug class="h-10 w-10 demo-screen-icon demo-screen-icon--off" strokeWidth={1.8} />
							<span class="demo-screen-text demo-screen-text--off">😩 “Wait, come back!”</span>
						{/if}
					</div>
					<div class="demo-base"></div>
				</div>
				<div class="demo-cable" class:is-connected={plugState === 'connected'}>
					<Cable class="h-6 w-6" strokeWidth={2} />
				</div>
			</button>
			<p class="demo-caption">
				Status: <strong class:status-on={plugState === 'connected'} class:status-off={plugState === 'disconnected'}>
					{plugState === 'connected' ? 'Charger connected' : 'Charger disconnected'}
				</strong>
			</p>
		</div>
	</section>

	<!-- How it works / How-to -->
	<section class="section" aria-label="How it works">
		<h2 class="section-title">How to get your Mac to play a sound on charger connect/disconnect</h2>
		<p class="section-lede">
			Four short steps. Takes under two minutes. Requires a MacBook with Apple Silicon (M1 Pro or
			newer) running macOS 14.6 Sonoma or later.
		</p>

		<ol class="steps">
			<li class="step" id="step-install">
				<span class="step-num">1</span>
				<div class="step-body">
					<h3 class="step-title">Download &amp; install SlapMyMac</h3>
					<p>
						Grab the app from <a href="/" class="step-link">slapmymac.net</a> and drag it into your
						Applications folder. It lives in the menu bar — no dock icon, no login screen.
					</p>
				</div>
			</li>
			<li class="step" id="step-enable">
				<span class="step-num">2</span>
				<div class="step-body">
					<h3 class="step-title">Turn on USB Moaner mode</h3>
					<p>
						Click the SlapMyMac icon in the menu bar → <em>Settings</em> → flip on
						<strong>USB Moaner</strong>. This tells the app to listen for USB and power events —
						which is what MagSafe and USB‑C chargers emit when connected or disconnected.
					</p>
				</div>
			</li>
			<li class="step" id="step-sounds">
				<span class="step-num">3</span>
				<div class="step-body">
					<h3 class="step-title">Pick a sound (or add your own)</h3>
					<p>
						Choose one of the <strong>7 built‑in voice packs</strong> — Woman, Combo Hit, Whiny,
						Fart, Gentleman, Yamete, Goat — or point SlapMyMac at a folder of your own MP3 / WAV
						files. You can bind a different sound to <em>connect</em> vs <em>disconnect</em>.
					</p>
				</div>
			</li>
			<li class="step" id="step-test">
				<span class="step-num">4</span>
				<div class="step-body">
					<h3 class="step-title">Plug in your charger</h3>
					<p>
						Connect your MagSafe or USB‑C charger. Your Mac plays the sound instantly. Unplug it —
						different sound. Launch-at-login is on by default, so it just keeps working.
					</p>
				</div>
			</li>
		</ol>
	</section>

	<!-- Why SlapMyMac over alternatives -->
	<section class="section" aria-label="Comparison with other methods">
		<h2 class="section-title">Shortcuts, Automator, or SlapMyMac? Here's the difference.</h2>
		<div class="compare">
			<div class="compare-col compare-col--slap">
				<div class="compare-head">
					<span class="compare-badge">SlapMyMac</span>
					<p class="compare-price">$2 one‑time</p>
				</div>
				<ul class="compare-list">
					<li><CircleCheck class="h-4 w-4 text-primary shrink-0" strokeWidth={2} /> Instant — no delay</li>
					<li><CircleCheck class="h-4 w-4 text-primary shrink-0" strokeWidth={2} /> 7 built‑in voice packs + custom audio folders</li>
					<li><CircleCheck class="h-4 w-4 text-primary shrink-0" strokeWidth={2} /> Different sound for connect vs disconnect</li>
					<li><CircleCheck class="h-4 w-4 text-primary shrink-0" strokeWidth={2} /> Survives restart &amp; sleep</li>
					<li><CircleCheck class="h-4 w-4 text-primary shrink-0" strokeWidth={2} /> Native SwiftUI menu bar app — no Electron</li>
					<li><CircleCheck class="h-4 w-4 text-primary shrink-0" strokeWidth={2} /> Also: slap detection + lid creak</li>
				</ul>
			</div>
			<div class="compare-col">
				<div class="compare-head">
					<span class="compare-badge compare-badge--muted">Shortcuts / Automator</span>
					<p class="compare-price compare-price--muted">Free but fiddly</p>
				</div>
				<ul class="compare-list compare-list--muted">
					<li>• 1–3 second delay before the sound plays</li>
					<li>• Breaks after macOS updates or restart</li>
					<li>• One automation per event — no sound variety</li>
					<li>• No visual feedback or counter</li>
					<li>• Requires manually re‑enabling after sleep</li>
					<li>• No support for MagSafe state on all models</li>
				</ul>
			</div>
		</div>
	</section>

	<!-- Use cases -->
	<section class="section" aria-label="Use cases">
		<h2 class="section-title">Why people want a charger sound on Mac</h2>
		<div class="use-grid">
			<div class="use-card">
				<div class="use-ico"><Volume2 class="h-5 w-5" strokeWidth={2} /></div>
				<h3 class="use-title">Audio feedback when charging</h3>
				<p>Confirm the charger is actually drawing power — without lifting your eyes from the screen. Great for flaky USB‑C cables.</p>
			</div>
			<div class="use-card">
				<div class="use-ico"><Zap class="h-5 w-5" strokeWidth={2} /></div>
				<h3 class="use-title">Catch accidental unplugs</h3>
				<p>If a coworker, cat, or cleaning person unplugs your charger, you hear it immediately. No more surprise 4%‑battery meetings.</p>
			</div>
			<div class="use-card">
				<div class="use-ico"><Settings2 class="h-5 w-5" strokeWidth={2} /></div>
				<h3 class="use-title">Accessibility</h3>
				<p>A distinctive sound cue can be easier to register than the little battery icon — especially on 16" Macs.</p>
			</div>
			<div class="use-card">
				<div class="use-ico"><Plug class="h-5 w-5" strokeWidth={2} /></div>
				<h3 class="use-title">Pure fun</h3>
				<p>Goat sounds. Fighting‑game combos. A Gentleman saying “indubitably.” Your MacBook, your personality.</p>
			</div>
		</div>
	</section>

	<!-- FAQ -->
	<section class="section" id="faq" aria-label="Frequently asked questions">
		<h2 class="section-title">FAQ — Mac sound on charger connect / disconnect</h2>
		<div class="faq-list">
			{#each pageFaq as item, i}
				<details class="faq-item" open={i === 0}>
					<summary class="faq-q">{item.q}</summary>
					<p class="faq-a">{item.a}</p>
				</details>
			{/each}
		</div>
	</section>

	<!-- CTA -->
	<section class="cta">
		<div class="cta-inner">
			<h2 class="cta-title">Ready to give your Mac charger a voice?</h2>
			<p class="cta-sub">
				One‑time $2. Works on every Apple Silicon MacBook from M1 Pro onward, running macOS 14.6+.
			</p>
			<a
				href={DOWNLOAD_URL}
				class="btn-primary btn-primary--xl"
				onclick={() => trackDownloadClick('charger_footer')}
			>
				<Download class="h-4 w-4" strokeWidth={2} />
				Download SlapMyMac — $2
			</a>
			<p class="cta-back"><a href="/">← Back to SlapMyMac homepage</a></p>
		</div>
	</section>

	<!-- Related pages (internal linking) -->
	<section class="section related" aria-label="Related SlapMyMac pages">
		<h2 class="section-title">Related SlapMyMac features</h2>
		<div class="related-grid">
			<a href="/features" class="related-card">
				<span class="related-emoji">🎛️</span>
				<span class="related-name">All SlapMyMac features</span>
				<span class="related-desc">
					Slap detection, 7 voice packs, Lid Creak, USB Moaner, 5 algorithms &amp; custom sound packs
				</span>
			</a>
			<a href="/" class="related-card">
				<span class="related-emoji">👋</span>
				<span class="related-name">SlapMyMac homepage</span>
				<span class="related-desc">
					The viral Mac menu bar app that makes your MacBook scream when you slap it
				</span>
			</a>
			<a href="/#faq" class="related-card">
				<span class="related-emoji">❓</span>
				<span class="related-name">SlapMyMac FAQ</span>
				<span class="related-desc">
					Compatibility, battery, sensitivity, custom sounds &amp; refund policy
				</span>
			</a>
			<a href="/recover-license" class="related-card">
				<span class="related-emoji">🔑</span>
				<span class="related-name">Recover your license</span>
				<span class="related-desc">
					Lost your license key? Look it up by email.
				</span>
			</a>
		</div>
	</section>

	<!-- Footer -->
	<footer class="site-foot">
		<div class="site-foot-nav">
			<a href="/" class="site-foot-link">Home</a>
			<span class="site-foot-dot">·</span>
			<a href="/features" class="site-foot-link">Features</a>
			<span class="site-foot-dot">·</span>
			<a href="/mac-sound-on-charger-connect-disconnect" class="site-foot-link">Charger sound</a>
			<span class="site-foot-dot">·</span>
			<a href="/#faq" class="site-foot-link">FAQ</a>
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
		color: var(--foreground);
		background: var(--background);
		overflow-x: hidden;
	}
	.bg-rays {
		position: absolute;
		inset: 0;
		pointer-events: none;
		background:
			radial-gradient(ellipse 70% 40% at 50% 0%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 60%),
			radial-gradient(ellipse 50% 30% at 90% 30%, color-mix(in oklab, var(--ring) 10%, transparent), transparent 55%);
		z-index: 0;
	}
	.nav {
		position: relative;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.5rem;
		max-width: 48rem;
		margin: 0 auto;
	}
	.nav-back {
		font-size: 0.85rem;
		color: var(--muted-foreground);
		transition: color 0.15s;
	}
	.nav-back:hover { color: var(--foreground); }
	.nav-right { display: flex; align-items: center; gap: 1rem; }
	.nav-link {
		font-size: 0.8rem;
		color: var(--muted-foreground);
		transition: color 0.15s;
	}
	.nav-link:hover { color: var(--foreground); }
	.theme-btn {
		display: flex;
		height: 2rem; width: 2rem;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		border: 1px solid var(--border);
		background: transparent;
		color: var(--muted-foreground);
		cursor: pointer;
	}

	.hero {
		position: relative;
		z-index: 5;
		max-width: 44rem;
		margin: 1rem auto 0;
		padding: 2rem 1.5rem 1.5rem;
		text-align: center;
	}
	.hero-eyebrow { margin-bottom: 1rem; }
	.pill {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.3rem 0.75rem;
		font-size: 0.72rem;
		font-weight: 600;
		border-radius: 9999px;
		border: 1px solid var(--border);
		background: var(--card);
		color: var(--muted-foreground);
	}
	.pill--green {
		color: var(--primary);
		border-color: color-mix(in oklab, var(--primary) 35%, var(--border));
		background: color-mix(in oklab, var(--primary) 10%, var(--card));
	}
	.hero-title {
		font-size: 2.2rem;
		line-height: 1.1;
		font-weight: 800;
		letter-spacing: -0.025em;
		color: var(--foreground);
		margin: 0;
	}
	@media (min-width: 640px) {
		.hero-title { font-size: 2.85rem; }
	}
	.hero-accent {
		display: block;
		margin-top: 0.25rem;
		background: linear-gradient(135deg, var(--primary), var(--ring));
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		color: transparent;
	}
	.hero-sub {
		margin: 1.25rem auto 0;
		max-width: 36rem;
		font-size: 1rem;
		line-height: 1.6;
		color: var(--muted-foreground);
	}
	.hero-sub strong { color: var(--foreground); font-weight: 600; }
	.hero-cta {
		margin-top: 1.75rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.6rem;
	}
	.hero-cta-meta {
		font-size: 0.7rem;
		color: var(--muted-foreground);
		font-family: var(--font-mono);
	}
	.btn-primary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		height: 2.75rem;
		padding: 0 1.5rem;
		border-radius: 9999px;
		font-size: 0.9rem;
		font-weight: 600;
		background: var(--primary);
		color: var(--primary-foreground);
		border: 1px solid transparent;
		box-shadow: 0 8px 20px color-mix(in oklab, var(--primary) 30%, transparent);
		transition: transform 0.15s, box-shadow 0.15s;
	}
	.btn-primary:hover { transform: translateY(-2px); }
	.btn-primary--xl {
		height: 3.2rem;
		padding: 0 1.75rem;
		font-size: 0.95rem;
	}

	.demo-wrap {
		position: relative;
		z-index: 5;
		max-width: 44rem;
		margin: 1.5rem auto 0;
		padding: 0 1.5rem;
	}
	.demo-card {
		padding: 1.75rem 1rem;
		border-radius: 1.25rem;
		border: 1px solid var(--border);
		background: var(--card);
		text-align: center;
	}
	.demo-label {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--muted-foreground);
		margin: 0 0 0.75rem;
	}
	.demo-stage {
		background: transparent;
		border: none;
		cursor: pointer;
		display: inline-flex;
		align-items: flex-end;
		gap: 0.5rem;
		padding: 0;
	}
	.demo-mac {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.demo-screen {
		width: 11rem;
		height: 7rem;
		border-radius: 0.75rem 0.75rem 0.25rem 0.25rem;
		background: #0d1b16;
		color: #f5fffc;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		border: 3px solid #0a0a0a;
		transition: box-shadow 0.35s ease;
	}
	.demo-mac.is-on .demo-screen {
		box-shadow: 0 0 0 2px color-mix(in oklab, var(--primary) 50%, transparent),
			0 0 30px color-mix(in oklab, var(--primary) 40%, transparent);
	}
	.demo-screen-icon--on { color: #9bf26d; }
	.demo-screen-icon--off { color: #ff9292; }
	.demo-screen-text { font-size: 0.8rem; font-weight: 600; }
	.demo-screen-text--on { color: #9bf26d; }
	.demo-screen-text--off { color: #ff9292; }
	.demo-base {
		width: 13rem;
		height: 0.6rem;
		margin-top: 0.15rem;
		border-radius: 0 0 0.6rem 0.6rem;
		background: linear-gradient(180deg, #1a1a1a, #0a0a0a);
	}
	.demo-cable {
		color: var(--muted-foreground);
		transition: transform 0.35s ease, color 0.2s;
		transform: translateX(-0.5rem);
	}
	.demo-cable.is-connected {
		color: var(--primary);
		transform: translateX(0);
	}
	.demo-caption {
		margin-top: 1rem;
		font-size: 0.85rem;
		color: var(--muted-foreground);
	}
	.status-on { color: var(--primary); }
	.status-off { color: #d04a4a; }

	.section {
		position: relative;
		z-index: 5;
		max-width: 44rem;
		margin: 3.5rem auto 0;
		padding: 0 1.5rem;
	}
	.section-title {
		font-size: 1.5rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1.25;
		color: var(--foreground);
		margin: 0 0 0.75rem;
	}
	@media (min-width: 640px) {
		.section-title { font-size: 1.75rem; }
	}
	.section-lede {
		font-size: 1rem;
		line-height: 1.6;
		color: var(--muted-foreground);
		margin: 0 0 1.5rem;
	}

	.steps {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}
	.step {
		display: flex;
		gap: 1rem;
		padding: 1.1rem 1.15rem;
		border-radius: 1rem;
		border: 1px solid var(--border);
		background: var(--card);
		transition: border-color 0.2s, transform 0.2s;
	}
	.step:hover {
		border-color: color-mix(in oklab, var(--primary) 40%, var(--border));
		transform: translateX(2px);
	}
	.step-num {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		border-radius: 9999px;
		background: color-mix(in oklab, var(--primary) 15%, transparent);
		color: var(--primary);
		font-weight: 700;
		font-family: var(--font-mono);
		font-size: 0.95rem;
	}
	.step-title {
		margin: 0 0 0.35rem;
		font-size: 1rem;
		font-weight: 600;
		color: var(--card-foreground);
	}
	.step-body p {
		margin: 0;
		font-size: 0.9rem;
		line-height: 1.55;
		color: var(--muted-foreground);
	}
	.step-body strong { color: var(--foreground); font-weight: 600; }
	.step-body em { font-style: normal; color: var(--foreground); font-weight: 500; }
	.step-link {
		color: var(--primary);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.compare {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}
	@media (min-width: 640px) {
		.compare { grid-template-columns: 1fr 1fr; }
	}
	.compare-col {
		padding: 1.25rem;
		border-radius: 1rem;
		border: 1px solid var(--border);
		background: var(--card);
	}
	.compare-col--slap {
		border-color: color-mix(in oklab, var(--primary) 40%, var(--border));
		background: linear-gradient(160deg, var(--card), color-mix(in oklab, var(--primary) 6%, var(--card)));
	}
	.compare-head { margin-bottom: 0.85rem; }
	.compare-badge {
		display: inline-block;
		padding: 0.25rem 0.7rem;
		border-radius: 9999px;
		background: var(--primary);
		color: var(--primary-foreground);
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}
	.compare-badge--muted {
		background: var(--muted);
		color: var(--muted-foreground);
	}
	.compare-price {
		margin: 0.55rem 0 0;
		font-size: 0.8rem;
		color: var(--muted-foreground);
		font-family: var(--font-mono);
	}
	.compare-price--muted { color: var(--muted-foreground); }
	.compare-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}
	.compare-list li {
		display: flex;
		gap: 0.5rem;
		align-items: flex-start;
		font-size: 0.88rem;
		color: var(--card-foreground);
		line-height: 1.45;
	}
	.compare-list--muted li {
		color: var(--muted-foreground);
	}

	.use-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.85rem;
	}
	@media (min-width: 640px) {
		.use-grid { grid-template-columns: 1fr 1fr; }
	}
	.use-card {
		padding: 1.1rem;
		border-radius: 0.9rem;
		border: 1px solid var(--border);
		background: var(--card);
	}
	.use-ico {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: 0.6rem;
		background: color-mix(in oklab, var(--primary) 12%, transparent);
		color: var(--primary);
		margin-bottom: 0.65rem;
	}
	.use-title {
		margin: 0 0 0.35rem;
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--card-foreground);
	}
	.use-card p {
		margin: 0;
		font-size: 0.85rem;
		line-height: 1.5;
		color: var(--muted-foreground);
	}

	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.faq-item {
		border: 1px solid var(--border);
		background: var(--card);
		border-radius: 0.85rem;
		padding: 0.75rem 1rem;
	}
	.faq-item[open] {
		border-color: color-mix(in oklab, var(--primary) 30%, var(--border));
	}
	.faq-q {
		cursor: pointer;
		font-weight: 600;
		font-size: 0.92rem;
		color: var(--card-foreground);
		list-style: none;
		padding: 0.25rem 0;
	}
	.faq-q::-webkit-details-marker { display: none; }
	.faq-q::after {
		content: '+';
		float: right;
		color: var(--muted-foreground);
		font-weight: 400;
	}
	.faq-item[open] .faq-q::after { content: '–'; }
	.faq-a {
		margin: 0.5rem 0 0.3rem;
		font-size: 0.88rem;
		line-height: 1.55;
		color: var(--muted-foreground);
	}

	.cta {
		position: relative;
		z-index: 5;
		max-width: 44rem;
		margin: 3.5rem auto 4rem;
		padding: 0 1.5rem;
	}
	.cta-inner {
		padding: 2.5rem 1.75rem;
		border-radius: 1.25rem;
		border: 1px solid color-mix(in oklab, var(--primary) 30%, var(--border));
		background:
			radial-gradient(circle at 20% 0%, color-mix(in oklab, var(--primary) 15%, transparent), transparent 60%),
			var(--card);
		text-align: center;
	}
	.cta-title {
		margin: 0 0 0.6rem;
		font-size: 1.45rem;
		font-weight: 700;
		line-height: 1.2;
		color: var(--foreground);
	}
	.cta-sub {
		margin: 0 0 1.25rem;
		font-size: 0.92rem;
		line-height: 1.55;
		color: var(--muted-foreground);
	}
	.cta-back {
		margin: 1.15rem 0 0;
		font-size: 0.8rem;
	}
	.cta-back a {
		color: var(--muted-foreground);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.cta-back a:hover { color: var(--foreground); }

	.h-3\.5 { height: 0.875rem; }
	.w-3\.5 { width: 0.875rem; }
	.h-4 { height: 1rem; }
	.w-4 { width: 1rem; }
	.h-5 { height: 1.25rem; }
	.w-5 { width: 1.25rem; }
	.h-6 { height: 1.5rem; }
	.w-6 { width: 1.5rem; }
	.h-10 { height: 2.5rem; }
	.w-10 { width: 2.5rem; }
	.shrink-0 { flex-shrink: 0; }
	.text-primary { color: var(--primary); }

	/* Related SlapMyMac pages section */
	.related {
		padding: 48px 0 16px;
	}
	.related-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 14px;
		margin-top: 18px;
	}
	@media (max-width: 900px) {
		.related-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
	}
	@media (max-width: 520px) {
		.related-grid { grid-template-columns: 1fr; }
	}
	.related-card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 18px 18px 20px;
		background: color-mix(in oklab, var(--card) 94%, transparent);
		border: 1px solid var(--border);
		border-radius: 16px;
		text-decoration: none;
		color: var(--foreground);
		transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
		overflow: hidden;
	}
	.related-card::after {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(
			120% 80% at 0% 0%,
			color-mix(in oklab, var(--primary) 12%, transparent),
			transparent 55%
		);
		opacity: 0;
		transition: opacity 0.2s ease;
		pointer-events: none;
	}
	.related-card:hover {
		transform: translateY(-2px);
		border-color: color-mix(in oklab, var(--primary) 45%, var(--border));
		box-shadow: 0 10px 28px -16px color-mix(in oklab, var(--primary) 45%, transparent);
		background: color-mix(in oklab, var(--card) 98%, transparent);
	}
	.related-card:hover::after { opacity: 1; }
	.related-emoji {
		font-size: 26px;
		line-height: 1;
		margin-bottom: 4px;
	}
	.related-name {
		font-weight: 700;
		font-size: 15px;
		letter-spacing: -0.01em;
		color: var(--foreground);
	}
	.related-desc {
		font-size: 13px;
		line-height: 1.45;
		color: var(--muted-foreground);
	}

	/* Site footer */
	.site-foot {
		margin-top: 48px;
		padding: 28px 0 36px;
		border-top: 1px solid color-mix(in oklab, var(--border) 70%, transparent);
	}
	.site-foot-nav {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 10px 12px;
	}
	.site-foot-link {
		color: var(--muted-foreground);
		text-decoration: none;
		font-size: 13.5px;
		font-weight: 500;
		letter-spacing: -0.005em;
		padding: 4px 2px;
		transition: color 0.15s ease;
	}
	.site-foot-link:hover {
		color: var(--foreground);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.site-foot-dot {
		color: color-mix(in oklab, var(--muted-foreground) 55%, transparent);
		font-size: 12px;
		user-select: none;
	}
</style>
