import * as mongoose from "mongoose";

export async function connectDB(mongoUri: string) {
	try {
		const conn = await mongoose.connect(mongoUri, {
			autoIndex: true,
		});

		console.log(`MongoDB connected to ${conn.connection.host}`);
	} catch (err) {
		console.log(`MongoDB connection error: ${err}`);
		process.exit(1);
	}
}
