import { Application } from 'express';
import { Mongoose } from 'mongoose';

export async function databaseConnect(database: Mongoose) {
	try {
		database.set('strictQuery', false);
		await database.connect("mongodb://127.0.0.1:27017", { dbName: "Mobilez" });
		console.log("✅  Database is connected successfully");
	} catch (error) {
		console.error("🚫  Error connecting to database\n", error);
	}
}

export function serverConnect(app: Application) {
	try {
		app.listen(4000, () => console.log("✅  Server is connected successfully"));
	} catch (error) {
		console.error("🚫  Error starting the server\n", error);
	}
}