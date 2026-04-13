import type { Handle } from '@sveltejs/kit';
import { APEX_HOSTNAME, CANONICAL_HOSTNAME } from '$lib/seo/site';

/** 301 apex → www so canonicals, sitemap, and Bing/Google agree on one hostname. */
export const handle: Handle = async ({ event, resolve }) => {
	const host = event.url.hostname.toLowerCase();
	if (host === APEX_HOSTNAME) {
		const dest = new URL(event.url);
		dest.hostname = CANONICAL_HOSTNAME;
		dest.protocol = 'https:';
		return new Response(null, {
			status: 301,
			headers: { Location: dest.toString() }
		});
	}
	return resolve(event);
};
