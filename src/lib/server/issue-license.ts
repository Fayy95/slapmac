import { randomBytes } from 'node:crypto';
import Stripe from 'stripe';
import { MongoServerError } from 'mongodb';
import { getLicensesCollection } from './license-queries';

const STRIPE_API_VERSION = '2026-03-25.dahlia' as const;

export type IssueLicenseResult =
	| { ok: true; email: string; licenseKey: string }
	| { ok: false; error: string; httpStatus: number };

function generateLicenseKey(): string {
	const raw = randomBytes(16).toString('hex').toUpperCase();
	return `SLAP-${raw.slice(0, 4)}-${raw.slice(4, 8)}-${raw.slice(8, 12)}-${raw.slice(12, 16)}`;
}

function checkoutSessionIsPaid(session: Stripe.Checkout.Session): boolean {
	if (session.payment_status === 'paid' || session.payment_status === 'no_payment_required') {
		if (session.mode === 'payment') return true;
	}
	if (session.mode === 'subscription' && session.status === 'complete') return true;
	return false;
}

export async function issueLicenseFromCheckoutSession(opts: {
	sessionId: string;
	stripeSecretKey: string;
	mongoUri: string;
	mongoDbName?: string;
}): Promise<IssueLicenseResult> {
	const { sessionId, stripeSecretKey, mongoUri, mongoDbName } = opts;

	if (!stripeSecretKey) {
		return { ok: false, error: 'Server is missing Stripe configuration.', httpStatus: 500 };
	}
	if (!mongoUri) {
		return { ok: false, error: 'Server is missing database configuration.', httpStatus: 500 };
	}

	const stripe = new Stripe(stripeSecretKey, {
		apiVersion: STRIPE_API_VERSION,
		typescript: true
	});

	let session: Stripe.Checkout.Session;
	try {
		session = await stripe.checkout.sessions.retrieve(sessionId);
	} catch (e) {
		if (e instanceof Stripe.errors.StripeError && e.code === 'resource_missing') {
			return { ok: false, error: 'Checkout session not found.', httpStatus: 404 };
		}
		throw e;
	}

	if (!checkoutSessionIsPaid(session)) {
		return { ok: false, error: 'Payment is not complete for this session.', httpStatus: 402 };
	}

	const email =
		session.customer_details?.email?.trim() ||
		session.customer_email?.trim() ||
		null;
	if (!email) {
		return {
			ok: false,
			error: 'No email on this checkout session. Enable customer email in Stripe Checkout.',
			httpStatus: 422
		};
	}

	const coll = await getLicensesCollection(mongoUri, mongoDbName);

	const existing = await coll.findOne({ stripeSessionId: sessionId });
	if (existing) {
		return { ok: true, email: existing.email, licenseKey: existing.licenseKey };
	}

	const licenseKey = generateLicenseKey();
	try {
		await coll.insertOne({
			stripeSessionId: sessionId,
			email,
			licenseKey,
			createdAt: new Date()
		});
	} catch (e) {
		if (e instanceof MongoServerError && e.code === 11000) {
			const again = await coll.findOne({ stripeSessionId: sessionId });
			if (again) {
				return { ok: true, email: again.email, licenseKey: again.licenseKey };
			}
		}
		throw e;
	}

	return { ok: true, email, licenseKey };
}
