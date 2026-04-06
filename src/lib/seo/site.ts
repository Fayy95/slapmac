/** Set `PUBLIC_SITE_URL` in `.env` when deploying (no trailing slash). */
export function getSiteUrl(): string {
	const v = import.meta.env.PUBLIC_SITE_URL as string | undefined;
	if (v && typeof v === 'string' && v.trim()) return v.replace(/\/+$/, '');
	return 'https://slapmymac.net';
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
