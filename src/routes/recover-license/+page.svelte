<script lang="ts">
	import { enhance } from '$app/forms';
	import SeoHead from '$lib/seo/SeoHead.svelte';

	let { form } = $props();
</script>

<SeoHead
	title="Recover your SlapMac license"
	description="Look up your SlapMac license key by email."
	canonicalPath="/recover-license"
	noindex={true}
/>

<main class="recover-page">
	<h1>Recover license</h1>
	<p class="muted">
		Enter the email you used in Stripe Checkout. We’ll show any license keys tied to it.
	</p>

	<form method="POST" class="form" use:enhance>
		<label class="label" for="email">Email</label>
		<input
			id="email"
			name="email"
			type="email"
			autocomplete="email"
			required
			class="input"
			placeholder="you@example.com"
			value={form && typeof form === 'object' && 'email' in form && typeof form.email === 'string'
				? form.email
				: ''}
		/>
		<button type="submit" class="submit">Look up</button>
	</form>

	{#if form && 'error' in form && form.error}
		<p class="error" role="alert">{form.error}</p>
	{/if}

	{#if form && 'success' in form && form.success === false && 'hint' in form}
		<p class="warn" role="status">{form.hint}</p>
	{/if}

	{#if form && 'success' in form && form.success && 'licenseKeys' in form && form.licenseKeys?.length}
		<div class="results">
			<p class="success-intro">
				License key{form.licenseKeys.length > 1 ? 's' : ''} for <strong>{form.email}</strong>:
			</p>
			<ul class="key-list">
				{#each form.licenseKeys as key}
					<li class="key-row">
						<code class="key">{key}</code>
						<button
							type="button"
							class="copy"
							onclick={() => navigator.clipboard?.writeText(key)}
						>
							Copy
						</button>
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	<p class="back"><a href="/">← Back to home</a></p>
</main>

<style>
	.recover-page {
		max-width: 32rem;
		margin: 0 auto;
		padding: 2.5rem 1.5rem 4rem;
		color: var(--foreground);
		font-family: var(--font-sans);
		line-height: 1.6;
	}
	h1 {
		font-size: 1.75rem;
		margin-bottom: 0.5rem;
	}
	.muted {
		color: var(--muted-foreground);
		font-size: 0.9375rem;
		margin-bottom: 1.5rem;
	}
	.form {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.label {
		font-size: 0.875rem;
		font-weight: 500;
	}
	.input {
		padding: 0.6rem 0.75rem;
		border-radius: 0.5rem;
		border: 1px solid var(--border);
		background: var(--background);
		color: var(--foreground);
		font-size: 1rem;
	}
	.submit {
		margin-top: 0.5rem;
		align-self: flex-start;
		padding: 0.5rem 1.25rem;
		border-radius: 9999px;
		border: none;
		background: var(--primary);
		color: var(--primary-foreground);
		font-weight: 500;
		cursor: pointer;
	}
	.submit:hover {
		opacity: 0.92;
	}
	.error {
		margin-top: 1rem;
		color: var(--destructive, #c00);
		font-size: 0.9375rem;
	}
	.warn {
		margin-top: 1rem;
		color: var(--muted-foreground);
		font-size: 0.9375rem;
	}
	.success-intro {
		margin-top: 1.5rem;
		font-size: 0.9375rem;
	}
	.results {
		margin-top: 0.25rem;
	}
	.key-list {
		list-style: none;
		margin: 0.75rem 0 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.key-row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;
		border: 1px solid var(--border);
		background: var(--card);
	}
	.key {
		flex: 1 1 10rem;
		font-family: var(--font-mono);
		font-size: 0.875rem;
		font-weight: 600;
		word-break: break-all;
	}
	.copy {
		padding: 0.35rem 0.75rem;
		border-radius: 9999px;
		border: 1px solid var(--border);
		background: transparent;
		font-size: 0.8125rem;
		cursor: pointer;
		color: var(--foreground);
	}
	.back {
		margin-top: 2rem;
	}
	.back a {
		color: var(--primary);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
