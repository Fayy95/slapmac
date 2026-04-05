<script lang="ts">
	import SeoHead from '$lib/seo/SeoHead.svelte';

	let { data } = $props();
</script>

<SeoHead
	title="Your SlapMac license"
	description="Your license key after purchase."
	canonicalPath="/license"
	noindex={true}
/>

<main class="license-page">
	{#if data.view === 'needs_session'}
		<h1>Almost there</h1>
	
		<p class="muted"><a href="/recover-license">Lost your key? Recover by email</a></p>
		<p><a href="/">← Back to home</a></p>
	{:else if data.view === 'misconfigured'}
		<h1>Not available</h1>
		<p class="muted">
			The server needs <code class="inline">STRIPE_SECRET_KEY</code> and
			<code class="inline">MONGODB_URI</code> in <code class="inline">.env</code> (or your host’s env).
			Restart <code class="inline">npm run dev</code> after saving.
		</p>
		<p><a href="/">← Back to home</a></p>
	{:else if data.view === 'failed'}
		<h1>Couldn’t issue a license</h1>
		<p class="error">{data.message}</p>
		<p class="muted">If you already paid, contact support with your receipt.</p>
		<p><a href="/">← Back to home</a></p>
	{:else if data.view === 'success'}
		<h1>You’re in</h1>
		<p class="lead">Save this key — it’s tied to <strong>{data.email}</strong>.</p>
		<div class="key-box" role="group" aria-label="License key">
			<code class="license-key">{data.licenseKey}</code>
			<button
				type="button"
				class="copy-btn"
				onclick={() => navigator.clipboard?.writeText(data.licenseKey)}
			>
				Copy
			</button>
		</div>
		<p class="muted small">
			Verify in the Mac app: 
		</p>
		<p class="muted small"><a href="/recover-license">Recover by email</a></p>
		<p><a href="/">← Back to home</a></p>
	{/if}
</main>

<style>
	.license-page {
		max-width: 36rem;
		margin: 0 auto;
		padding: 2.5rem 1.5rem 4rem;
		color: var(--foreground);
		font-family: var(--font-sans);
		line-height: 1.6;
	}
	.license-page h1 {
		font-size: 1.75rem;
		margin-bottom: 0.75rem;
	}
	.lead {
		margin-bottom: 1.25rem;
		color: var(--muted-foreground);
	}
	.lead strong {
		color: var(--foreground);
	}
	.muted {
		color: var(--muted-foreground);
		font-size: 0.9375rem;
	}
	.muted.small {
		font-size: 0.8125rem;
		margin-top: 1.5rem;
	}
	.error {
		color: var(--destructive, #c00);
		margin: 0.75rem 0;
	}
	.mono-block {
		display: block;
		margin: 1rem 0;
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;
		background: var(--muted);
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		overflow-x: auto;
		word-break: break-all;
	}
	.inline {
		font-family: var(--font-mono);
		font-size: 0.85em;
	}
	.key-box {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem;
		margin-top: 0.5rem;
		padding: 1rem 1.25rem;
		border-radius: 0.75rem;
		border: 1px solid var(--border);
		background: var(--card);
	}
	.license-key {
		flex: 1 1 12rem;
		font-family: var(--font-mono);
		font-size: 0.9375rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		word-break: break-all;
	}
	.copy-btn {
		flex-shrink: 0;
		padding: 0.4rem 1rem;
		border-radius: 9999px;
		border: 1px solid var(--border);
		background: var(--primary);
		color: var(--primary-foreground);
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
	}
	.copy-btn:hover {
		opacity: 0.92;
	}
	.license-page a {
		color: var(--primary);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
