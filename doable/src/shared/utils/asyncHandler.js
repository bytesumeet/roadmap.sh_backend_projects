export const asyncHandler = (requestFn) => {
	return (req, res, next) => {
		Promise.resolve(requestFn(req, res, next)).catch((error) => next(error));
	};
};
