<script lang="ts">
	import { buildTermsPageJsonLd } from '$lib/seo/jsonld';
	import SeoHead from '$lib/seo/SeoHead.svelte';

	const TERMS_DESCRIPTION =
		'SlapMyMac terms of use. A plain‑English $2 license for the SlapMyMac macOS menu bar app, with a 14‑day no‑questions refund policy.';

	const LAST_UPDATED = 'April 22, 2026';
</script>

<SeoHead
	title="Terms of Use — SlapMyMac"
	description={TERMS_DESCRIPTION}
	keywords="SlapMyMac terms, terms of use, SlapMyMac license, SlapMyMac EULA"
	canonicalPath="/terms"
	structuredData={buildTermsPageJsonLd(TERMS_DESCRIPTION)}
/>

<main class="doc-page">
	<p class="crumbs"><a href="/">Home</a> <span aria-hidden="true">›</span> Terms</p>
	<h1>Terms of Use</h1>
	<p class="lede">
		SlapMyMac is made by one person. These terms try to be short and fair. If anything here is
		unclear, email us at
		<a href="mailto:support@slapmymac.net">support@slapmymac.net</a> and we'll figure it out.
	</p>
	<p class="updated">Last updated: {LAST_UPDATED}</p>

	<h2>1. The agreement</h2>
	<p>
		By downloading, purchasing, or using SlapMyMac (the "App") you agree to these Terms. If you
		don't agree, please don't use the App.
	</p>

	<h2>2. Your license</h2>
	<p>
		When you pay for SlapMyMac, we grant you a <strong>personal, non‑transferable license</strong>
		to install and use the App on Macs you own or control for your own personal, non‑commercial
		use. One purchase = one license key.
	</p>
	<p>You may not:</p>
	<ul>
		<li>Resell, sublicense, rent, or share your license key with others.</li>
		<li>Redistribute the App binary or a modified version of it.</li>
		<li>Reverse engineer or circumvent license checks, except where that right is granted by law.</li>
		<li>Use the App to violate any law or harm other people's devices or data.</li>
	</ul>

	<h2>3. Price, payment &amp; taxes</h2>
	<p>
		The App is sold for a one‑time fee (currently USD $2) via <strong>Stripe Checkout</strong>.
		Prices shown at checkout are final for your region. Where applicable, VAT/GST/sales tax is
		added at checkout.
	</p>

	<h2>4. Refunds</h2>
	<p>
		We offer a <strong>14‑day, no‑questions‑asked refund</strong>. If you're not happy for any
		reason, email
		<a href="mailto:support@slapmymac.net">support@slapmymac.net</a> from the address you bought
		with within 14 days of purchase and we'll refund you in full. After the refund, your license
		key is deactivated.
	</p>

	<h2>5. Delivery &amp; system requirements</h2>
	<p>
		The App is delivered as a downloadable macOS application. You are responsible for meeting the
		system requirements listed on the
		<a href="/">product page</a> (Apple Silicon M1 Pro or newer, macOS 14.6 or newer). We can't
		guarantee the App will run on unsupported hardware.
	</p>

	<h2>6. Updates</h2>
	<p>
		We may release updates that add features, fix bugs, or change behaviour. We try to keep
		updates free for existing customers, but we reserve the right to ship paid major upgrades in
		the future. If we do, that will be clearly marked before you pay.
	</p>

	<h2>7. Acceptable use &amp; disclaimer</h2>
	<p>
		SlapMyMac intentionally makes loud, unexpected sounds. Don't use it where it could cause
		harm, distraction, or damage (e.g. while driving, in libraries, hospitals, exams, or on shared
		machines without consent). You are solely responsible for how and where you use the App.
	</p>
	<p>
		The App is provided <strong>"as is"</strong>, without warranties of any kind, express or
		implied, to the fullest extent permitted by law. We don't guarantee the App will be
		error‑free, uninterrupted, or compatible with every future macOS release.
	</p>

	<h2>8. Limitation of liability</h2>
	<p>
		To the maximum extent permitted by law, SlapMyMac and its author are not liable for any
		indirect, incidental, consequential, or punitive damages, or for lost profits, lost data, or
		business interruption, arising from your use of the App. Our total liability to you for any
		claim under these Terms is capped at the amount you paid for the license in the 12 months
		before the claim.
	</p>
	<p>
		Nothing in these Terms limits liability that cannot be limited under applicable law (for
		example, death or personal injury caused by negligence, or fraud).
	</p>

	<h2>9. Termination</h2>
	<p>
		We may suspend or terminate your license if you materially breach these Terms (for example,
		chargeback abuse, piracy, or harassment of support). You may stop using the App at any time.
		Sections 7, 8, 10, and 11 survive termination.
	</p>

	<h2>10. Privacy</h2>
	<p>
		Our
		<a href="/privacy">Privacy Policy</a> explains what data we collect (spoiler: just your email
		for license delivery) and how we handle it. By using the App you agree to that policy.
	</p>

	<h2>11. Governing law</h2>
	<p>
		These Terms are governed by the laws of the jurisdiction in which the author of SlapMyMac
		resides, without regard to its conflict‑of‑laws rules. Where local consumer law gives you
		stronger rights, those rights are not affected.
	</p>

	<h2>12. Changes to these terms</h2>
	<p>
		We may update these Terms from time to time. Material changes will be reflected by updating
		the "Last updated" date above. Continued use of the App after changes become effective means
		you accept the new Terms.
	</p>

	<h2>13. Contact</h2>
	<p>
		Questions about these Terms, refunds, or anything else:
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
