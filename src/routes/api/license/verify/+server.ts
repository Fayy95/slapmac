import { json, error as kitError } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';
import { verifyLicenseKey } from '$lib/server/license-queries';

/** macOS app: verify a license key against the database. */
export const POST: RequestHandler = async ({ request }) => {
	const mongoUri = env.MONGODB_URI;
	if (!mongoUri) {
		throw kitError(503, 'License verification is not configured.');
	}

	const ct = request.headers.get('content-type') ?? '';
	let licenseKeyRaw: string | undefined;

	if (ct.includes('application/json')) {
		const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
		const k = body?.license_key ?? body?.licenseKey;
		if (typeof k === 'string') licenseKeyRaw = k;
	} else if (ct.includes('application/x-www-form-urlencoded')) {
		const fd = await request.formData();
		const k = fd.get('license_key') ?? fd.get('licenseKey');
		if (typeof k === 'string') licenseKeyRaw = k;
	}

	if (!licenseKeyRaw?.trim()) {
		throw kitError(400, 'Missing license_key in JSON body or form field.');
	}

	const result = await verifyLicenseKey({
		mongoUri,
		mongoDbName: env.MONGODB_DB_NAME,
		licenseKey: licenseKeyRaw
	});

	if (!result.valid) {
		return json({ valid: false as const });
	}

	return json({
		valid: true as const,
		email: result.email
	});
};
