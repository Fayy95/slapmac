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
		Gauge,
		Glasses,
		Hand,
		Heart,
		LayoutGrid,
		Mic,
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
	import SeoHead from '$lib/seo/SeoHead.svelte';
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

	const featureIcons = [Hand, Volume2, Gauge, Timer, Usb, MonitorSmartphone, ChartColumn, AudioLines];
</script>

<SeoHead
	title="SlapMac — Slap your MacBook. It talks back."
	keywords="SlapMac, MacBook, macOS, menu bar app, accelerometer, USB moaner, lid creak, Mac humor, Sonoma, Apple Silicon"
	structuredData={buildHomepageJsonLd()}
/>

<div class="page-root">
	<div class="bg-canvas" aria-hidden="true"></div>
	<div class="shell flex min-h-screen flex-col relative">
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<div class="light-rays-container"></div>
		</div>

		<nav class="nav flex w-full items-center gap-2 sm:gap-3 px-4 sm:px-6 py-4 relative z-10">
			<a href="/discount" class="nav-link">Save 50%</a>
			<a href="#faq" class="nav-link mr-auto">FAQ</a>
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
			<a
				href="https://polar.sh/tonnoz-services/portal"
				target="_blank"
				rel="noopener noreferrer"
				class="recover"
			>
				Recover Key
			</a>
		</nav>

		<section class="hero flex flex-col items-center px-6 pt-0 pb-20 relative z-10">
			<div class="relative -mt-6 sm:mt-0 mb-2 hero-logo-outer">
				{#key slapKey}
					<button
						type="button"
						class="logo-btn"
						onclick={() => slapKey++}
						aria-label="Animate SlapMac logo"
					>
						<div class="hero-logo-box">
							<img
								src="/slapmac_logo_no_text.svg"
								alt="SlapMac logo — laptop with expressive screen"
								draggable="false"
								class="hero-logo-img animate-slap select-none"
							/>
						</div>
					</button>
				{/key}
			</div>
			<h1 class="hero-title">SlapMac</h1>
			<p class="hero-sub">
				Slap your MacBook. It screams back.<br />
				That's it. That's the app.
			</p>
			<div class="mt-4 flex items-center gap-4">
				<a href={DOWNLOAD_URL} class="btn-primary">
					<Download class="h-4 w-4" strokeWidth={2} />
					Download for Mac
				</a>
			</div>
			<p class="hero-meta mt-5 font-mono text-xs text-muted">
				macOS 14.6+ (Sonoma) · M1PRO+ MacBook required
			</p>
		</section>

		<div class="mx-auto w-full max-w-2xl space-y-6 px-6 pb-20 relative z-10">
			<a href="/discount" class="reel-banner">
				<span class="text-2xl">🎬</span>
				<span>
					<span class="font-semibold text-card">Make a reel, get SlapMac for free.</span>
					<span class="text-sm text-muted"> See how it works ➡️</span>
				</span>
			</a>

			<div class="card">
				<h2 class="card-title flex items-center gap-3">
					<Heart class={iconLg} strokeWidth={2} />
					Your laptop has feelings now
				</h2>
				<p class="card-body mt-3">
					SlapMac hides in your menu bar. Slap your MacBook and it screams back, with volume
					proportional to your force.
				</p>
				<div class="relative mt-6 flex justify-center">
					<img src="{ASSET}/bar.webp" alt="SlapMac menu bar showing slap counter" />
				</div>
			</div>
		</div>

		<div class="video-strip mx-auto w-full max-w-2xl px-6 py-6 relative z-10">
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
		</div>

		<div class="mx-auto w-full max-w-2xl space-y-6 px-6 pb-20 relative z-10">
			<div class="card">
				<h2 class="card-title flex flex-wrap items-center gap-3">
					<Gauge class={iconLg} strokeWidth={2} />
					Lid Creak
					<span class="badge-new">New</span>
				</h2>
				<p class="card-body mt-3">
					Open or close your lid and it creaks like an old wooden door.
				</p>
				<p class="mt-2 text-xs text-muted-60">
					Requires an M2PRO+ MacBook. Some models may not work due to hardware compatibility.
				</p>
			</div>

			<div class="card">
				<h2 class="card-title flex items-center gap-3">
					<Usb class={iconLg} strokeWidth={2} />
					USB Moaner
				</h2>
				<p class="card-body mt-3">
					Enable USB Moaner mode and your MacBook reacts every time you plug or unplug a USB device.
					Same voice packs but no slapping required.
				</p>
			</div>

			<div class="card">
				<h2 class="card-title flex items-center gap-3">
					<Music class={iconLg} strokeWidth={2} />
					Seven moods of protest
				</h2>
				<p class="card-body mt-3">
					130+ sound clips across 7 voice packs. Your open-plan office will have questions.
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
					Dial in your slap
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
					Also, it does these things
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
								<span class="badge-ver">v1.2.0 — current</span>
							</div>
							<p class="mt-1 text-xs leading-relaxed text-muted">
								Lid creak mode, USB trigger mode, decoupled soundpacks, settings overhaul, about
								page, and bug fixes.
							</p>
						</div>
					</div>
					<div class="road-row">
						<div class="road-rail">
							<div class="road-dot road-dot--dash">
								<Mic class="h-5 w-5 text-muted" strokeWidth={2} />
							</div>
							<div class="road-line"></div>
						</div>
						<div class="road-body pb-8">
							<div class="flex flex-wrap items-center gap-x-2 gap-y-1">
								<p class="text-sm font-semibold text-card">Custom sound packs</p>
								<span class="badge-muted">v1.3</span>
								<span class="badge-soon">coming soon</span>
							</div>
							<p class="mt-1 text-xs leading-relaxed text-muted">
								Add your own sounds. Record your voice, your cat, your boss — whatever you want your
								MacBook to scream.
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
								<span class="badge-muted">v1.3</span>
							</div>
							<p class="mt-1 text-xs leading-relaxed text-muted">
								Speak to SlapMac via MCP. Give your AI assistant some emotions.
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

		<div class="flex flex-col items-center py-12 text-center px-6 relative z-10">
			<p class="mt-20 font-medium text-card">
				<span class="inline-block animate-wave origin-[70%_70%]">👋</span>
				$7. Less than a burrito. More fun than your therapist.
			</p>
			<p class="mt-2 text-sm text-muted">
				Requires an M1PRO+ MacBook and a willingness to hit expensive things.
			</p>
			<div class="mt-6 flex items-center gap-4">
				<a href={DOWNLOAD_URL} class="btn-primary">
					<Download class="h-4 w-4" strokeWidth={2} />
					Download for Mac
				</a>
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
								{#if item.aHtml}
									Yes! Make a Reel about SlapMac, tag @tonnozfpv and add #slapmac. Hit 2,000 views
									and we'll refund you.
									<a href="/discount" class="link-inline">See how it works →</a>
								{:else}
									{item.a}
								{/if}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<div class="flex flex-col items-center gap-4 px-6 py-16 relative z-10">
			<p class="font-mono text-sm text-muted">
				Built with Amore <span class="text-lg">🫦</span>
			</p>
			<a href="https://amore.computer" target="_blank" rel="noopener noreferrer">
				<img src="{ASSET}/amore.webp" alt="Amore" class="h-20 w-20 object-contain mx-auto" />
			</a>
		</div>

		<footer class="border-t border-default px-6 py-8 relative z-10">
			<div
				class="mx-auto flex max-w-2xl flex-col items-center gap-4 sm:gap-0 text-center text-xs text-muted sm:flex-row sm:justify-evenly"
			>
				<span
					>built with 👋 by
					<a
						href="https://instagram.com/tonnozfpv"
						target="_blank"
						rel="noopener noreferrer"
						class="link-foot">tonnoz</a
					></span
				>
				<a href="/discount" class="link-foot">Creator Discount</a>
				<a href="/privacy" class="link-foot">Privacy</a>
				<a href="/terms" class="link-foot">Terms</a>
				<span
					>Check out also:
					<a
						href="https://routesketcher.com"
						target="_blank"
						rel="noopener noreferrer"
						class="link-foot">RouteSketcher</a
					></span
				>
			</div>
			<div class="mx-auto mt-4 max-w-2xl text-center text-[10px] leading-relaxed text-muted-60">
				<p>© 2026 SlapMac. All rights reserved.</p>
				<p class="mt-1">
					The SlapMac name, logo, brand colors, visual design, and all website content are the exclusive
					intellectual property of their owner. Unauthorized reproduction, copying, or imitation in any
					form is strictly prohibited.
				</p>
			</div>
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
	.hero-title {
		font-size: 3rem;
		line-height: 1;
		font-weight: 700;
		letter-spacing: -0.025em;
		color: var(--foreground);
	}
	.hero-sub {
		margin-top: 1.25rem;
		max-width: 28rem;
		text-align: center;
		font-size: 1.125rem;
		line-height: 1.625;
		color: var(--muted-foreground);
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
	.reel-banner {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		border-radius: 1rem;
		border: 2px dashed color-mix(in oklab, var(--primary) 40%, transparent);
		background: color-mix(in oklab, var(--primary) 5%, transparent);
		padding: 1rem 1.5rem;
		text-align: center;
		transition: background 0.15s;
	}
	.reel-banner:hover {
		background: color-mix(in oklab, var(--primary) 10%, transparent);
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
	.text-\[10px\] {
		font-size: 10px;
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
