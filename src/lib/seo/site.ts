/** Set `PUBLIC_SITE_URL` in `.env` when deploying (no trailing slash). */
export function getSiteUrl(): string {
	const v = import.meta.env.PUBLIC_SITE_URL as string | undefined;
	if (v && typeof v === 'string' && v.trim()) return v.replace(/\/+$/, '');
	return 'https://slapmymac.net';
}

export const SITE_NAME = 'SlapMac';

export const DEFAULT_DESCRIPTION =
	"Your macbook finally has feelings. Don't abuse it. Or do.";

/** Shared social preview (matches slapmac.com). */
export const DEFAULT_OG_IMAGE = 'https://slapmac.com/card.jpg';

export const TWITTER_CREATOR = '@tonnozfpv';

export function absoluteUrl(href: string, siteUrl = getSiteUrl()): string {
	if (href.startsWith('http://') || href.startsWith('https://')) return href;
	const base = siteUrl.replace(/\/$/, '');
	const path = href.startsWith('/') ? href : `/${href}`;
	return `${base}${path}`;
}
