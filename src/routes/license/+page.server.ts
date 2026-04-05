import type { PageServerLoad } from './$types';
import { extractCheckoutSessionId } from '$lib/server/checkout-session-id';
import { issueLicenseFromCheckoutSession } from '$lib/server/issue-license';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async ({ url }) => {
	const sessionId = extractCheckoutSessionId(url);
	if (!sessionId) {
		return { view: 'needs_session' as const };
	}

	const stripeKey = env.STRIPE_SECRET_KEY;
	const mongoUri = env.MONGODB_URI;
	if (!stripeKey || !mongoUri) {
		return { view: 'misconfigured' as const };
	}

	const result = await issueLicenseFromCheckoutSession({
		sessionId,
		stripeSecretKey: stripeKey,
		mongoUri,
		mongoDbName: env.MONGODB_DB_NAME
	});

	if (!result.ok) {
		return {
			view: 'failed' as const,
			message: result.error,
			httpStatus: result.httpStatus
		};
	}

	return {
		view: 'success' as const,
		email: result.email,
		licenseKey: result.licenseKey
	};
};
