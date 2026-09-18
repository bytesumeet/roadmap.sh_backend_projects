class ApiError extends Error {
	constructor(statusCode, message = "Something went wrong", errors = []) {
		super(message);
		this.statusCode = statusCode;
		this.errors = errors;
		this.message = message;
		this.success = false;
		if (stack) {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this);
		}
	}
}

export { ApiError };
