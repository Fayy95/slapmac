/** Preferred public hostname (include `www` if that is your canonical site). */
export const CANONICAL_HOSTNAME = 'www.slapmymac.net';

/** Apex host: requests here are 301-redirected to `CANONICAL_HOSTNAME` in `hooks.server.ts`. */
export const APEX_HOSTNAME = 'slapmymac.net';

export const CANONICAL_SITE_ORIGIN = `https://${CANONICAL_HOSTNAME}`;

function normalizeSiteOrigin(raw: string): string {
	const base = raw.replace(/\/+$/, '');
	// Treat apex as www so sitemap/canonical/JSON-LD match Bing’s preferred URL.
	if (base === 'https://slapmymac.net' || base === 'http://slapmymac.net') {
		return CANONICAL_SITE_ORIGIN;
	}
	return base;
}

/**
 * Canonical origin for sitemap, robots, `<link rel="canonical">`, and JSON-LD.
 * Set `PUBLIC_SITE_URL` in production (no trailing slash). Defaults to `https://www.slapmymac.net`.
 */
export function getSiteUrl(): string {
	const v = import.meta.env.PUBLIC_SITE_URL as string | undefined;
	if (v && typeof v === 'string' && v.trim()) {
		return normalizeSiteOrigin(v.trim());
	}
	return CANONICAL_SITE_ORIGIN;
}

export const SITE_NAME = 'SlapMac';

/** Primary meta description (~155 chars): used sitewide default + JSON-LD. */
export const DEFAULT_DESCRIPTION =
	'SlapMac is a Mac menu bar app for M1 Pro+ MacBooks: slap detection, 7 voice packs, USB moaner, lid creak, custom sound folders. macOS 14.6+. $2 one-time.';

export const DEFAULT_TITLE = 'SlapMac — Slap your MacBook. It talks back.';

/** Shared social preview (matches slapmac.com). */
export const DEFAULT_OG_IMAGE = 'https://slapmac.com/card.jpg';

export const TWITTER_CREATOR = '@tonnozfpv';

/** Brand / site handle for Twitter/X cards (same as creator for solo projects). */
export const TWITTER_SITE = '@tonnozfpv';

export function absoluteUrl(href: string, siteUrl = getSiteUrl()): string {
	if (href.startsWith('http://') || href.startsWith('https://')) return href;
	const base = siteUrl.replace(/\/$/, '');
	const path = href.startsWith('/') ? href : `/${href}`;
	return `${base}${path}`;
}
