const PORT = process.env.PORT || 3000;
const MONGODB_CONNECTION_URI_STRING = process.env.MONGODB_CONNECTION_URI_STRING || "";
const DB_NAME = process.env.DB_NAME || "doable";

export {PORT, MONGODB_CONNECTION_URI_STRING, DB_NAME}