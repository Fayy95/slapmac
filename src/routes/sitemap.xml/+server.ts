import type { RequestHandler } from './$types';

const SITEMAP_ORIGIN = 'https://www.slapmymac.net';

type SitemapEntry = {
	path: string;
	priority: string;
	changefreq: string;
};

const entries: SitemapEntry[] = [
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/features', priority: '0.8', changefreq: 'weekly' },
	{ path: '/mac-sound-on-charger-connect-disconnect', priority: '0.8', changefreq: 'weekly' },
	// Blog index
	{ path: '/blog', priority: '0.8', changefreq: 'weekly' },
	// Blog pillar post
	{ path: '/blog/what-is-slapmac', priority: '0.9', changefreq: 'monthly' },
	// Blog supporting posts
	{ path: '/blog/slapmac-setup-guide', priority: '0.7', changefreq: 'monthly' },
	{ path: '/blog/slapmac-voice-packs', priority: '0.7', changefreq: 'monthly' },
	{ path: '/blog/macbook-accelerometer-slap-detection', priority: '0.7', changefreq: 'monthly' },
	{ path: '/blog/slapmac-review', priority: '0.7', changefreq: 'monthly' },
	{ path: '/blog/slapmac-custom-sounds', priority: '0.7', changefreq: 'monthly' },
	{ path: '/blog/slapmac-usb-moaner', priority: '0.7', changefreq: 'monthly' },
	{ path: '/blog/funny-mac-apps-2026', priority: '0.6', changefreq: 'monthly' },
	{ path: '/blog/slapmac-requirements-compatibility', priority: '0.7', changefreq: 'monthly' },
	// Legal
	{ path: '/privacy', priority: '0.4', changefreq: 'monthly' },
	{ path: '/terms', priority: '0.4', changefreq: 'monthly' }
];

export const GET: RequestHandler = () => {
	const base = SITEMAP_ORIGIN;
	const lastmod = new Date().toISOString().slice(0, 10);

	const urls = entries
		.map(
			({ path, priority, changefreq }) =>
				`  <url>\n    <loc>${base}${path === '/' ? '' : path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
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
