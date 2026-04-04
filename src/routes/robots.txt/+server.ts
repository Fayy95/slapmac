import { getSiteUrl } from '$lib/seo/site';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	const base = getSiteUrl();
	const body = `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'max-age=3600'
		}
	});
};
