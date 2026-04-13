import type { RequestHandler } from './$types';

const SITEMAP_ORIGIN = 'https://www.slapmymac.net';
const paths = ['/', '/features', '/privacy', '/terms'] as const;

export const GET: RequestHandler = () => {
	const base = SITEMAP_ORIGIN;
	const lastmod = new Date().toISOString().slice(0, 10);
	const urls = paths
		.map(
			(p) =>
				`  <url>\n    <loc>${base}${p === '/' ? '' : p}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${p === '/' ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${p === '/' ? '1.0' : '0.6'}</priority>\n  </url>`
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
