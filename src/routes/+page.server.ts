import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { extractCheckoutSessionId } from '$lib/server/checkout-session-id';

/** Stripe sometimes lands users on `/` with `?cs_…` — send them to the license page. */
export const load: PageServerLoad = async ({ url }) => {
	const sessionId = extractCheckoutSessionId(url);
	if (sessionId) {
		throw redirect(302, `/license?session_id=${encodeURIComponent(sessionId)}`);
	}
	return {};
};
