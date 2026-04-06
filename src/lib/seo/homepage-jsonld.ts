import { FAQ_ITEMS, DOWNLOAD_URL } from '$lib/slapmac/data';
import { DEFAULT_DESCRIPTION, SITE_NAME, getSiteUrl, DEFAULT_OG_IMAGE } from './site';

export function buildHomepageJsonLd() {
	const url = getSiteUrl();
	const orgId = `${url}/#organization`;
	const websiteId = `${url}/#website`;

	const faqMainEntity = FAQ_ITEMS.map((item) => ({
		'@type': 'Question',
		name: item.q,
		acceptedAnswer: {
			'@type': 'Answer',
			text: item.a
		}
	}));

	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Organization',
				'@id': orgId,
				name: SITE_NAME,
				url,
				logo: {
					'@type': 'ImageObject',
					url: `${url}/slapmac_logo_no_text.svg`
				},
				sameAs: ['https://www.instagram.com/tonnozfpv/']
			},
			{
				'@type': 'WebSite',
				'@id': websiteId,
				name: SITE_NAME,
				url,
				description: DEFAULT_DESCRIPTION,
				publisher: { '@id': orgId },
				inLanguage: 'en-US'
			},
			{
				'@type': 'SoftwareApplication',
				name: SITE_NAME,
				applicationCategory: 'UtilitiesApplication',
				applicationSubCategory: 'MenuBarApplication',
				operatingSystem: 'macOS 14.6 or newer',
				description: DEFAULT_DESCRIPTION,
				url,
				image: DEFAULT_OG_IMAGE,
				screenshot: DEFAULT_OG_IMAGE,
				downloadUrl: DOWNLOAD_URL,
				offers: {
					'@type': 'Offer',
					price: '2.00',
					priceCurrency: 'USD',
					availability: 'https://schema.org/InStock',
					url
				},
				author: { '@id': orgId },
				publisher: { '@id': orgId }
			},
			{
				'@type': 'FAQPage',
				'@id': `${url}/#faq`,
				url,
				mainEntity: faqMainEntity
			}
		]
	};
}
