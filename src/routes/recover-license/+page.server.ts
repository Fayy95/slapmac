import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { findLicenseKeysByEmail } from '$lib/server/license-queries';

export const load: PageServerLoad = async () => ({});

export const actions: Actions = {
	default: async ({ request }) => {
		const fd = await request.formData();
		const raw = fd.get('email');
		const email = typeof raw === 'string' ? raw.trim() : '';

		if (!email) {
			return fail(400, { error: 'Enter the email you used at checkout.' });
		}

		if (!env.MONGODB_URI) {
			return fail(503, { error: 'Recovery isn’t configured on this server.', email });
		}

		const licenseKeys = await findLicenseKeysByEmail({
			mongoUri: env.MONGODB_URI,
			mongoDbName: env.MONGODB_DB_NAME,
			email
		});

		if (licenseKeys.length === 0) {
			return {
				success: false as const,
				email,
				hint: 'No license found for that email. Try the address from your Stripe receipt.'
			};
		}

		return {
			success: true as const,
			email,
			licenseKeys
		};
	}
};
