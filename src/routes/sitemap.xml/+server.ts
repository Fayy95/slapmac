import type { RequestHandler } from './$types';

const SITEMAP_ORIGIN = 'https://www.slapmymac.net';
const paths = [
	'/',
	'/features',
	'/mac-sound-on-charger-connect-disconnect',
	'/privacy',
	'/terms'
] as const;

type Path = (typeof paths)[number];

const priorityFor = (p: Path): string => {
	if (p === '/') return '1.0';
	if (p === '/mac-sound-on-charger-connect-disconnect' || p === '/features') return '0.8';
	return '0.6';
};

const changefreqFor = (p: Path): string => {
	if (p === '/') return 'weekly';
	if (p === '/mac-sound-on-charger-connect-disconnect' || p === '/features') return 'weekly';
	return 'monthly';
};

export const GET: RequestHandler = () => {
	const base = SITEMAP_ORIGIN;
	const lastmod = new Date().toISOString().slice(0, 10);
	const urls = paths
		.map(
			(p) =>
				`  <url>\n    <loc>${base}${p === '/' ? '' : p}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreqFor(p)}</changefreq>\n    <priority>${priorityFor(p)}</priority>\n  </url>`
		)
		.join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'max-age=3600'
		}
	});
};
