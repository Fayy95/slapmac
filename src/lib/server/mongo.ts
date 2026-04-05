import { MongoClient } from 'mongodb';

let clientPromise: Promise<MongoClient> | null = null;

export function getMongoClient(uri: string): Promise<MongoClient> {
	if (!clientPromise) {
		clientPromise = MongoClient.connect(uri);
	}
	return clientPromise;
}
