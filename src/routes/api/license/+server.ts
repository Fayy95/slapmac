import { json, error as kitError } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';
import {
	extractCheckoutSessionId,
	isPlausibleStripeCheckoutSessionId
} from '$lib/server/checkout-session-id';
import { issueLicenseFromCheckoutSession } from '$lib/server/issue-license';

async function resolveSessionId(
	url: URL,
	request: Request
): Promise<string | null> {
	const fromQuery = extractCheckoutSessionId(url);
	if (fromQuery) return fromQuery;

	const ct = request.headers.get('content-type') ?? '';
	if (request.method === 'POST' && ct.includes('application/json')) {
		const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
		const s = body?.session_id;
		if (typeof s === 'string' && isPlausibleStripeCheckoutSessionId(s)) return s.trim();
	}
	if (request.method === 'POST' && ct.includes('application/x-www-form-urlencoded')) {
		const fd = await request.formData();
		const s = fd.get('session_id');
		if (typeof s === 'string' && isPlausibleStripeCheckoutSessionId(s)) return s.trim();
	}
	return null;
}

export const GET: RequestHandler = async ({ url }) => {
	const sessionId = extractCheckoutSessionId(url);
	if (!sessionId) {
		throw kitError(400, 'Missing or invalid session_id (use ?session_id=cs_… or Stripe success URL).');
	}
	const result = await issueLicenseFromCheckoutSession({
		sessionId,
		stripeSecretKey: env.STRIPE_SECRET_KEY ?? '',
		mongoUri: env.MONGODB_URI ?? '',
		mongoDbName: env.MONGODB_DB_NAME
	});
	if (!result.ok) {
		throw kitError(result.httpStatus, result.error);
	}
	return json({
		ok: true as const,
		email: result.email,
		license_key: result.licenseKey
	});
};

export const POST: RequestHandler = async ({ url, request }) => {
	const sessionId = await resolveSessionId(url, request);
	if (!sessionId) {
		throw kitError(400, 'Missing or invalid session_id in body or query.');
	}
	const result = await issueLicenseFromCheckoutSession({
		sessionId,
		stripeSecretKey: env.STRIPE_SECRET_KEY ?? '',
		mongoUri: env.MONGODB_URI ?? '',
		mongoDbName: env.MONGODB_DB_NAME
	});
	if (!result.ok) {
		throw kitError(result.httpStatus, result.error);
	}
	return json({
		ok: true as const,
		email: result.email,
		license_key: result.licenseKey
	});
};
