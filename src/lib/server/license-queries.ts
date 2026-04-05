import { getMongoClient } from './mongo';

export type LicenseDoc = {
	stripeSessionId: string;
	email: string;
	licenseKey: string;
	createdAt: Date;
};

let ensureIndexesPromise: Promise<void> | null = null;

export function normalizeLicenseKeyInput(raw: string): string | null {
	const s = raw.trim().toUpperCase().replace(/\s+/g, '');
	if (
		!/^SLAP-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}$/.test(s)
	) {
		return null;
	}
	return s;
}

export async function getLicensesCollection(mongoUri: string, mongoDbName?: string) {
	const client = await getMongoClient(mongoUri);
	const db = mongoDbName ? client.db(mongoDbName) : client.db();
	const coll = db.collection<LicenseDoc>('licenses');

	if (!ensureIndexesPromise) {
		ensureIndexesPromise = coll
			.createIndexes([
				{ key: { stripeSessionId: 1 }, unique: true },
				{ key: { licenseKey: 1 }, unique: true },
				{ key: { email: 1 } }
			])
			.then(() => undefined);
	}
	await ensureIndexesPromise;
	return coll;
}

export async function verifyLicenseKey(opts: {
	mongoUri: string;
	mongoDbName?: string;
	licenseKey: string;
}): Promise<{ valid: true; email: string } | { valid: false }> {
	const key = normalizeLicenseKeyInput(opts.licenseKey);
	if (!key) return { valid: false };

	const coll = await getLicensesCollection(opts.mongoUri, opts.mongoDbName);
	const doc = await coll.findOne({ licenseKey: key });
	if (!doc) return { valid: false };
	return { valid: true, email: doc.email };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function findLicenseKeysByEmail(opts: {
	mongoUri: string;
	mongoDbName?: string;
	email: string;
}): Promise<string[]> {
	const email = opts.email.trim();
	if (!email || !EMAIL_RE.test(email)) return [];

	const coll = await getLicensesCollection(opts.mongoUri, opts.mongoDbName);
	const docs = await coll
		.find({ email })
		.collation({ locale: 'en', strength: 2 })
		.sort({ createdAt: -1 })
		.toArray();

	return docs.map((d) => d.licenseKey);
}
