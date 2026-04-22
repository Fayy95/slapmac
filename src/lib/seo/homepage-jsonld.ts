import { FAQ_ITEMS, DOWNLOAD_URL, FEATURE_GRID } from '$lib/slapmac/data';
import { DEFAULT_DESCRIPTION, SITE_NAME, getSiteUrl, DEFAULT_OG_IMAGE } from './site';

export function buildHomepageJsonLd() {
	const url = getSiteUrl();
	const orgId = `${url}/#organization`;
	const websiteId = `${url}/#website`;
	const appId = `${url}/#software`;
	const webpageId = `${url}/#webpage`;

	const faqMainEntity = FAQ_ITEMS.map((item) => ({
		'@type': 'Question',
		name: item.q,
		acceptedAnswer: {
			'@type': 'Answer',
			text: item.a
		}
	}));

	const featureList = FEATURE_GRID.map((f) => `${f.title}: ${f.body}`);

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
				inLanguage: 'en-US',
				potentialAction: {
					'@type': 'SearchAction',
					target: `${url}/?q={search_term_string}`,
					'query-input': 'required name=search_term_string'
				}
			},
			{
				'@type': 'WebPage',
				'@id': webpageId,
				url,
				name: 'SlapMyMac — Slap Your MacBook, It Screams Back',
				description: DEFAULT_DESCRIPTION,
				isPartOf: { '@id': websiteId },
				about: { '@id': appId },
				inLanguage: 'en-US',
				primaryImageOfPage: {
					'@type': 'ImageObject',
					url: DEFAULT_OG_IMAGE
				}
			},
			{
				'@type': 'BreadcrumbList',
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						name: 'Home',
						item: url
					}
				]
			},
			{
				'@type': 'SoftwareApplication',
				'@id': appId,
				name: SITE_NAME,
				alternateName: ['Slap My Mac', 'Slap My MacBook', 'slapmymac.net'],
				applicationCategory: 'UtilitiesApplication',
				applicationSubCategory: 'MenuBarApplication',
				operatingSystem: 'macOS 14.6 or newer',
				processorRequirements: 'Apple Silicon M1 Pro or newer',
				description: DEFAULT_DESCRIPTION,
				url,
				image: DEFAULT_OG_IMAGE,
				screenshot: DEFAULT_OG_IMAGE,
				downloadUrl: DOWNLOAD_URL,
				softwareVersion: '1.3.0',
				featureList,
				keywords:
					'slapmymac, slap my mac, slap my macbook, slap mac, macbook prank app, funny mac app, mac menu bar app, macbook sound effects, mac accelerometer app, usb moaner, lid creak, custom sound pack, m1 pro, m2 pro, apple silicon, macOS Sonoma, macOS Sequoia',
				offers: {
					'@type': 'Offer',
					price: '2.00',
					priceCurrency: 'USD',
					availability: 'https://schema.org/InStock',
					url
				},
				aggregateRating: {
					'@type': 'AggregateRating',
					ratingValue: '4.8',
					bestRating: '5',
					worstRating: '1',
					ratingCount: '312'
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
