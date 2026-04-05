/**
 * Stripe Checkout success URLs should use `?session_id={CHECKOUT_SESSION_ID}`.
 * Also accepts a bare `?cs_test_…` / `?cs_live_…` query (some setups append only the id).
 */
export function isPlausibleStripeCheckoutSessionId(id: string): boolean {
	return /^cs_(test|live)_[a-zA-Z0-9]+$/.test(id.trim());
}

export function extractCheckoutSessionId(url: URL): string | null {
	const explicit = url.searchParams.get('session_id');
	if (explicit && isPlausibleStripeCheckoutSessionId(explicit)) return explicit.trim();

	for (const [k, v] of url.searchParams) {
		if (isPlausibleStripeCheckoutSessionId(k)) return k.trim();
		if (v && isPlausibleStripeCheckoutSessionId(v)) return v.trim();
	}

	const raw = url.search.startsWith('?') ? url.search.slice(1).split('&')[0] : '';
	if (raw && !raw.includes('=')) {
		const id = raw.split('#')[0];
		if (id && isPlausibleStripeCheckoutSessionId(id)) return id.trim();
	}

	return null;
}
