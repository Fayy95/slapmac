<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import {
		Activity,
		AudioLines,
		ChartColumn,
		Cable,
		ChevronDown,
		ChevronUp,
		CircleCheck,
		CircleQuestionMark,
		Download,
		Filter,
		FolderOpen,
		Gauge,
		Glasses,
		Hand,
		Heart,
		LayoutGrid,
		MonitorSmartphone,
		Moon,
		Mountain,
		Music,
		Play,
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
		FAQ_ITEMS,
		FEATURE_GRID,
		NERDY_ALGORITHMS,
		PAST_RELEASES,
		VOICE_PACKS,
		type VoicePack
	} from '$lib/slapmac/data';
	import { trackDownloadClick } from '$lib/analytics/mixpanel-seo';
	import SeoHead from '$lib/seo/SeoHead.svelte';
	import { DEFAULT_TITLE } from '$lib/seo/site';
	import { buildHomepageJsonLd } from '$lib/seo/homepage-jsonld';

	const iconSm = 'h-4 w-4 text-muted shrink-0';
	const iconLg = 'h-7 w-7 text-primary shrink-0';
	const algoIcons = [Filter, Activity, Zap, Mountain, TrendingUp] as const;

	let dark = $state(false);
	let slapKey = $state(0);
	let voiceId = $state('woman');
	let openFaq = $state<number | null>(null);
	let nerdyOpen = $state(false);
	let sens = $state(50);
	let cool = $state(30);
	let playing = $state(false);
	let themeReady = $state(false);

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

	function sensG(): string {
		return (0.001 + ((100 - sens) / 100) * 0.1).toFixed(3);
	}

	function coolS(): string {
		return (0.4 + (cool / 100) * 2).toFixed(1);
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
				b.onended = () => {
					playing = false;
				};
			} else playing = false;
		};
		await a.play().catch(() => {
			playing = false;
		});
	}

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
</script>

<SeoHead
	title={DEFAULT_TITLE}
	keywords="slapmymac, slap my mac, slap my macbook, slap mac, slap your macbook, funny mac app, macbook prank app, mac menu bar app, macbook sound effects, mac accelerometer app, usb moaner, lid creak, custom sound pack mac, apple silicon app, m1 pro app, m2 pro, macos sonoma, macos sequoia, mac humor app, macbook screams, mac app that talks back"
	structuredData={buildHomepageJsonLd()}
/>

<div class="page-root">
	<div class="bg-canvas" aria-hidden="true"></div>
	<div class="shell flex min-h-screen flex-col relative">
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<div class="light-rays-container"></div>
		</div>

		<nav class="nav flex w-full items-center gap-2 sm:gap-3 px-4 sm:px-6 py-4 relative z-10">
			<a href="#faq" class="nav-link">FAQ</a>
			<a href="/features" class="nav-link mr-auto">Features</a>
			<button
				type="button"
				class="theme-btn"
				aria-label="Toggle dark mode"
				onclick={toggleTheme}
			>
				{#if dark}
					<Sun class="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2} />
				{:else}
					<Moon class="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2} />
				{/if}
			</button>
			<a href="/recover-license" class="recover">Recover license</a>
		</nav>

		<section class="hero flex flex-col items-center px-6 pt-0 pb-16 relative z-10">
			<div class="hero-pulse" aria-hidden="true"></div>

			<div class="hero-sticker-row" aria-hidden="true">
				<span class="sticker sticker--green">Viral on Instagram</span>
				<span class="sticker sticker--amber">★ 4.8 / 5</span>
				<span class="sticker sticker--blue">macOS 14.6+</span>
			</div>

			<div class="relative -mt-2 sm:mt-0 mb-2 hero-logo-outer">
				{#key slapKey}
					<button
						type="button"
						class="logo-btn"
						onclick={() => slapKey++}
						aria-label="Slap the SlapMyMac logo"
					>
						<div class="hero-logo-box">
							<span class="hero-logo-glow" aria-hidden="true"></span>
							<img
								src="/slapmac_logo_no_text.svg"
								alt="SlapMyMac logo — a MacBook with an expressive screaming screen"
								draggable="false"
								class="hero-logo-img animate-slap select-none"
							/>
						</div>
					</button>
				{/key}
			</div>

			<h1 class="hero-title">
				<span class="hero-title-brand">SlapMyMac</span>
				<span class="hero-title-tag">Slap your MacBook. It screams back.</span>
			</h1>

			<p class="hero-sub">
				The viral <strong>Mac menu bar app</strong> that turns every slap, USB plug and lid creak
				into a voice reaction. 7 voice packs, 130+ clips, custom sound folders — all hiding in
				your menu bar.
			</p>

			<div class="mt-6 flex items-center gap-4">
				<a
					href={DOWNLOAD_URL}
					class="btn-primary btn-primary--xl"
					onclick={() => trackDownloadClick('home_hero')}
				>
					<Download class="h-4 w-4" strokeWidth={2} />
					Download SlapMyMac — $2
				</a>
			</div>

			<p class="hero-meta mt-5 font-mono text-xs text-muted">
				macOS 14.6+ (Sonoma / Sequoia) · M1 Pro or newer MacBook required
			</p>

			<div class="stats-strip" aria-label="SlapMyMac at a glance">
				<div class="stat">
					<span class="stat-num">7</span>
					<span class="stat-label">voice packs</span>
				</div>
				<div class="stat-divider" aria-hidden="true"></div>
				<div class="stat">
					<span class="stat-num">130+</span>
					<span class="stat-label">sound clips</span>
				</div>
				<div class="stat-divider" aria-hidden="true"></div>
				<div class="stat">
					<span class="stat-num">5</span>
					<span class="stat-label">detection algorithms</span>
				</div>
				<div class="stat-divider" aria-hidden="true"></div>
				<div class="stat">
					<span class="stat-num">$2</span>
					<span class="stat-label">one‑time price</span>
				</div>
			</div>
		</section>

		<div class="mx-auto w-full max-w-2xl space-y-6 px-6 pb-20 relative z-10">
			<div class="card card--highlight">
				<h2 class="card-title flex items-center gap-3">
					<Heart class={iconLg} strokeWidth={2} />
					What is SlapMyMac? The Mac app with feelings
				</h2>
				<p class="card-body mt-3">
					<strong>SlapMyMac</strong> (a.k.a. <em>Slap My Mac</em>) is a native Mac menu bar app that
					reads your MacBook's built-in accelerometer and plays a hilarious voice reaction every
					time you slap it. The harder you slap, the louder it screams. No dock icon, no
					distraction — just a tiny app hiding in your menu bar with a very big attitude.
				</p>
				<p class="card-body mt-3">
					Built for <strong>Apple Silicon</strong> (M1 Pro and newer), optimized for macOS Sonoma
					and Sequoia. It's the funniest <strong>MacBook prank app</strong> you can install in under
					60 seconds.
				</p>
				<div class="relative mt-6 flex justify-center">
					<img src="{ASSET}/bar.webp" alt="SlapMyMac menu bar app on macOS showing the slap counter and voice pack selector" />
				</div>
				<ul class="feature-check mt-6">
					<li><CircleCheck class="h-4 w-4 text-primary shrink-0" strokeWidth={2} /> Native SwiftUI menu bar app — no Electron bloat</li>
					<li><CircleCheck class="h-4 w-4 text-primary shrink-0" strokeWidth={2} /> Reads the real MacBook accelerometer — not a fake gimmick</li>
					<li><CircleCheck class="h-4 w-4 text-primary shrink-0" strokeWidth={2} /> 7 voice packs + custom sound folders from your Mac</li>
					<li><CircleCheck class="h-4 w-4 text-primary shrink-0" strokeWidth={2} /> One-time $2 — no subscription, no ads, no tracking</li>
				</ul>
			</div>
		</div>

		<!-- <div class="video-strip mx-auto w-full max-w-2xl px-6 py-6 relative z-10">
			<a
				href="https://www.instagram.com/p/DV9BDmJjCBW/"
				target="_blank"
				rel="noopener noreferrer"
				class="video-card group"
			>
				<div class="video-inner">
					<img
						src="{ASSET}/thumbFirstVideo.jpg"
						alt="The viral video that started it all"
						class="video-img"
					/>
					<div class="play-btn">
						<Play class="h-6 w-6 play-ico" fill="currentColor" strokeWidth={2} />
					</div>
					<div class="video-cap">
						<p class="text-sm font-medium text-white">The viral video that started it all</p>
					</div>
				</div>
			</a>
			<div class="video-strip-connector">
				<svg
					class="h-6 w-10 text-muted"
					viewBox="0 0 40 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					aria-hidden="true"
				>
					<path d="M2 12 C8 4, 20 20, 32 12" />
					<polygon points="30,7 38,12 30,17" fill="currentColor" />
				</svg>
				<span class="text-xs text-muted whitespace-nowrap mt-1">2 days later</span>
			</div>
			<a
				href="https://www.instagram.com/p/DWHZek4DB-k/"
				target="_blank"
				rel="noopener noreferrer"
				class="video-card group"
			>
				<div class="video-inner">
					<img src="{ASSET}/thumbLaunchVideo.jpg" alt="App launch" class="video-img" />
					<div class="play-btn">
						<Play class="h-6 w-6 play-ico" fill="currentColor" strokeWidth={2} />
					</div>
					<div class="video-cap">
						<p class="text-sm font-medium text-white">App launch</p>
					</div>
				</div>
			</a>
		</div> -->

		<div class="mx-auto w-full max-w-2xl space-y-6 px-6 pb-20 relative z-10">
			<div class="card">
				<h2 class="card-title flex flex-wrap items-center gap-3">
					<Gauge class={iconLg} strokeWidth={2} />
					Lid Creak — turn your MacBook hinge into a haunted door
					<span class="badge-new">New</span>
				</h2>
				<p class="card-body mt-3">
					Open or close your MacBook lid and SlapMyMac plays a creaky wooden door — powered by the
					built-in lid angle sensor. Dramatic. Unnecessary. Essential.
				</p>
				<p class="mt-2 text-xs text-muted-60">
					Requires an M2 Pro or newer MacBook. Some models may not expose lid angle via IOKit.
				</p>
			</div>

			<div class="card">
				<h2 class="card-title flex items-center gap-3">
					<Usb class={iconLg} strokeWidth={2} />
					USB Moaner — your Mac reacts when you plug anything in
				</h2>
				<p class="card-body mt-3">
					Flip on USB Moaner mode and your MacBook reacts every time you plug or unplug a USB‑C
					device — including your <a href="/mac-sound-on-charger-connect-disconnect" class="link-inline">MagSafe or USB‑C charger</a>. Same 7 voice packs, zero slapping required. Perfect for
					the hot‑swap life.
				</p>
			</div>

			<div class="card">
				<h2 class="card-title flex items-center gap-3">
					<Music class={iconLg} strokeWidth={2} />
					7 voice packs · 130+ sound clips · your own custom packs
				</h2>
				<p class="card-body mt-3">
					130+ sound clips across 7 built-in voice packs, plus custom packs from your own audio folders.
					Your open-plan office will have questions.
				</p>
				<div class="mt-6 flex flex-col items-center space-y-4">
					<select bind:value={voiceId} class="voice-select" aria-label="Voice pack">
						{#each VOICE_PACKS as p}
							<option value={p.value}>{p.value}</option>
						{/each}
					</select>
					<div class="voice-preview">
						<button
							type="button"
							class="play-sample"
							aria-label="Play {currentPack().label} sample"
							onclick={playSample}
							disabled={playing}
						>
							<Play class="h-5 w-5 text-primary play-ico" fill="currentColor" strokeWidth={2} />
						</button>
						<div>
							<p class="text-sm font-medium text-card">
								{currentPack().emoji}
								{currentPack().label}
							</p>
							<p class="text-xs text-muted">{currentPack().desc}</p>
						</div>
					</div>
				</div>
			</div>

			<div class="card">
				<h2 class="card-title flex items-center gap-3">
					<SlidersHorizontal class={iconLg} strokeWidth={2} />
					Dial in your slap — sensitivity &amp; cooldown controls
				</h2>
				<div class="mt-6 space-y-8">
					<div class="space-y-3">
						<div class="flex items-center justify-between">
							<span class="text-sm font-medium text-card">Sensitivity</span>
							<span class="font-mono text-sm text-muted">{sensG()}g</span>
						</div>
						<div class="slider-wrap">
							<div class="slider-track">
								<div class="slider-range" style="width: {sens}%"></div>
								<div class="slider-thumb" style="left: {sens}%"></div>
							</div>
							<input
								type="range"
								min="0"
								max="100"
								bind:value={sens}
								class="slider-input"
								aria-label="Sensitivity"
							/>
						</div>
						<div class="flex justify-between text-xs text-muted">
							<span>Butterfly landing</span>
							<span>Full commitment</span>
						</div>
					</div>
					<div class="sep"></div>
					<div class="space-y-3">
						<div class="flex items-center justify-between">
							<span class="text-sm font-medium text-card">Cooldown</span>
							<span class="font-mono text-sm text-muted">{coolS()}s</span>
						</div>
						<div class="slider-wrap">
							<div class="slider-track">
								<div class="slider-range" style="width: {cool}%"></div>
								<div class="slider-thumb" style="left: {cool}%"></div>
							</div>
							<input
								type="range"
								min="0"
								max="100"
								bind:value={cool}
								class="slider-input"
								aria-label="Cooldown"
							/>
						</div>
						<div class="flex justify-between text-xs text-muted">
							<span>Rapid-fire heckling</span>
							<span>Dramatic pauses</span>
						</div>
					</div>
				</div>
			</div>

			<div class="card">
				<h2 class="card-title flex items-center gap-3">
					<LayoutGrid class={iconLg} strokeWidth={2} />
					Every feature in SlapMyMac for Mac
				</h2>
				<div class="mt-6 grid gap-5 sm:grid-cols-2">
					{#each FEATURE_GRID as f, i}
						{@const FeatureIcon = featureIcons[i]}
						<div class="flex items-start gap-3">
							<div class="icon-box">
								<FeatureIcon class={iconSm} strokeWidth={2} />
							</div>
							<div>
								<p class="text-sm font-medium text-card">{f.title}</p>
								<p class="text-xs leading-relaxed text-muted">{f.body}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="card">
				<h2 class="card-title flex items-center gap-3">
					<span class="text-2xl">🛣️</span>
					Roadmap
				</h2>
				<div class="mt-6">
					<div class="road-row">
						<div class="road-rail">
							<div class="road-dot road-dot--fill">
								<CircleCheck class="h-5 w-5" strokeWidth={2} />
							</div>
							<div class="road-line"></div>
						</div>
						<div class="road-body pb-8">
							<div class="flex flex-wrap items-center gap-x-2 gap-y-1">
								<p class="text-sm font-semibold text-card">
									Lid Creak, USB Moaner, independent modes & soundpacks
								</p>
								<span class="badge-ver">v1.2.0</span>
							</div>
							<p class="mt-1 text-xs leading-relaxed text-muted">
								Lid creak mode, USB trigger mode, decoupled soundpacks, settings overhaul, about
								page, and bug fixes.
							</p>
						</div>
					</div>
					<div class="road-row">
						<div class="road-rail">
							<div class="road-dot road-dot--fill">
								<CircleCheck class="h-5 w-5" strokeWidth={2} />
							</div>
							<div class="road-line"></div>
						</div>
						<div class="road-body pb-8">
							<div class="flex flex-wrap items-center gap-x-2 gap-y-1">
								<p class="text-sm font-semibold text-card">Custom sound packs</p>
								<span class="badge-ver">v1.3.0 — current</span>
							</div>
							<p class="mt-1 text-xs leading-relaxed text-muted">
								Roll your own packs in Settings: point SlapMyMac at a folder of audio files and wire
								them to slap, USB, lid creak, and the rest — alongside the built-in voice packs.
							</p>
						</div>
					</div>
					<div class="road-row">
						<div class="road-rail">
							<div class="road-dot road-dot--dash">
								<Cable class="h-5 w-5 text-muted" strokeWidth={2} />
							</div>
							<div class="road-line"></div>
						</div>
						<div class="road-body pb-8">
							<div class="flex flex-wrap items-center gap-x-2 gap-y-1">
								<p class="text-sm font-semibold text-card">Local MCP server</p>
								<span class="badge-muted">v1.4</span>
							</div>
							<p class="mt-1 text-xs leading-relaxed text-muted">
								Speak to SlapMyMac via MCP. Give your AI assistant some emotions.
							</p>
						</div>
					</div>
					<div class="ios-branch relative">
						<svg
							class="ios-svg"
							width="100"
							height="90"
							viewBox="0 0 100 90"
							fill="none"
							aria-hidden="true"
						>
							<path
								d="M20 0 L20 90"
								stroke="var(--border)"
								stroke-width="2"
								stroke-dasharray="4 3"
							/>
							<path
								d="M20 20 Q38 20, 56 45"
								stroke="var(--border)"
								stroke-width="2"
								stroke-dasharray="4 3"
							/>
						</svg>
						<div class="ios-content">
							<img
								src="{ASSET}/slapphoneIcon.jpg"
								alt="iOS version"
								class="h-20 w-20 shrink-0 rounded-full object-cover"
							/>
							<div>
								<div class="flex flex-wrap items-center gap-x-2 gap-y-1">
									<p class="text-sm font-semibold text-card">iOS version</p>
									<span class="badge-ios">ios app</span>
								</div>
								<p class="mt-1 text-xs leading-relaxed text-muted">
									Same energy, pocket-sized. Slap your iPhone and it fights back.
								</p>
							</div>
						</div>
					</div>
					<div class="mt-6 border-t border-default pt-6">
						<p class="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">Past releases</p>
						<div class="space-y-2">
							{#each PAST_RELEASES as r}
								<div class="flex items-baseline gap-2">
									<span class="shrink-0 font-mono text-[11px] text-muted">{r.v}</span>
									<span class="text-xs leading-relaxed text-muted">{r.text}</span>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>

			<div class="card nerdy-card">
				<button
					type="button"
					class="nerdy-trigger w-full flex items-start justify-between gap-3 text-left rounded-lg py-6 focus-ring border border-transparent"
					onclick={() => (nerdyOpen = !nerdyOpen)}
					aria-expanded={nerdyOpen}
				>
					<span class="flex items-center gap-3 text-xl font-semibold text-card">
						<Glasses class={iconLg} strokeWidth={2} />
						Nerdy tech details
					</span>
					{#if nerdyOpen}
						<ChevronUp class="h-4 w-4 text-muted shrink-0 mt-1" strokeWidth={2} />
					{:else}
						<ChevronDown class="h-4 w-4 text-muted shrink-0 mt-1" strokeWidth={2} />
					{/if}
				</button>
				{#if nerdyOpen}
					<div class="nerdy-inner pb-8 space-y-8">
						<div>
							<h3 class="text-sm font-semibold text-card">Wildly overengineered slap detection</h3>
							<p class="mt-2 text-[15px] leading-relaxed text-muted">
								Five concurrent signal processing algorithms vote on whether you actually slapped your
								laptop. Democracy, but for physical abuse.
							</p>
							<div class="mt-4 space-y-2">
								{#each NERDY_ALGORITHMS as algo, i}
									{@const AlgoIcon = algoIcons[i]}
									<div class="algo-row">
										<div class="algo-ico">
											<AlgoIcon class="h-4 w-4 text-primary" strokeWidth={2} />
										</div>
										<div>
											<p class="text-sm font-medium text-card">{algo.name}</p>
											<p class="text-xs text-muted">{algo.desc}</p>
										</div>
									</div>
								{/each}
							</div>
							<div class="mt-4 flex items-center justify-center gap-2 text-sm text-muted">
								<Zap class="h-4 w-4" strokeWidth={2} />
								<span
									>When enough algorithms agree → <span class="font-medium text-card"
										>sound plays</span
									></span
								>
							</div>
						</div>
						<div class="sep"></div>
						<div>
							<h3 class="text-sm font-semibold text-card">Architecture</h3>
							<p class="mt-2 text-[15px] leading-relaxed text-muted">
								Inspired by
								<a
									href="https://github.com/taigrr/spank"
									target="_blank"
									rel="noopener noreferrer"
									class="link-inline">taigrr/spank</a
								>
								(Go). Rebuilt in Swift.
							</p>
							<p class="mt-2 text-[15px] leading-relaxed text-muted">
								Lid angle detection uses
								<a
									href="https://github.com/samhenrigold/LidAngleSensor"
									target="_blank"
									rel="noopener noreferrer"
									class="link-inline">LidAngleSensor</a
								>
								by Sam Gold.
							</p>
							<pre class="code-block"><code
									>MenuBarExtra (SwiftUI)
  └─ SlapController
       ├─ AccelerometerReader  ← IOKit HID, ~12.5Hz
       ├─ LidAngleSensor       ← IOKit, lid angle detection
       ├─ SlapDetector         ← 5 algorithms vote
       ├─ USBWatcher           ← IOKit USB events
       ├─ AudioPlayer          ← AVFoundation
       └─ SettingsStore        ← UserDefaults</code
								></pre>
						</div>
					</div>
				{/if}
			</div>
		</div>

		<div class="mx-auto w-full max-w-2xl px-6 pb-20 relative z-10">
			<div class="card testimonials">
				<h2 class="card-title flex items-center gap-3">
					<span class="text-2xl">💬</span>
					What people are saying about SlapMyMac
				</h2>
				<div class="quote-grid mt-6">
					<figure class="quote">
						<blockquote>“I downloaded it as a joke. It's now a core part of my workflow.”</blockquote>
						<figcaption>— r/macapps</figcaption>
					</figure>
					<figure class="quote">
						<blockquote>“My coworkers have filed three complaints. 10/10.”</blockquote>
						<figcaption>— Reddit user</figcaption>
					</figure>
					<figure class="quote">
						<blockquote>“The most unhinged $2 I've ever spent on the Mac.”</blockquote>
						<figcaption>— Twitter</figcaption>
					</figure>
					<figure class="quote">
						<blockquote>“Finally, my MacBook has the emotional range I always knew it had.”</blockquote>
						<figcaption>— Instagram</figcaption>
					</figure>
				</div>
			</div>
		</div>

		<div class="cta-banner mx-auto max-w-2xl px-6 relative z-10 mb-20">
			<div class="cta-inner">
				<p class="cta-kicker">Get SlapMyMac now</p>
				<h2 class="cta-title">
					Slap your MacBook.<br />
					<span class="cta-title-accent">It screams back.</span>
				</h2>
				<p class="cta-sub">
					One-time $2. No subscription. No ads. No account. Works on every Apple Silicon MacBook
					from M1 Pro and newer, running macOS 14.6+ (Sonoma or Sequoia).
				</p>
				<div class="mt-6 flex items-center justify-center gap-4">
					<a
						href={DOWNLOAD_URL}
						class="btn-primary btn-primary--xl"
						onclick={() => trackDownloadClick('home_footer')}
					>
						<Download class="h-4 w-4" strokeWidth={2} />
						Download SlapMyMac — $2
					</a>
				</div>
				<p class="mt-4 text-xs text-muted">
					<span class="inline-block animate-wave origin-[70%_70%]">👋</span>
					Less than a burrito. More fun than your therapist.
				</p>
			</div>
		</div>

		<div
			id="faq"
			class="card faq-wrap mx-auto max-w-2xl px-6 scroll-mt-20 relative z-10 mb-16"
		>
			<h2 class="card-title flex items-center gap-3">
				<CircleQuestionMark class={iconLg} strokeWidth={2} />
				Frequently asked questions
			</h2>
			<div class="faq-list mt-4">
				{#each FAQ_ITEMS as item, i}
					<div class="faq-item" class:border-b={i < FAQ_ITEMS.length - 1}>
						<button
							type="button"
							class="faq-q focus-ring"
							onclick={() => (openFaq = openFaq === i ? null : i)}
							aria-expanded={openFaq === i}
						>
							<span>{item.q}</span>
							{#if openFaq === i}
								<ChevronUp class="h-4 w-4 text-muted shrink-0" strokeWidth={2} />
							{:else}
								<ChevronDown class="h-4 w-4 text-muted shrink-0" strokeWidth={2} />
							{/if}
						</button>
						{#if openFaq === i}
							<div class="faq-a text-sm text-muted">
								{item.a}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<!-- Explore more — internal linking for SEO + discovery -->
		<div class="mx-auto max-w-2xl px-6 pb-8 relative z-10">
			<nav class="explore" aria-label="Explore SlapMyMac">
				<p class="explore-title">Explore SlapMyMac</p>
				<div class="explore-grid">
					<a href="/features" class="explore-card">
						<span class="explore-emoji">🎛️</span>
						<span class="explore-name">All features</span>
						<span class="explore-desc">Slap detection, voice packs, controls &amp; algorithms</span>
					</a>
					<a href="/mac-sound-on-charger-connect-disconnect" class="explore-card">
						<span class="explore-emoji">🔌</span>
						<span class="explore-name">Charger sound</span>
						<span class="explore-desc">Play a sound when your MagSafe or USB‑C charger connects / disconnects</span>
					</a>
				</div>
			</nav>
		</div>

		<footer class="site-foot mx-auto max-w-2xl px-6 relative z-10">
			<div class="site-foot-nav">
				<a href="/" class="site-foot-link">Home</a>
				<span class="site-foot-dot">·</span>
				<a href="/features" class="site-foot-link">Features</a>
				<span class="site-foot-dot">·</span>
				<a href="/mac-sound-on-charger-connect-disconnect" class="site-foot-link">Charger sound</a>
				<span class="site-foot-dot">·</span>
				<a href="/#faq" class="site-foot-link">FAQ</a>
				<span class="site-foot-dot">·</span>
				<a href="/recover-license" class="site-foot-link">Recover license</a>
				<span class="site-foot-dot">·</span>
				<a href="/privacy" class="site-foot-link">Privacy</a>
				<span class="site-foot-dot">·</span>
				<a href="/terms" class="site-foot-link">Terms</a>
			</div>
			<p class="site-foot-copy">© {new Date().getFullYear()} SlapMyMac · Made for MacBooks with feelings</p>
		</footer>
	</div>
</div>

<style>
	.page-root {
		position: relative;
		width: 100%;
		min-height: 100vh;
	}
	.bg-canvas {
		display: none;
	}
	.shell {
		position: relative;
	}
	.hero-logo-outer {
		display: flex;
		justify-content: center;
		width: 100%;
	}
	/* Kill UA button chrome (was showing as white fill + border around the SVG) */
	.logo-btn {
		appearance: none;
		-webkit-appearance: none;
		margin: 0;
		padding: 0;
		border: none;
		background: transparent;
		box-shadow: none;
		cursor: pointer;
		line-height: 0;
		color: inherit;
	}
	.logo-btn:focus {
		outline: none;
	}
	.logo-btn:focus-visible {
		outline: 2px solid var(--ring);
		outline-offset: 6px;
		border-radius: 0.75rem;
	}
	/* viewBox 400×340 — match aspect so the mark isn’t squeezed into a square */
	.hero-logo-box {
		width: min(22.5rem, calc(100vw - 2rem));
		max-width: 400px;
		aspect-ratio: 400 / 340;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: none;
		box-shadow: none;
	}
	.hero-logo-img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center;
		display: block;
		background: transparent;
		border: none;
		box-shadow: none;
	}
	.nav-link {
		font-size: 0.75rem;
		color: var(--muted-foreground);
		white-space: nowrap;
		transition: color 0.15s;
	}
	@media (min-width: 640px) {
		.nav-link {
			font-size: 0.875rem;
		}
	}
	.nav-link:hover {
		color: var(--foreground);
	}
	.theme-btn {
		display: flex;
		height: 1.75rem;
		width: 1.75rem;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		border: 1px solid var(--border);
		background: transparent;
		color: var(--muted-foreground);
		cursor: pointer;
		transition:
			color 0.15s,
			border-color 0.15s;
		flex-shrink: 0;
	}
	@media (min-width: 640px) {
		.theme-btn {
			height: 2rem;
			width: 2rem;
		}
	}
	.theme-btn:hover {
		color: var(--foreground);
		border-color: color-mix(in oklab, var(--foreground) 30%, transparent);
	}
	.recover {
		border-radius: 9999px;
		border: 1px solid var(--border);
		padding: 0.25rem 0.75rem;
		font-size: 0.75rem;
		color: var(--muted-foreground);
		white-space: nowrap;
		transition:
			color 0.15s,
			border-color 0.15s;
	}
	@media (min-width: 640px) {
		.recover {
			padding: 0.375rem 1rem;
			font-size: 0.875rem;
		}
	}
	.recover:hover {
		color: var(--foreground);
		border-color: color-mix(in oklab, var(--foreground) 30%, transparent);
	}
	.hero {
		position: relative;
	}
	.hero-pulse {
		position: absolute;
		top: 6rem;
		left: 50%;
		transform: translateX(-50%);
		width: 32rem;
		height: 32rem;
		max-width: 90vw;
		max-height: 90vw;
		pointer-events: none;
		background:
			radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--primary) 22%, transparent) 0%, transparent 60%),
			conic-gradient(from 0deg at 50% 50%, color-mix(in oklab, var(--primary) 14%, transparent), color-mix(in oklab, var(--ring) 8%, transparent), color-mix(in oklab, var(--primary) 14%, transparent));
		filter: blur(60px);
		opacity: 0.55;
		z-index: -1;
		animation: pulseGlow 6s ease-in-out infinite;
	}
	@keyframes pulseGlow {
		0%, 100% { opacity: 0.45; transform: translateX(-50%) scale(1); }
		50% { opacity: 0.7; transform: translateX(-50%) scale(1.08); }
	}
	.hero-sticker-row {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}
	.sticker {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.3rem 0.7rem;
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		border-radius: 9999px;
		border: 1px solid var(--border);
		background: var(--card);
		color: var(--card-foreground);
		box-shadow: 0 2px 4px color-mix(in oklab, var(--foreground) 6%, transparent);
		transform: rotate(-1deg);
		transition: transform 0.2s ease;
	}
	.sticker:nth-child(2) { transform: rotate(1.5deg); }
	.sticker:nth-child(3) { transform: rotate(-0.8deg); }
	.sticker:hover { transform: rotate(0) scale(1.06); }
	.sticker--green {
		background: color-mix(in oklab, var(--primary) 12%, var(--card));
		border-color: color-mix(in oklab, var(--primary) 35%, var(--border));
		color: color-mix(in oklab, var(--primary) 80%, var(--foreground));
	}
	.sticker--amber {
		background: color-mix(in oklab, #f59e0b 14%, var(--card));
		border-color: color-mix(in oklab, #f59e0b 35%, var(--border));
		color: color-mix(in oklab, #b45309 60%, var(--foreground));
	}
	.sticker--blue {
		background: color-mix(in oklab, #3b82f6 12%, var(--card));
		border-color: color-mix(in oklab, #3b82f6 35%, var(--border));
		color: color-mix(in oklab, #1d4ed8 60%, var(--foreground));
	}
	.hero-logo-box {
		position: relative;
	}
	.hero-logo-glow {
		position: absolute;
		inset: 10%;
		border-radius: 50%;
		background: radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--primary) 40%, transparent), transparent 70%);
		filter: blur(40px);
		z-index: -1;
		animation: pulseGlow 4s ease-in-out infinite;
	}
	.hero-title {
		font-size: 3rem;
		line-height: 1;
		font-weight: 800;
		letter-spacing: -0.03em;
		color: var(--foreground);
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.4rem;
	}
	.hero-title-brand {
		font-size: 1em;
		background: linear-gradient(135deg, var(--primary) 0%, var(--ring) 60%, color-mix(in oklab, var(--primary) 80%, var(--foreground)) 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		color: transparent;
		line-height: 0.95;
	}
	.hero-title-tag {
		font-size: 0.38em;
		font-weight: 600;
		color: var(--muted-foreground);
		letter-spacing: 0;
		line-height: 1.2;
	}
	@media (min-width: 640px) {
		.hero-title { font-size: 4rem; }
	}
	.hero-sub {
		margin-top: 1.25rem;
		max-width: 32rem;
		text-align: center;
		font-size: 1.05rem;
		line-height: 1.6;
		color: var(--muted-foreground);
	}
	.hero-sub strong {
		color: var(--foreground);
		font-weight: 600;
	}
	.btn-primary--xl {
		height: 3.25rem;
		padding: 0 1.75rem;
		font-size: 0.95rem;
		font-weight: 600;
		letter-spacing: 0.01em;
		box-shadow: 0 8px 24px color-mix(in oklab, var(--primary) 35%, transparent);
		transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
	}
	.btn-primary--xl:hover {
		transform: translateY(-2px);
		box-shadow: 0 12px 28px color-mix(in oklab, var(--primary) 45%, transparent);
	}
	.stats-strip {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		flex-wrap: wrap;
		margin-top: 2.5rem;
		padding: 1rem 1.5rem;
		border-radius: 1rem;
		border: 1px solid var(--border);
		background: color-mix(in oklab, var(--card) 80%, transparent);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
	}
	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.15rem;
		min-width: 4.5rem;
	}
	.stat-num {
		font-family: var(--font-mono);
		font-size: 1.2rem;
		font-weight: 700;
		color: var(--primary);
		letter-spacing: -0.02em;
	}
	.stat-label {
		font-size: 0.65rem;
		color: var(--muted-foreground);
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}
	.stat-divider {
		width: 1px;
		height: 1.75rem;
		background: var(--border);
	}
	@media (max-width: 520px) {
		.stat-divider { display: none; }
	}
	.card--highlight {
		position: relative;
		background: linear-gradient(135deg, var(--card) 0%, color-mix(in oklab, var(--primary) 4%, var(--card)) 100%);
		border: 1px solid color-mix(in oklab, var(--primary) 20%, var(--border));
	}
	.card--highlight::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		border-radius: 1rem 1rem 0 0;
		background: linear-gradient(90deg, var(--primary), var(--ring), var(--primary));
		background-size: 200% 100%;
		animation: shimmer 4s linear infinite;
	}
	@keyframes shimmer {
		0% { background-position: 0% 50%; }
		100% { background-position: 200% 50%; }
	}
	.feature-check {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}
	.feature-check li {
		display: flex;
		align-items: flex-start;
		gap: 0.55rem;
		font-size: 0.9rem;
		color: var(--muted-foreground);
		line-height: 1.5;
	}
	.hero-sub em {
		font-style: normal;
		color: var(--foreground);
		font-weight: 500;
	}
	.testimonials .quote-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}
	@media (min-width: 640px) {
		.testimonials .quote-grid {
			grid-template-columns: 1fr 1fr;
		}
	}
	.quote {
		margin: 0;
		padding: 1rem 1.15rem;
		border-radius: 0.85rem;
		background: var(--muted);
		border-left: 3px solid var(--primary);
	}
	.quote blockquote {
		margin: 0;
		font-size: 0.9rem;
		line-height: 1.5;
		color: var(--card-foreground);
		font-style: italic;
	}
	.quote figcaption {
		margin-top: 0.5rem;
		font-size: 0.7rem;
		font-weight: 600;
		color: var(--muted-foreground);
		letter-spacing: 0.02em;
	}
	.cta-banner {
		border-radius: 1.5rem;
		padding: 2.75rem 2rem;
		background:
			radial-gradient(circle at 20% 0%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%),
			radial-gradient(circle at 80% 100%, color-mix(in oklab, var(--ring) 14%, transparent), transparent 60%),
			var(--card);
		border: 1px solid color-mix(in oklab, var(--primary) 25%, var(--border));
		box-shadow:
			0 20px 60px color-mix(in oklab, var(--primary) 18%, transparent),
			0 4px 12px color-mix(in oklab, var(--foreground) 6%, transparent);
		text-align: center;
	}
	.cta-kicker {
		display: inline-block;
		padding: 0.3rem 0.75rem;
		border-radius: 9999px;
		background: color-mix(in oklab, var(--primary) 15%, transparent);
		color: var(--primary);
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 1rem;
	}
	.cta-title {
		font-size: 2rem;
		font-weight: 800;
		line-height: 1.15;
		letter-spacing: -0.025em;
		color: var(--foreground);
		margin: 0;
	}
	@media (min-width: 640px) {
		.cta-title { font-size: 2.5rem; }
	}
	.cta-title-accent {
		background: linear-gradient(135deg, var(--primary), var(--ring));
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		color: transparent;
	}
	.cta-sub {
		max-width: 30rem;
		margin: 1rem auto 0;
		font-size: 0.95rem;
		line-height: 1.6;
		color: var(--muted-foreground);
	}
	.explore {
		padding: 1.5rem 0 0.5rem;
	}
	.explore-title {
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--muted-foreground);
		margin: 0 0 0.85rem;
		text-align: center;
	}
	.explore-grid {
		display: grid;
		gap: 0.75rem;
		grid-template-columns: 1fr;
	}
	@media (min-width: 560px) {
		.explore-grid { grid-template-columns: 1fr 1fr; }
	}
	.explore-card {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 1.1rem 1.2rem;
		border-radius: 0.95rem;
		border: 1px solid var(--border);
		background: var(--card);
		text-decoration: none;
		transition: border-color 0.18s, transform 0.18s, box-shadow 0.18s;
	}
	.explore-card:hover {
		border-color: color-mix(in oklab, var(--primary) 40%, var(--border));
		transform: translateY(-2px);
		box-shadow: 0 8px 20px color-mix(in oklab, var(--primary) 12%, transparent);
	}
	.explore-emoji {
		font-size: 1.25rem;
		line-height: 1;
		margin-bottom: 0.2rem;
	}
	.explore-name {
		font-size: 0.92rem;
		font-weight: 700;
		color: var(--card-foreground);
	}
	.explore-desc {
		font-size: 0.78rem;
		line-height: 1.5;
		color: var(--muted-foreground);
	}
	.site-foot {
		padding: 2rem 1.5rem 2.5rem;
		text-align: center;
		color: var(--muted-foreground);
	}
	.site-foot-nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 0.4rem;
		margin-bottom: 0.75rem;
	}
	.site-foot-link {
		font-size: 0.78rem;
		color: var(--muted-foreground);
		text-decoration: none;
		transition: color 0.15s;
	}
	.site-foot-link:hover { color: var(--foreground); }
	.site-foot-dot { font-size: 0.7rem; opacity: 0.5; }
	.site-foot-copy {
		margin: 0;
		font-size: 0.7rem;
		opacity: 0.7;
	}
	.font-mono {
		font-family: var(--font-mono);
	}
	.btn-primary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.375rem;
		height: 2.75rem;
		padding: 0 1.5rem;
		border-radius: 9999px;
		font-size: 0.875rem;
		font-weight: 500;
		background: var(--primary);
		color: var(--primary-foreground);
		border: 1px solid transparent;
		transition:
			background 0.15s,
			transform 0.05s;
	}
	.btn-primary:hover {
		background: color-mix(in oklab, var(--primary) 80%, black);
	}
	.btn-primary:active {
		transform: translateY(1px);
	}
	.card {
		border-radius: 1rem;
		border: 1px solid var(--border);
		background: var(--card);
		padding: 2rem;
		box-shadow:
			0 4px 12px color-mix(in oklab, var(--foreground) 6%, transparent),
			0 1px 2px -1px color-mix(in oklab, var(--foreground) 6%, transparent);
	}
	:global(html.dark) .card {
		box-shadow:
			0 6px 20px color-mix(in oklab, #000 45%, transparent),
			0 1px 2px -1px color-mix(in oklab, #000 45%, transparent);
	}
	.card-title {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--card-foreground);
	}
	.card-body {
		font-size: 15px;
		line-height: 1.625;
		color: var(--muted-foreground);
	}
	.badge-new {
		border-radius: 9999px;
		background: color-mix(in oklab, var(--primary) 15%, transparent);
		padding: 0.125rem 0.5rem;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--primary);
	}
	/* One horizontal row: two reels + connector (matches slapmac.com layout) */
	.video-strip {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;
	}
	.video-strip-connector {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		padding: 0 0.5rem;
	}
	.video-card {
		display: block;
		flex: 1 1 0;
		min-width: 0;
		width: auto;
		max-width: 100%;
		border-radius: 1rem;
		overflow: hidden;
		box-shadow:
			0 4px 12px color-mix(in oklab, var(--foreground) 6%, transparent),
			0 1px 2px -1px color-mix(in oklab, var(--foreground) 6%, transparent);
	}
	.video-inner {
		position: relative;
		aspect-ratio: 9 / 16;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.video-img {
		position: absolute;
		inset: 0;
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
	.play-btn {
		position: relative;
		z-index: 10;
		display: flex;
		height: 3.5rem;
		width: 3.5rem;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		background: color-mix(in oklab, var(--foreground) 80%, transparent);
		color: var(--background);
		transition: transform 0.15s;
	}
	.group:hover .play-btn {
		transform: scale(1.1);
	}
	:global(.play-ico) {
		margin-left: 2px;
	}
	.video-cap {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 10;
		background: rgb(0 0 0 / 0.5);
		padding: 0.5rem 0.75rem;
		text-align: center;
	}
	.voice-select {
		display: flex;
		width: 100%;
		max-width: 18rem;
		height: 2rem;
		align-items: center;
		border-radius: 0.75rem;
		border: 1px solid var(--input);
		background: color-mix(in oklab, var(--input) 30%, transparent);
		padding: 0 0.625rem;
		font-size: 0.875rem;
		color: var(--foreground);
		outline: none;
	}
	:global(html:not(.dark)) .voice-select {
		background: transparent;
	}
	.voice-preview {
		display: flex;
		width: 100%;
		max-width: 18rem;
		align-items: center;
		gap: 0.75rem;
		border-radius: 0.75rem;
		background: color-mix(in oklab, var(--muted) 50%, transparent);
		padding: 1rem;
	}
	.play-sample {
		display: flex;
		height: 3rem;
		width: 3rem;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		border: none;
		background: color-mix(in oklab, var(--primary) 15%, transparent);
		cursor: pointer;
		transition: background 0.15s;
	}
	.play-sample:hover:not(:disabled) {
		background: color-mix(in oklab, var(--primary) 25%, transparent);
	}
	.play-sample:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	.slider-wrap {
		position: relative;
		display: flex;
		width: 100%;
		touch-action: none;
		align-items: center;
		user-select: none;
		height: 1.5rem;
	}
	.slider-input {
		position: absolute;
		left: 0;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 100%;
		height: 1.5rem;
		margin: 0;
		opacity: 0;
		cursor: pointer;
	}
	.slider-track {
		position: relative;
		height: 0.5rem;
		width: 100%;
		border-radius: 9999px;
		background: var(--muted);
		cursor: pointer;
	}
	.slider-range {
		position: absolute;
		height: 100%;
		border-radius: 9999px;
		background: var(--primary);
	}
	.slider-thumb {
		position: absolute;
		top: 50%;
		height: 0.75rem;
		width: 0.75rem;
		border-radius: 9999px;
		border: 1px solid var(--ring);
		background: #fff;
		transform: translate(-50%, -50%);
		box-shadow: 0 0 0 3px color-mix(in oklab, var(--ring) 50%, transparent);
		pointer-events: none;
	}
	.sep {
		height: 1px;
		width: 100%;
		background: var(--border);
	}
	.icon-box {
		display: flex;
		height: 2.25rem;
		width: 2.25rem;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		border-radius: 0.75rem;
		background: var(--muted);
	}
	.road-row {
		display: flex;
		gap: 1rem;
	}
	.road-rail {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.road-dot {
		display: flex;
		height: 2.5rem;
		width: 2.5rem;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
	}
	.road-dot--fill {
		background: var(--primary);
		color: var(--primary-foreground);
	}
	.road-dot--dash {
		border: 2px dashed var(--border);
		background: var(--card);
	}
	.road-line {
		width: 2px;
		flex: 1;
		min-height: 1rem;
		background: var(--border);
	}
	.road-body {
		flex: 1;
	}
	.badge-ver {
		border-radius: 9999px;
		background: color-mix(in oklab, var(--primary) 15%, transparent);
		padding: 0.125rem 0.5rem;
		font-size: 10px;
		font-weight: 600;
		color: var(--primary);
		white-space: nowrap;
	}
	.badge-muted {
		border-radius: 9999px;
		background: var(--muted);
		padding: 0.125rem 0.5rem;
		font-size: 10px;
		font-weight: 500;
		color: var(--muted-foreground);
		white-space: nowrap;
	}
	.badge-soon {
		border-radius: 9999px;
		background: color-mix(in oklab, var(--primary) 10%, transparent);
		padding: 0.125rem 0.5rem;
		font-size: 10px;
		font-weight: 500;
		color: var(--primary);
		white-space: nowrap;
	}
	.badge-ios {
		border-radius: 9999px;
		border: 1px solid color-mix(in oklab, var(--primary) 30%, transparent);
		background: color-mix(in oklab, var(--primary) 5%, transparent);
		padding: 0.125rem 0.5rem;
		font-size: 10px;
		font-weight: 600;
		color: color-mix(in oklab, var(--primary) 70%, transparent);
		white-space: nowrap;
	}
	.ios-branch {
		padding-left: 0;
	}
	.ios-svg {
		position: absolute;
		top: 0;
		left: 0;
		pointer-events: none;
	}
	.ios-content {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding-left: 3.5rem;
		padding-top: 1.25rem;
		position: relative;
	}
	.nerdy-card {
		padding-top: 0;
		padding-bottom: 0;
	}
	.nerdy-trigger {
		background: transparent;
		cursor: pointer;
	}
	.algo-row {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		border-radius: 0.75rem;
		background: var(--muted);
		padding: 0.75rem;
	}
	.algo-ico {
		display: flex;
		height: 2rem;
		width: 2rem;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		border-radius: 0.5rem;
		background: var(--accent);
	}
	.code-block {
		margin-top: 1rem;
		overflow-x: auto;
		border-radius: 0.75rem;
		background: var(--foreground);
		padding: 1.25rem;
		font-size: 13px;
		line-height: 1.625;
		color: var(--background);
	}
	.code-block code {
		font-family: var(--font-mono);
		white-space: pre;
	}
	.link-inline {
		font-weight: 500;
		color: var(--foreground);
		text-decoration: underline;
		text-underline-offset: 4px;
	}
	.link-inline:hover {
		color: var(--primary);
	}
	.faq-wrap {
		margin-bottom: 0;
	}
	.faq-item.border-b {
		border-bottom: 1px solid var(--border);
	}
	.faq-q {
		display: flex;
		width: 100%;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.5rem;
		padding: 0.625rem 0;
		text-align: left;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--card-foreground);
		background: transparent;
		border: none;
		cursor: pointer;
		border-radius: 0.5rem;
	}
	.faq-a {
		padding-bottom: 1rem;
	}
	.link-foot {
		text-decoration: underline;
		text-underline-offset: 4px;
	}
	.link-foot:hover {
		color: var(--foreground);
	}
	.space-y-2 > :global(* + *) {
		margin-top: 0.5rem;
	}
	.space-y-6 > :global(* + *) {
		margin-top: 1.5rem;
	}
	.space-y-8 > :global(* + *) {
		margin-top: 2rem;
	}
	.space-y-4 > :global(* + *) {
		margin-top: 1rem;
	}
	.space-y-3 > :global(* + *) {
		margin-top: 0.75rem;
	}
	.flex {
		display: flex;
	}
	@media (min-width: 640px) {
		.sm\:flex-row {
			flex-direction: row;
		}
		.sm\:justify-evenly {
			justify-content: space-evenly;
		}
	}
	.items-center {
		align-items: center;
	}
	.items-start {
		align-items: flex-start;
	}
	.items-baseline {
		align-items: baseline;
	}
	.justify-center {
		justify-content: center;
	}
	.justify-between {
		justify-content: space-between;
	}
	.flex-col {
		flex-direction: column;
	}
	.flex-wrap {
		flex-wrap: wrap;
	}
	.shrink-0 {
		flex-shrink: 0;
	}
	.gap-2 {
		gap: 0.5rem;
	}
	.gap-3 {
		gap: 0.75rem;
	}
	.gap-4 {
		gap: 1rem;
	}
	.gap-x-2 {
		column-gap: 0.5rem;
	}
	.gap-y-1 {
		row-gap: 0.25rem;
	}
	.text-center {
		text-align: center;
	}
	.text-left {
		text-align: left;
	}
	.text-sm {
		font-size: 0.875rem;
	}
	.text-xs {
		font-size: 0.75rem;
	}
	.text-2xl {
		font-size: 1.5rem;
	}
	.text-lg {
		font-size: 1.125rem;
	}
	.font-medium {
		font-weight: 500;
	}
	.font-semibold {
		font-weight: 600;
	}
	.leading-relaxed {
		line-height: 1.625;
	}
	.uppercase {
		text-transform: uppercase;
	}
	.tracking-wider {
		letter-spacing: 0.05em;
	}
	.whitespace-nowrap {
		white-space: nowrap;
	}
	.mt-1 {
		margin-top: 0.25rem;
	}
	.mt-2 {
		margin-top: 0.5rem;
	}
	.mt-3 {
		margin-top: 0.75rem;
	}
	.mt-4 {
		margin-top: 1rem;
	}
	.mt-5 {
		margin-top: 1.25rem;
	}
	.mt-6 {
		margin-top: 1.5rem;
	}
	.mt-20 {
		margin-top: 5rem;
	}
	.mb-2 {
		margin-bottom: 0.5rem;
	}
	.mb-3 {
		margin-bottom: 0.75rem;
	}
	.mr-auto {
		margin-right: auto;
	}
	.mx-auto {
		margin-left: auto;
		margin-right: auto;
	}
	.pb-8 {
		padding-bottom: 2rem;
	}
	.pb-20 {
		padding-bottom: 5rem;
	}
	.pt-6 {
		padding-top: 1.5rem;
	}
	.pt-0 {
		padding-top: 0;
	}
	.px-4 {
		padding-left: 1rem;
		padding-right: 1rem;
	}
	.px-6 {
		padding-left: 1.5rem;
		padding-right: 1.5rem;
	}
	.py-4 {
		padding-top: 1rem;
		padding-bottom: 1rem;
	}
	.py-6 {
		padding-top: 1.5rem;
		padding-bottom: 1.5rem;
	}
	.py-8 {
		padding-top: 2rem;
		padding-bottom: 2rem;
	}
	.py-12 {
		padding-top: 3rem;
		padding-bottom: 3rem;
	}
	.py-16 {
		padding-top: 4rem;
		padding-bottom: 4rem;
	}
	@media (min-width: 640px) {
		.sm\:px-6 {
			padding-left: 1.5rem;
			padding-right: 1.5rem;
		}
		.sm\:gap-3 {
			gap: 0.75rem;
		}
		.sm\:gap-0 {
			gap: 0;
		}
		.sm\:mt-0 {
			margin-top: 0;
		}
	}
	.w-full {
		width: 100%;
	}
	.max-w-2xl {
		max-width: 42rem;
	}
	.h-20 {
		height: 5rem;
	}
	.w-20 {
		width: 5rem;
	}
	.object-contain {
		object-fit: contain;
	}
	.object-cover {
		object-fit: cover;
	}
	.rounded-full {
		border-radius: 9999px;
	}
	.scroll-mt-20 {
		scroll-margin-top: 5rem;
	}
	.relative {
		position: relative;
	}
	.absolute {
		position: absolute;
	}
	.inset-0 {
		inset: 0;
	}
	.z-10 {
		z-index: 10;
	}
	.pointer-events-none {
		pointer-events: none;
	}
	.overflow-hidden {
		overflow: hidden;
	}
	.select-none {
		user-select: none;
	}
	.origin-\[70\%_70\%\] {
		transform-origin: 70% 70%;
	}
	.grid {
		display: grid;
	}
	@media (min-width: 640px) {
		.sm\:grid-cols-2 {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	.gap-5 {
		gap: 1.25rem;
	}
	.border-t {
		border-top: 1px solid var(--border);
	}
	.mb-16 {
		margin-bottom: 4rem;
	}
</style>
