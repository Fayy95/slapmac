import { getSiteUrl, SITE_NAME } from './site';

export type BreadcrumbItem = { name: string; path: string };

/** BreadcrumbList for inner pages (Home → …). */
export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
	const base = getSiteUrl();
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.name,
			item: `${base}${item.path === '/' ? '' : item.path}`
		}))
	};
}

/** Generic WebPage + relationship to site (for legal/supporting pages). */
export function buildWebPageJsonLd(opts: {
	path: string;
	name: string;
	description: string;
}) {
	const base = getSiteUrl();
	const url = `${base}${opts.path === '/' ? '' : opts.path}`;
	return {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		'@id': `${url}#webpage`,
		url,
		name: opts.name,
		description: opts.description,
		isPartOf: {
			'@type': 'WebSite',
			name: SITE_NAME,
			url: base
		}
	};
}

const FEATURES_PATH = '/features' as const;

export function buildFeaturesPageJsonLd(description: string) {
	return [
		buildWebPageJsonLd({
			path: FEATURES_PATH,
			name: 'Features — SlapMac',
			description
		}),
		buildBreadcrumbJsonLd([
			{ name: 'Home', path: '/' },
			{ name: 'Features', path: FEATURES_PATH }
		])
	];
}

export function buildTermsPageJsonLd(description: string) {
	const path = '/terms';
	return [
		buildWebPageJsonLd({
			path,
			name: 'Terms of use — SlapMac',
			description
		}),
		buildBreadcrumbJsonLd([
			{ name: 'Home', path: '/' },
			{ name: 'Terms', path }
		])
	];
}

export function buildPrivacyPageJsonLd(description: string) {
	const path = '/privacy';
	return [
		buildWebPageJsonLd({
			path,
			name: 'Privacy — SlapMac',
			description
		}),
		buildBreadcrumbJsonLd([
			{ name: 'Home', path: '/' },
			{ name: 'Privacy', path }
		])
	];
}
