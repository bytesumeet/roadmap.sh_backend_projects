import "dotenv/config";
import { dbConnect } from "./shared/db/dbConnection.js";
import app from "./app.js";
import { PORT } from "./shared/constants.js";

dbConnect()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	})
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
