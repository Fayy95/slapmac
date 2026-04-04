import { DEFAULT_DESCRIPTION, SITE_NAME, getSiteUrl } from './site';

export function buildHomepageJsonLd() {
	const url = getSiteUrl();
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				name: SITE_NAME,
				url,
				description: DEFAULT_DESCRIPTION,
				publisher: { '@type': 'Organization', name: SITE_NAME, url }
			},
			{
				'@type': 'SoftwareApplication',
				name: SITE_NAME,
				applicationCategory: 'UtilitiesApplication',
				operatingSystem: 'macOS 14.6+',
				description: DEFAULT_DESCRIPTION,
				url,
				offers: {
					'@type': 'Offer',
					price: '7',
					priceCurrency: 'USD'
				}
			}
		]
	};
}
