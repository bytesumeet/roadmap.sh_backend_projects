import e from "express";
const app = e();
app.use(
	e.json({
		limit: "30kb",
		strict: true,
	}),
);

app.use(
	e.urlencoded({
		extended: true,
		limit: "30kb",
		strict: true,
	}),
);

export default app;
