import mongoose from "mongoose";
import { MONGODB_CONNECTION_URI_STRING, DB_NAME } from "../constants.js";

export const dbConnect = async () => {
	try {
		const connectionInstance = await mongoose.connect(
			`${MONGODB_CONNECTION_URI_STRING}/${DB_NAME}`,
		);
		console.log(
			`Mongodb connected successfully | ${connectionInstance.connection.host}`,
		);
	} catch (error) {
		console.error("Error connecting to MongoDB:", error.message);
		process.exit(1);
	}
};
