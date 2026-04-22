<script lang="ts">
	import { buildPrivacyPageJsonLd } from '$lib/seo/jsonld';
	import SeoHead from '$lib/seo/SeoHead.svelte';

	const PRIVACY_DESCRIPTION =
		'SlapMyMac privacy policy. We only collect the email you use at checkout to deliver your license key and support you. No tracking, no ads, no selling your data.';

	const LAST_UPDATED = 'April 22, 2026';
</script>

<SeoHead
	title="Privacy Policy — SlapMyMac"
	description={PRIVACY_DESCRIPTION}
	keywords="SlapMyMac privacy, privacy policy, data policy"
	canonicalPath="/privacy"
	structuredData={buildPrivacyPageJsonLd(PRIVACY_DESCRIPTION)}
/>

<main class="doc-page">
	<p class="crumbs"><a href="/">Home</a> <span aria-hidden="true">›</span> Privacy</p>
	<h1>Privacy Policy</h1>
	<p class="lede">
		SlapMyMac is a small, one‑person indie macOS app. We only collect what we absolutely need to
		deliver your license and support you. We don't track you, we don't sell your data, and we
		don't run ads.
	</p>
	<p class="updated">Last updated: {LAST_UPDATED}</p>

	<h2>1. Who we are</h2>
	<p>
		"SlapMyMac" (the "App", "we", "us") is a macOS menu‑bar application available at
		<a href="https://www.slapmymac.net" rel="noopener">slapmymac.net</a>. For any privacy request,
		contact us at
		<a href="mailto:support@slapmymac.net">support@slapmymac.net</a>.
	</p>

	<h2>2. What we collect</h2>
	<p>We collect only two things, and only when you interact with us:</p>
	<ul>
		<li>
			<strong>Your email address</strong> — provided when you complete Stripe Checkout to buy a
			license, or when you use the
			<a href="/recover-license">license recovery</a> form. We use it to email you your license
			key and to answer support questions.
		</li>
		<li>
			<strong>Basic purchase metadata</strong> — a Stripe Checkout session ID and timestamp, so we
			can look up your license if you lose it.
		</li>
	</ul>
	<p>
		The App itself runs entirely on your Mac. It does <strong>not</strong> upload your audio,
		microphone data, motion data, files, keystrokes, or usage analytics. License verification
		sends only your license key to our server — nothing else.
	</p>

	<h2>3. What we do NOT collect</h2>
	<ul>
		<li>No advertising identifiers, no fingerprinting, no third‑party trackers.</li>
		<li>No behavioural analytics inside the App (no Segment, Mixpanel, Amplitude, GA, etc.).</li>
		<li>No access to your files, contacts, photos, calendar, or browsing history.</li>
		<li>No audio or motion sensor data ever leaves your Mac.</li>
	</ul>

	<h2>4. Payments</h2>
	<p>
		Payments are processed by <strong>Stripe, Inc.</strong> We never see or store your full card
		number. Stripe is the data controller for card details; see
		<a href="https://stripe.com/privacy" rel="noopener noreferrer" target="_blank"
			>stripe.com/privacy</a
		> for their policy.
	</p>

	<h2>5. Hosting &amp; sub‑processors</h2>
	<p>We use a minimal, privacy‑respecting stack to run the site and license service:</p>
	<ul>
		<li><strong>Stripe</strong> — payment processing.</li>
		<li><strong>A managed hosting provider</strong> — to serve this website and the license API.</li>
		<li><strong>Transactional email provider</strong> — to send your license key and receipts.</li>
	</ul>
	<p>
		These sub‑processors only receive the minimum data needed to do their job (e.g. the email
		delivery service receives your email address so it can deliver your license key).
	</p>

	<h2>6. Cookies</h2>
	<p>
		slapmymac.net does not set advertising or analytics cookies. The only cookies that may be set
		are strictly functional (e.g. a CSRF token on forms). There is no cookie banner because there
		is nothing non‑essential to consent to.
	</p>

	<h2>7. How long we keep data</h2>
	<p>
		License records (email, Stripe session ID, license key) are kept for as long as the license is
		valid so you can recover it. Support emails are kept for up to 24 months, then deleted. Stripe
		retains payment records according to its own retention policy and applicable tax law.
	</p>

	<h2>8. Your rights</h2>
	<p>
		Depending on where you live (e.g. EU/UK GDPR, California CCPA), you have the right to access,
		correct, export, or delete the data we hold about you, and to object to processing. To exercise
		any of these, email
		<a href="mailto:support@slapmymac.net">support@slapmymac.net</a> from the address you bought with and
		we'll respond within 30 days.
	</p>
	<p>
		Deleting your license data means we can no longer recover your license key for you. You can
		keep using any copy of the App already installed.
	</p>

	<h2>9. Children</h2>
	<p>
		SlapMyMac is not directed at children under 13 and we do not knowingly collect data from them.
	</p>

	<h2>10. International transfers</h2>
	<p>
		Our hosting, email, and Stripe may store data in the United States or the European Economic
		Area. Where required, transfers rely on standard contractual clauses offered by the relevant
		sub‑processor.
	</p>

	<h2>11. Changes to this policy</h2>
	<p>
		If we make material changes we'll update the "Last updated" date above and, where reasonable,
		notify existing customers by email.
	</p>

	<h2>12. Contact</h2>
	<p>
		Questions, requests, or complaints:
		<a href="mailto:support@slapmymac.net">support@slapmymac.net</a>.
	</p>

	<p class="back"><a href="/">← Back to home</a></p>

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
</main>

<style>
	.doc-page {
		max-width: 46rem;
		margin: 0 auto;
		padding: 2.5rem 1.5rem 4rem;
		color: var(--foreground);
		font-family: var(--font-sans);
		line-height: 1.65;
	}
	.crumbs {
		font-size: 13px;
		color: var(--muted-foreground);
		margin-bottom: 0.75rem;
	}
	.crumbs a {
		color: var(--muted-foreground);
		text-decoration: none;
	}
	.crumbs a:hover {
		color: var(--foreground);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.doc-page h1 {
		font-size: 2rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		margin: 0 0 0.75rem;
	}
	.lede {
		font-size: 1.05rem;
		color: var(--muted-foreground);
		margin: 0 0 0.5rem;
	}
	.updated {
		font-size: 13px;
		color: color-mix(in oklab, var(--muted-foreground) 75%, transparent);
		margin: 0 0 2rem;
	}
	.doc-page h2 {
		font-size: 1.15rem;
		font-weight: 700;
		letter-spacing: -0.01em;
		margin: 2rem 0 0.5rem;
	}
	.doc-page p {
		margin: 0 0 0.9rem;
	}
	.doc-page ul {
		margin: 0 0 1rem;
		padding-left: 1.25rem;
	}
	.doc-page li {
		margin: 0 0 0.35rem;
	}
	.doc-page a {
		color: var(--primary);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.doc-page a:hover {
		text-decoration-thickness: 2px;
	}
	.back {
		margin-top: 2.5rem;
		font-size: 14px;
	}

	.site-foot {
		margin-top: 3rem;
		padding: 1.5rem 0 0;
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
