<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import {
		Activity,
		ArrowRight,
		AudioLines,
		BatteryCharging,
		ChartColumn,
		Download,
		Filter,
		FolderOpen,
		Gauge,
		Hand,
		LayoutDashboard,
		MonitorSmartphone,
		Moon,
		Mountain,
		Music,
		Play,
		Plug,
		SlidersHorizontal,
		Sun,
		Timer,
		TrendingUp,
		Usb,
		Volume2,
		Zap
	} from 'lucide-svelte';
	import {
		ASSET,
		DOWNLOAD_URL,
		FEATURE_GRID,
		NERDY_ALGORITHMS,
		VOICE_PACKS,
		type VoicePack
	} from '$lib/slapmac/data';
	import { trackDownloadClick } from '$lib/analytics/mixpanel-seo';
	import { buildFeaturesPageJsonLd } from '$lib/seo/jsonld';
	import SeoHead from '$lib/seo/SeoHead.svelte';

	const FEATURES_DESCRIPTION =
		'SlapMyMac features: slap detection with 5 algorithms, 7 voice packs, USB Moaner, Lid Creak, custom sound folders, sensitivity & cooldown, menu bar slap counter. macOS 14.6+, M1 Pro+ MacBook.';

	const algoIcons = [Filter, Activity, Zap, Mountain, TrendingUp] as const;
	const featureIcons = [
		Hand,
		Volume2,
		Gauge,
		Timer,
		Usb,
		MonitorSmartphone,
		ChartColumn,
		AudioLines,
		FolderOpen
	];

	let dark = $state(false);
	let themeReady = $state(false);
	let voiceId = $state('woman');
	let playing = $state(false);
	let activeAlgo = $state<number | null>(null);

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

	function currentPack(): VoicePack {
		return VOICE_PACKS.find((p) => p.value === voiceId) ?? VOICE_PACKS[0];
	}

	async function playSample() {
		if (!browser || playing) return;
		const p = currentPack();
		playing = true;
		const a = new Audio(`${ASSET}${p.sample}`);
		a.onended = async () => {
			if (p.followUp) {
				const b = new Audio(`${ASSET}${p.followUp}`);
				await b.play().catch(() => {});
				b.onended = () => { playing = false; };
			} else playing = false;
		};
		await a.play().catch(() => { playing = false; });
	}
</script>

<SeoHead
	title="Features — SlapMyMac"
	description={FEATURES_DESCRIPTION}
	keywords="SlapMyMac features, USB Moaner, Lid Creak, custom sound packs, MacBook accelerometer, menu bar app, slap detection, voice packs"
	canonicalPath="/features"
	structuredData={buildFeaturesPageJsonLd(FEATURES_DESCRIPTION)}
/>

<div class="page-root">
	<div class="rays" aria-hidden="true"></div>

	<nav class="nav">
		<a href="/" class="nav-back">← Home</a>
		<div class="nav-right">
			<a href={DOWNLOAD_URL} class="nav-dl" onclick={() => trackDownloadClick('features_nav')}>
				<Download class="nav-dl-icon" strokeWidth={2} />
				Download
			</a>
			<button type="button" class="theme-btn" aria-label="Toggle dark mode" onclick={toggleTheme}>
				{#if dark}
					<Sun class="theme-icon" strokeWidth={2} />
				{:else}
					<Moon class="theme-icon" strokeWidth={2} />
				{/if}
			</button>
		</div>
	</nav>

	<!-- ── Hero ── -->
	<header class="hero">
		<div class="hero-eyebrow">
			<span class="pill">v1.2 · Current</span>
		</div>
		<h1 class="hero-title">Every feature,<br />explained.</h1>
		<p class="hero-sub">
			SlapMyMac is deceptively simple on the surface.<br />
			Here's what's running under the hood.
		</p>
	</header>

	<!-- ── Bento Grid: top features ── -->
	<section class="bento" aria-label="Core features">

		<!-- Big: Slap Detection -->
		<div class="bento-cell bento-slap">
			<div class="bento-accent" aria-hidden="true"></div>
			<div class="bento-inner">
				<div class="bento-icon-wrap">
					<Hand class="bento-icon" strokeWidth={1.5} />
				</div>
				<div>
					<h2 class="bento-title">Slap detection</h2>
					<p class="bento-body">
						Reads the built-in accelerometer at ~12.5 Hz. Five algorithms vote on every impact — so
						closing a laptop lid, typing hard, or bumping your desk won't trigger it.
					</p>
				</div>
				<div class="slap-chips">
					<span class="chip">M1PRO+</span>
					<span class="chip">macOS 14.6+</span>
					<span class="chip">IOKit HID</span>
				</div>
			</div>
		</div>

		<!-- Small: Volume scales with force -->
		<div class="bento-cell bento-vol">
			<Volume2 class="bento-sm-icon" strokeWidth={1.5} />
			<p class="bento-sm-title">Force → Volume</p>
			<p class="bento-sm-body">Gentle tap whispers. Full slap goes full blast.</p>
			<div class="vol-bars" aria-hidden="true">
				{#each [0.2, 0.4, 0.55, 0.7, 0.85, 1] as h, i}
					<div class="vol-bar" style="height:{h * 100}%; animation-delay:{i * 80}ms"></div>
				{/each}
			</div>
		</div>

		<!-- Small: Menu Bar Only -->
		<div class="bento-cell bento-menubar">
			<div class="menubar-mockup" aria-hidden="true">
				<div class="mb-dot"></div>
				<div class="mb-dot"></div>
				<div class="mb-dot"></div>
				<div class="mb-spacer"></div>
				<div class="mb-icon-pill">👋 42</div>
			</div>
			<p class="bento-sm-title">Menu bar only</p>
			<p class="bento-sm-body">No dock icon. Lurks silently. Always ready.</p>
		</div>

		<!-- Medium: Lid Creak -->
		<div class="bento-cell bento-lid">
			<div class="lid-visual" aria-hidden="true">
				<div class="lid-hinge">
					<div class="lid-screen"></div>
					<div class="lid-base"></div>
				</div>
			</div>
			<div>
				<div class="bento-title-row">
					<Gauge class="bento-sm-icon-inline" strokeWidth={1.5} />
					<h2 class="bento-med-title">Lid Creak</h2>
					<span class="badge-new">New</span>
				</div>
				<p class="bento-sm-body">Open or close your lid and it creaks like an old wooden door. Requires M2PRO+.</p>
			</div>
		</div>

		<!-- Medium: USB Moaner -->
		<div class="bento-cell bento-usb">
			<div class="usb-visual" aria-hidden="true">
				<div class="usb-plug">
					<div class="usb-head"></div>
					<div class="usb-cable"></div>
				</div>
				<div class="usb-sparks">
					<span>⚡</span>
					<span>🔊</span>
				</div>
			</div>
			<div>
				<div class="bento-title-row">
					<Usb class="bento-sm-icon-inline" strokeWidth={1.5} />
					<h2 class="bento-med-title">USB Moaner</h2>
				</div>
				<p class="bento-sm-body">
					Plug or unplug any USB device — including your
					<a href="/mac-sound-on-charger-connect-disconnect" class="inline-link">charger</a>.
					It moans. Same voice packs, no slapping required.
				</p>
			</div>
		</div>

		<!-- Full-width link card: Charger Sound (deep links to the dedicated page) -->
		<a
			href="/mac-sound-on-charger-connect-disconnect"
			class="bento-cell bento-charger"
			aria-label="Open the charger sound feature page"
		>
			<div class="charger-accent" aria-hidden="true"></div>
			<div class="charger-inner">
				<div class="charger-left">
					<div class="bento-title-row">
						<BatteryCharging class="bento-sm-icon-inline" strokeWidth={1.5} />
						<h2 class="bento-med-title">Charger Sound — MagSafe &amp; USB‑C</h2>
						<span class="badge-new">New page</span>
					</div>
					<p class="charger-body">
						Play a custom sound the instant your MacBook's charger connects or disconnects.
						Works on MagSafe 3 and every USB‑C power adapter. Different sound for plug vs unplug,
						picked from 7 voice packs or your own MP3 folder.
					</p>
					<div class="charger-chips">
						<span class="chip">MagSafe 3</span>
						<span class="chip">USB‑C</span>
						<span class="chip">Custom sounds</span>
					</div>
				</div>
				<div class="charger-right">
					<div class="charger-anim" aria-hidden="true">
						<div class="charger-mac">
							<div class="charger-screen">
								<BatteryCharging class="charger-screen-ico" strokeWidth={2} />
							</div>
							<div class="charger-base"></div>
						</div>
						<div class="charger-cable"><Plug class="charger-plug-ico" strokeWidth={2} /></div>
					</div>
					<span class="charger-cta">
						Learn more
						<ArrowRight class="charger-cta-ico" strokeWidth={2} />
					</span>
				</div>
			</div>
		</a>

	</section>

	<!-- ── Voice Packs ── -->
	<section class="section">
		<div class="section-label">
			<Music class="section-label-icon" strokeWidth={2} />
			<span>Voice Packs</span>
		</div>
		<h2 class="section-title">Seven moods of protest</h2>
		<p class="section-sub">
			130+ sound clips across seven built-in packs — plus your own folders as custom packs in Settings.
		</p>

		<div class="packs-grid">
			{#each VOICE_PACKS as pack}
				<button
					type="button"
					class="pack-card"
					class:pack-active={voiceId === pack.value}
					onclick={() => (voiceId = pack.value)}
					aria-pressed={voiceId === pack.value}
				>
					<span class="pack-emoji">{pack.emoji}</span>
					<span class="pack-name">{pack.label}</span>
					<span class="pack-desc">{pack.desc}</span>
					{#if voiceId === pack.value}
						<button
							type="button"
							class="pack-play"
							aria-label="Play {pack.label} sample"
							onclick={(e) => { e.stopPropagation(); playSample(); }}
							disabled={playing}
						>
							<Play class="pack-play-ico" fill="currentColor" strokeWidth={2} />
							{playing ? 'Playing…' : 'Play sample'}
						</button>
					{/if}
				</button>
			{/each}
		</div>
	</section>

	<!-- ── Controls ── -->
	<section class="section section-controls">
		<div class="controls-grid">
			<div class="control-card">
				<div class="control-header">
					<SlidersHorizontal class="control-icon" strokeWidth={2} />
					<h3 class="control-title">Sensitivity</h3>
				</div>
				<p class="control-body">From "butterfly landing" to "needs a running start". You pick the threshold.</p>
				<div class="fake-slider" aria-hidden="true">
					<div class="fake-track">
						<div class="fake-fill" style="width:62%"></div>
						<div class="fake-thumb" style="left:62%"></div>
					</div>
					<div class="fake-labels">
						<span>Feather</span>
						<span>Sledgehammer</span>
					</div>
				</div>
			</div>
			<div class="control-card">
				<div class="control-header">
					<Timer class="control-icon" strokeWidth={2} />
					<h3 class="control-title">Cooldown</h3>
				</div>
				<p class="control-body">Prevents meltdowns during rapid slaps. Set anywhere from rapid-fire to dramatic pauses.</p>
				<div class="fake-slider" aria-hidden="true">
					<div class="fake-track">
						<div class="fake-fill" style="width:35%"></div>
						<div class="fake-thumb" style="left:35%"></div>
					</div>
					<div class="fake-labels">
						<span>Rapid-fire</span>
						<span>Dramatic pause</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ── More features grid ── -->
	<section class="section">
		<div class="section-label">
			<LayoutDashboard class="section-label-icon" strokeWidth={2} />
			<span>Also ships with</span>
		</div>
		<div class="mini-grid">
			{#each FEATURE_GRID as f, i}
				{@const Icon = featureIcons[i]}
				<div class="mini-card">
					<div class="mini-icon">
						<Icon class="mini-icon-svg" strokeWidth={2} />
					</div>
					<p class="mini-title">{f.title}</p>
					<p class="mini-body">{f.body}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- ── Algorithms ── -->
	<section class="section">
		<div class="section-label">
			<Activity class="section-label-icon" strokeWidth={2} />
			<span>Under the hood</span>
		</div>
		<h2 class="section-title">Wildly overengineered</h2>
		<p class="section-sub">Five signal-processing algorithms vote on every impact. Democracy, but for physical abuse.</p>

		<div class="algo-grid">
			{#each NERDY_ALGORITHMS as algo, i}
				{@const Icon = algoIcons[i]}
				<div
					class="algo-card"
					class:algo-active={activeAlgo === i}
					role="button"
					tabindex="0"
					onmouseenter={() => (activeAlgo = i)}
					onmouseleave={() => (activeAlgo = null)}
					onfocus={() => (activeAlgo = i)}
					onblur={() => (activeAlgo = null)}
				>
					<div class="algo-num">{String(i + 1).padStart(2, '0')}</div>
					<div class="algo-icon-wrap">
						<Icon class="algo-icon-svg" strokeWidth={2} />
					</div>
					<p class="algo-name">{algo.name}</p>
					<p class="algo-desc">{algo.desc}</p>
				</div>
			{/each}
			<div class="algo-verdict">
				<Zap class="verdict-zap" strokeWidth={2} />
				<span class="verdict-text">Majority rules → <strong>sound plays</strong></span>
			</div>
		</div>

		<div class="arch-block">
			<p class="arch-label">Architecture</p>
			<pre class="code-block"><code>MenuBarExtra (SwiftUI)
  └─ SlapController
       ├─ AccelerometerReader  ← IOKit HID, ~12.5Hz
       ├─ LidAngleSensor       ← IOKit, lid angle detection
       ├─ SlapDetector         ← 5 algorithms vote
       ├─ USBWatcher           ← IOKit USB events
       ├─ AudioPlayer          ← AVFoundation
       └─ SettingsStore        ← UserDefaults</code></pre>
		</div>
	</section>

	<!-- ── CTA ── -->
	<div class="cta">
		<p class="cta-text">Ready to abuse your hardware?</p>
		<p class="cta-sub">$2 one-time · M1PRO+ MacBook · macOS 14.6+</p>
		<a href={DOWNLOAD_URL} class="btn-primary" onclick={() => trackDownloadClick('features_cta')}>
			<Download class="btn-ico" strokeWidth={2} />
			Download for Mac
		</a>
	</div>

	<footer class="foot">
		<a href="/" class="foot-link">Home</a>
		<span class="foot-dot">·</span>
		<a href="/features" class="foot-link">Features</a>
		<span class="foot-dot">·</span>
		<a href="/mac-sound-on-charger-connect-disconnect" class="foot-link">Charger sound</a>
		<span class="foot-dot">·</span>
		<a href="/privacy" class="foot-link">Privacy</a>
		<span class="foot-dot">·</span>
		<a href="/terms" class="foot-link">Terms</a>
	</footer>
</div>

<style>
	/* ─── Page shell ─── */
	.page-root {
		position: relative;
		width: 100%;
		min-height: 100vh;
		overflow-x: hidden;
	}
	.rays {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 0;
		background:
			radial-gradient(ellipse 80% 50% at 50% -20%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 55%),
			radial-gradient(ellipse 60% 40% at 80% 20%, color-mix(in oklab, var(--ring) 12%, transparent), transparent 50%),
			radial-gradient(ellipse 50% 35% at 15% 30%, color-mix(in oklab, var(--primary) 10%, transparent), transparent 45%);
		opacity: 0.9;
	}
	:global(html.dark) .rays {
		background:
			radial-gradient(ellipse 80% 50% at 50% -20%, color-mix(in oklab, var(--primary) 25%, transparent), transparent 55%),
			radial-gradient(ellipse 60% 40% at 80% 20%, color-mix(in oklab, var(--ring) 18%, transparent), transparent 50%),
			radial-gradient(ellipse 50% 35% at 15% 30%, color-mix(in oklab, var(--primary) 15%, transparent), transparent 45%);
	}

	/* everything sits above the rays */
	nav, header, section, .bento, .cta, footer {
		position: relative;
		z-index: 1;
	}

	/* ─── Nav ─── */
	.nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.5rem;
		max-width: 64rem;
		margin: 0 auto;
		width: 100%;
	}
	.nav-back {
		font-size: 0.8125rem;
		color: var(--muted-foreground);
		text-decoration: none;
		transition: color 0.15s;
	}
	.nav-back:hover { color: var(--foreground); }
	.nav-right {
		display: flex;
		align-items: center;
		gap: 0.625rem;
	}
	.nav-dl {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		height: 1.875rem;
		padding: 0 0.875rem;
		border-radius: 9999px;
		font-size: 0.8125rem;
		font-weight: 500;
		background: var(--primary);
		color: var(--primary-foreground);
		text-decoration: none;
		transition: background 0.15s;
	}
	.nav-dl:hover { background: color-mix(in oklab, var(--primary) 80%, black); }
	:global(.nav-dl-icon) { width: 0.75rem; height: 0.75rem; }
	.theme-btn {
		display: flex;
		height: 1.875rem;
		width: 1.875rem;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		border: 1px solid var(--border);
		background: transparent;
		color: var(--muted-foreground);
		cursor: pointer;
		transition: color 0.15s, border-color 0.15s;
	}
	.theme-btn:hover {
		color: var(--foreground);
		border-color: color-mix(in oklab, var(--foreground) 30%, transparent);
	}
	:global(.theme-icon) { width: 0.875rem; height: 0.875rem; }

	/* ─── Hero ─── */
	.hero {
		text-align: center;
		padding: 3rem 1.5rem 3.5rem;
		max-width: 44rem;
		margin: 0 auto;
	}
	.hero-eyebrow {
		margin-bottom: 1.25rem;
	}
	.pill {
		display: inline-block;
		padding: 0.25rem 0.875rem;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.03em;
		background: color-mix(in oklab, var(--primary) 12%, transparent);
		color: var(--primary);
		border: 1px solid color-mix(in oklab, var(--primary) 25%, transparent);
	}
	.hero-title {
		margin: 0;
		font-size: clamp(2.25rem, 6vw, 3.5rem);
		font-weight: 700;
		letter-spacing: -0.035em;
		line-height: 1.05;
		color: var(--foreground);
	}
	.hero-sub {
		margin: 1rem 0 0;
		font-size: 1.0625rem;
		line-height: 1.65;
		color: var(--muted-foreground);
	}

	/* ─── Bento ─── */
	.bento {
		max-width: 64rem;
		margin: 0 auto;
		padding: 0 1.25rem 1.25rem;
		display: grid;
		gap: 0.875rem;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto;
	}
	@media (min-width: 640px) {
		.bento {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	/* shared cell base */
	.bento-cell {
		border-radius: 1.125rem;
		border: 1px solid var(--border);
		background: var(--card);
		overflow: hidden;
		position: relative;
		box-shadow:
			0 4px 12px color-mix(in oklab, var(--foreground) 5%, transparent),
			0 1px 2px -1px color-mix(in oklab, var(--foreground) 5%, transparent);
		transition: transform 0.2s, box-shadow 0.2s;
	}
	.bento-cell:hover {
		transform: translateY(-2px);
		box-shadow:
			0 8px 24px color-mix(in oklab, var(--foreground) 8%, transparent),
			0 2px 4px -1px color-mix(in oklab, var(--foreground) 8%, transparent);
	}
	:global(html.dark) .bento-cell {
		box-shadow: 0 6px 20px color-mix(in oklab, #000 40%, transparent);
	}

	/* ── Slap Detection — spans full width on mobile, col 1-3 on desktop ── */
	.bento-slap {
		grid-column: 1 / -1;
		padding: 0;
	}
	@media (min-width: 640px) {
		.bento-slap { grid-column: 1 / 3; }
	}
	.bento-accent {
		position: absolute;
		top: -3rem;
		right: -3rem;
		width: 12rem;
		height: 12rem;
		border-radius: 9999px;
		background: radial-gradient(circle, color-mix(in oklab, var(--primary) 20%, transparent), transparent 70%);
		pointer-events: none;
	}
	.bento-inner {
		padding: 1.75rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.bento-icon-wrap {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 3rem;
		height: 3rem;
		border-radius: 0.875rem;
		background: color-mix(in oklab, var(--primary) 15%, transparent);
		border: 1px solid color-mix(in oklab, var(--primary) 25%, transparent);
	}
	:global(.bento-icon) {
		width: 1.5rem;
		height: 1.5rem;
		color: var(--primary);
	}
	.bento-title {
		margin: 0;
		font-size: 1.1875rem;
		font-weight: 700;
		color: var(--card-foreground);
		letter-spacing: -0.02em;
	}
	.bento-body {
		margin: 0.375rem 0 0;
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--muted-foreground);
	}
	.slap-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
	}
	.chip {
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		padding: 0.1875rem 0.5rem;
		border-radius: 0.375rem;
		background: var(--muted);
		color: var(--muted-foreground);
	}

	/* ── Volume cell ── */
	.bento-vol {
		padding: 1.375rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	:global(.bento-sm-icon) {
		width: 1.25rem;
		height: 1.25rem;
		color: var(--primary);
		margin-bottom: 0.5rem;
	}
	.bento-sm-title {
		margin: 0;
		font-size: 0.9375rem;
		font-weight: 700;
		color: var(--card-foreground);
		letter-spacing: -0.015em;
	}
	.bento-sm-body {
		margin: 0.25rem 0 0;
		font-size: 0.8125rem;
		line-height: 1.55;
		color: var(--muted-foreground);
	}
	.vol-bars {
		margin-top: auto;
		padding-top: 0.875rem;
		display: flex;
		align-items: flex-end;
		gap: 0.25rem;
		height: 2.5rem;
	}
	.vol-bar {
		flex: 1;
		border-radius: 3px 3px 0 0;
		background: var(--primary);
		opacity: 0.75;
		animation: vol-grow 0.6s ease-out both;
	}
	@keyframes vol-grow {
		from { transform: scaleY(0); transform-origin: bottom; }
		to   { transform: scaleY(1); transform-origin: bottom; }
	}

	/* ── Menu bar cell ── */
	.bento-menubar {
		padding: 1.375rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.menubar-mockup {
		display: flex;
		align-items: center;
		gap: 0.3125rem;
		background: color-mix(in oklab, var(--foreground) 8%, transparent);
		border-radius: 0.5rem;
		padding: 0.4375rem 0.625rem;
		margin-bottom: 0.75rem;
	}
	.mb-dot {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 9999px;
		background: var(--border);
	}
	.mb-spacer { flex: 1; }
	.mb-icon-pill {
		font-size: 0.6875rem;
		font-weight: 600;
		color: var(--card-foreground);
		background: color-mix(in oklab, var(--primary) 12%, transparent);
		padding: 0.125rem 0.4375rem;
		border-radius: 0.3125rem;
	}

	/* ── Lid Creak & USB cells (bottom row) ── */
	.bento-lid, .bento-usb {
		grid-column: 1 / -1;
		padding: 1.375rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	@media (min-width: 640px) {
		.bento-lid { grid-column: 1 / 3; }
		.bento-usb { grid-column: 3 / 5; }
	}
	.bento-title-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
	}
	:global(.bento-sm-icon-inline) {
		width: 1.125rem;
		height: 1.125rem;
		color: var(--primary);
		flex-shrink: 0;
	}
	.bento-med-title {
		margin: 0;
		font-size: 1rem;
		font-weight: 700;
		color: var(--card-foreground);
	}
	.badge-new {
		border-radius: 9999px;
		background: color-mix(in oklab, var(--primary) 15%, transparent);
		padding: 0.125rem 0.5rem;
		font-size: 0.6875rem;
		font-weight: 600;
		color: var(--primary);
	}

	/* lid visual */
	.lid-visual {
		display: flex;
		justify-content: center;
		padding: 0.25rem 0 0.5rem;
	}
	.lid-hinge {
		position: relative;
		width: 4rem;
	}
	.lid-screen {
		height: 2.25rem;
		border-radius: 0.3125rem 0.3125rem 0 0;
		border: 2px solid var(--border);
		background: color-mix(in oklab, var(--primary) 8%, transparent);
		transform-origin: bottom center;
		animation: lid-open 2.5s ease-in-out infinite;
	}
	.lid-base {
		height: 0.5rem;
		border-radius: 0 0 0.25rem 0.25rem;
		background: var(--muted);
	}
	@keyframes lid-open {
		0%, 100% { transform: rotateX(0deg); }
		40%       { transform: rotateX(-35deg); }
		60%       { transform: rotateX(-35deg); }
	}

	/* usb visual */
	.usb-visual {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.25rem 0 0.5rem;
	}
	.usb-plug {
		display: flex;
		align-items: center;
		gap: 0;
		animation: usb-in 2s ease-in-out infinite;
	}
	.usb-head {
		width: 1.25rem;
		height: 0.6875rem;
		border-radius: 0.125rem;
		background: color-mix(in oklab, var(--primary) 35%, transparent);
		border: 1.5px solid var(--primary);
	}
	.usb-cable {
		width: 1.5rem;
		height: 3px;
		background: var(--border);
	}
	.usb-sparks {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
		font-size: 0.75rem;
		animation: usb-spark 2s ease-in-out infinite;
	}
	@keyframes usb-in {
		0%, 30% { transform: translateX(-6px); opacity: 0.4; }
		50%, 80% { transform: translateX(0); opacity: 1; }
		100%     { transform: translateX(-6px); opacity: 0.4; }
	}
	@keyframes usb-spark {
		0%, 40% { opacity: 0; transform: scale(0.5); }
		55%, 75% { opacity: 1; transform: scale(1); }
		90%, 100% { opacity: 0; }
	}

	/* ── Charger bento (full-width link card) ── */
	.bento-charger {
		grid-column: 1 / -1;
		padding: 0;
		text-decoration: none;
		color: inherit;
		position: relative;
		overflow: hidden;
		background: linear-gradient(135deg, var(--card) 0%, color-mix(in oklab, var(--primary) 6%, var(--card)) 100%);
		border: 1px solid color-mix(in oklab, var(--primary) 30%, var(--border));
		cursor: pointer;
	}
	.bento-charger::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: linear-gradient(90deg, var(--primary), var(--ring), var(--primary));
		background-size: 200% 100%;
		animation: charger-shimmer 5s linear infinite;
	}
	@keyframes charger-shimmer {
		0% { background-position: 0% 50%; }
		100% { background-position: 200% 50%; }
	}
	.bento-charger:hover {
		border-color: color-mix(in oklab, var(--primary) 55%, var(--border));
		transform: translateY(-3px);
		box-shadow:
			0 14px 36px color-mix(in oklab, var(--primary) 20%, transparent),
			0 4px 12px color-mix(in oklab, var(--foreground) 8%, transparent);
	}
	.charger-accent {
		position: absolute;
		top: -4rem;
		right: -4rem;
		width: 16rem;
		height: 16rem;
		border-radius: 9999px;
		background: radial-gradient(circle, color-mix(in oklab, var(--primary) 22%, transparent), transparent 70%);
		pointer-events: none;
	}
	.charger-inner {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		padding: 1.625rem;
	}
	@media (min-width: 720px) {
		.charger-inner {
			flex-direction: row;
			align-items: center;
			gap: 1.75rem;
		}
	}
	.charger-left { flex: 1; }
	.charger-right {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-shrink: 0;
	}
	.charger-body {
		margin: 0.5rem 0 0.75rem;
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--muted-foreground);
	}
	.charger-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
	}
	.charger-anim {
		display: flex;
		align-items: flex-end;
		gap: 0.4rem;
	}
	.charger-mac {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.charger-screen {
		width: 4.5rem;
		height: 3rem;
		border-radius: 0.35rem 0.35rem 0 0;
		background: #0a1410;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid color-mix(in oklab, var(--primary) 50%, #0a0a0a);
		box-shadow: 0 0 14px color-mix(in oklab, var(--primary) 35%, transparent);
	}
	:global(.charger-screen-ico) {
		width: 1.5rem;
		height: 1.5rem;
		color: #9bf26d;
	}
	.charger-base {
		width: 5.5rem;
		height: 0.28rem;
		border-radius: 0 0 0.45rem 0.45rem;
		background: linear-gradient(180deg, #1a1a1a, #0a0a0a);
		margin-top: 0.1rem;
	}
	.charger-cable {
		color: var(--primary);
		animation: charger-pulse 2.4s ease-in-out infinite;
	}
	@keyframes charger-pulse {
		0%, 100% { transform: translateX(-0.4rem); opacity: 0.55; }
		50% { transform: translateX(0); opacity: 1; }
	}
	:global(.charger-plug-ico) { width: 1.25rem; height: 1.25rem; }
	.charger-cta {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.8rem;
		font-weight: 700;
		color: var(--primary);
		letter-spacing: 0.01em;
		white-space: nowrap;
	}
	.bento-charger:hover .charger-cta {
		gap: 0.55rem;
	}
	:global(.charger-cta-ico) {
		width: 0.95rem;
		height: 0.95rem;
		transition: transform 0.2s ease;
	}
	.bento-charger:hover :global(.charger-cta-ico) {
		transform: translateX(3px);
	}
	.inline-link {
		color: var(--primary);
		text-decoration: underline;
		text-underline-offset: 2px;
		font-weight: 500;
	}
	.inline-link:hover {
		color: color-mix(in oklab, var(--primary) 80%, var(--foreground));
	}

	/* ─── Sections ─── */
	.section {
		max-width: 64rem;
		margin: 0 auto;
		padding: 3.5rem 1.25rem;
	}
	.section-label {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--primary);
		margin-bottom: 0.75rem;
	}
	:global(.section-label-icon) {
		width: 0.875rem;
		height: 0.875rem;
	}
	.section-title {
		margin: 0 0 0.625rem;
		font-size: clamp(1.625rem, 4vw, 2.25rem);
		font-weight: 700;
		letter-spacing: -0.03em;
		color: var(--foreground);
	}
	.section-sub {
		margin: 0 0 2.5rem;
		font-size: 1rem;
		line-height: 1.65;
		color: var(--muted-foreground);
		max-width: 36rem;
	}

	/* ─── Packs grid ─── */
	.packs-grid {
		display: grid;
		gap: 0.75rem;
		grid-template-columns: repeat(2, 1fr);
	}
	@media (min-width: 480px) {
		.packs-grid { grid-template-columns: repeat(3, 1fr); }
	}
	@media (min-width: 768px) {
		.packs-grid { grid-template-columns: repeat(4, 1fr); }
	}
	.pack-card {
		border-radius: 1rem;
		border: 1px solid var(--border);
		background: var(--card);
		padding: 1.125rem;
		text-align: left;
		cursor: pointer;
		transition: border-color 0.15s, background 0.15s, transform 0.15s, box-shadow 0.15s;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
	.pack-card:hover {
		border-color: color-mix(in oklab, var(--primary) 40%, transparent);
		transform: translateY(-1px);
		box-shadow: 0 4px 16px color-mix(in oklab, var(--primary) 10%, transparent);
	}
	.pack-active {
		border-color: var(--primary) !important;
		background: color-mix(in oklab, var(--primary) 6%, var(--card)) !important;
		box-shadow: 0 0 0 3px color-mix(in oklab, var(--primary) 15%, transparent) !important;
	}
	.pack-emoji {
		font-size: 1.5rem;
		line-height: 1;
		display: block;
		margin-bottom: 0.375rem;
	}
	.pack-name {
		font-size: 0.875rem;
		font-weight: 700;
		color: var(--card-foreground);
		display: block;
	}
	.pack-desc {
		font-size: 0.75rem;
		line-height: 1.5;
		color: var(--muted-foreground);
		display: block;
	}
	.pack-play {
		display: inline-flex;
		align-items: center;
		gap: 0.3125rem;
		margin-top: 0.625rem;
		height: 1.75rem;
		padding: 0 0.75rem;
		border-radius: 9999px;
		border: none;
		background: var(--primary);
		color: var(--primary-foreground);
		font-size: 0.75rem;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.15s;
		align-self: flex-start;
	}
	.pack-play:hover:not(:disabled) {
		background: color-mix(in oklab, var(--primary) 80%, black);
	}
	.pack-play:disabled { opacity: 0.6; cursor: not-allowed; }
	:global(.pack-play-ico) {
		width: 0.75rem;
		height: 0.75rem;
		margin-left: 1px;
	}

	/* ─── Controls ─── */
	.section-controls {
		padding-top: 0;
	}
	.controls-grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: 1fr;
	}
	@media (min-width: 640px) {
		.controls-grid { grid-template-columns: repeat(2, 1fr); }
	}
	.control-card {
		border-radius: 1.125rem;
		border: 1px solid var(--border);
		background: var(--card);
		padding: 1.625rem;
		box-shadow: 0 4px 12px color-mix(in oklab, var(--foreground) 5%, transparent);
	}
	:global(html.dark) .control-card {
		box-shadow: 0 6px 20px color-mix(in oklab, #000 40%, transparent);
	}
	.control-header {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		margin-bottom: 0.625rem;
	}
	:global(.control-icon) {
		width: 1.25rem;
		height: 1.25rem;
		color: var(--primary);
		flex-shrink: 0;
	}
	.control-title {
		margin: 0;
		font-size: 1rem;
		font-weight: 700;
		color: var(--card-foreground);
	}
	.control-body {
		margin: 0 0 1.25rem;
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--muted-foreground);
	}
	.fake-slider { user-select: none; }
	.fake-track {
		position: relative;
		height: 0.375rem;
		background: var(--muted);
		border-radius: 9999px;
		margin-bottom: 0.5rem;
	}
	.fake-fill {
		position: absolute;
		height: 100%;
		border-radius: 9999px;
		background: var(--primary);
	}
	.fake-thumb {
		position: absolute;
		top: 50%;
		width: 0.875rem;
		height: 0.875rem;
		border-radius: 9999px;
		background: #fff;
		border: 2px solid var(--primary);
		transform: translate(-50%, -50%);
		box-shadow: 0 1px 4px color-mix(in oklab, var(--foreground) 20%, transparent);
	}
	.fake-labels {
		display: flex;
		justify-content: space-between;
		font-size: 0.6875rem;
		color: var(--muted-foreground);
	}

	/* ─── Mini features grid ─── */
	.mini-grid {
		display: grid;
		gap: 0.75rem;
		grid-template-columns: repeat(2, 1fr);
	}
	@media (min-width: 640px) {
		.mini-grid { grid-template-columns: repeat(4, 1fr); }
	}
	.mini-card {
		border-radius: 0.875rem;
		border: 1px solid var(--border);
		background: var(--card);
		padding: 1.125rem;
		transition: border-color 0.15s, transform 0.15s;
	}
	.mini-card:hover {
		border-color: color-mix(in oklab, var(--primary) 35%, transparent);
		transform: translateY(-1px);
	}
	.mini-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		border-radius: 0.5rem;
		background: var(--muted);
		margin-bottom: 0.625rem;
	}
	:global(.mini-icon-svg) {
		width: 1rem;
		height: 1rem;
		color: var(--muted-foreground);
	}
	.mini-title {
		margin: 0 0 0.25rem;
		font-size: 0.875rem;
		font-weight: 700;
		color: var(--card-foreground);
	}
	.mini-body {
		margin: 0;
		font-size: 0.75rem;
		line-height: 1.55;
		color: var(--muted-foreground);
	}

	/* ─── Algorithms ─── */
	.algo-grid {
		display: grid;
		gap: 0.625rem;
		grid-template-columns: repeat(2, 1fr);
	}
	@media (min-width: 640px) {
		.algo-grid { grid-template-columns: repeat(5, 1fr); }
	}
	.algo-card {
		border-radius: 1rem;
		border: 1px solid var(--border);
		background: var(--card);
		padding: 1.125rem;
		cursor: default;
		transition: border-color 0.15s, background 0.15s, transform 0.15s;
		outline: none;
	}
	.algo-card:hover, .algo-active {
		border-color: color-mix(in oklab, var(--primary) 45%, transparent);
		background: color-mix(in oklab, var(--primary) 5%, var(--card));
		transform: translateY(-2px);
	}
	.algo-num {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		font-weight: 600;
		color: var(--primary);
		margin-bottom: 0.625rem;
		opacity: 0.7;
	}
	.algo-icon-wrap {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		border-radius: 0.5rem;
		background: color-mix(in oklab, var(--primary) 12%, transparent);
		margin-bottom: 0.625rem;
	}
	:global(.algo-icon-svg) {
		width: 1rem;
		height: 1rem;
		color: var(--primary);
	}
	.algo-name {
		margin: 0 0 0.25rem;
		font-size: 0.8125rem;
		font-weight: 700;
		color: var(--card-foreground);
	}
	.algo-desc {
		margin: 0;
		font-size: 0.6875rem;
		line-height: 1.5;
		color: var(--muted-foreground);
	}
	/* verdict spans last column on mobile */
	.algo-verdict {
		grid-column: 1 / -1;
		border-radius: 0.875rem;
		border: 1px dashed color-mix(in oklab, var(--primary) 35%, transparent);
		background: color-mix(in oklab, var(--primary) 5%, transparent);
		padding: 0.875rem 1.125rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		color: var(--muted-foreground);
	}
	:global(.verdict-zap) {
		width: 1rem;
		height: 1rem;
		color: var(--primary);
		flex-shrink: 0;
	}
	.verdict-text strong {
		color: var(--card-foreground);
		font-weight: 700;
	}

	.arch-block {
		margin-top: 1.5rem;
	}
	.arch-label {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--muted-foreground);
		margin: 0 0 0.625rem;
	}
	.code-block {
		overflow-x: auto;
		border-radius: 0.875rem;
		background: var(--foreground);
		padding: 1.375rem;
		font-size: 0.8125rem;
		line-height: 1.7;
		color: var(--background);
		margin: 0;
	}
	.code-block code {
		font-family: var(--font-mono);
		white-space: pre;
	}

	/* ─── CTA ─── */
	.cta {
		text-align: center;
		padding: 4rem 1.5rem 3rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}
	.cta-text {
		margin: 0;
		font-size: 1.375rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--foreground);
	}
	.cta-sub {
		margin: 0;
		font-size: 0.875rem;
		color: var(--muted-foreground);
	}
	.btn-primary {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		margin-top: 1rem;
		height: 2.875rem;
		padding: 0 1.625rem;
		border-radius: 9999px;
		font-size: 0.9375rem;
		font-weight: 600;
		background: var(--primary);
		color: var(--primary-foreground);
		text-decoration: none;
		border: 1px solid transparent;
		transition: background 0.15s, transform 0.05s;
	}
	.btn-primary:hover { background: color-mix(in oklab, var(--primary) 80%, black); }
	.btn-primary:active { transform: translateY(1px); }
	:global(.btn-ico) { width: 1rem; height: 1rem; }

	/* ─── Footer ─── */
	.foot {
		padding: 2rem 1.5rem;
		text-align: center;
		font-size: 0.75rem;
		color: var(--muted-foreground);
		position: relative;
		z-index: 1;
	}
	.foot-link {
		color: var(--muted-foreground);
		text-decoration: none;
		transition: color 0.15s;
	}
	.foot-link:hover { color: var(--foreground); }
	.foot-dot { margin: 0 0.375rem; }
</style>
