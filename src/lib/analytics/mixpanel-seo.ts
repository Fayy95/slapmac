import { browser } from '$app/environment';
import { afterNavigate } from '$app/navigation';
import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = '024ce45acc77ec138ef72a560f2689c0';

let initialized = false;

function ensureInit(): void {
	if (!browser || initialized) return;
	mixpanel.init(MIXPANEL_TOKEN, {
		track_pageview: false,
		persistence: 'localStorage'
	});
	initialized = true;
}

/** Call once from root layout during init. Tracks `slapmac_seo_load` on first paint and each client navigation. */
export function registerSlapmacSeoLoadTracking(): void {
	if (!browser) return;
	afterNavigate(() => {
		ensureInit();
		mixpanel.track('slapmac_seo_load', {
			path: window.location.pathname,
			url: window.location.href
		});
	});
}
