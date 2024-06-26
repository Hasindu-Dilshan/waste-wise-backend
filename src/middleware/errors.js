const { StatusCodes } = require('http-status-codes');
const ErrorHandler = require('../utils/ErrorHandler');

module.exports = (err, req, res, next) => {
	/* eslint-disable no-param-reassign */
	err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
	err.message = err.message || 'Internal Server Error';
	/* eslint-disable no-param-reassign */

	if (process.env.NODE_ENV === 'DEVELOPMENT') {
		res.status(err.statusCode).json({
			success: false,
			errMessage: err.message,
			error: err,
			stack: err.stack,
		});
	}

	if (process.env.NODE_ENV === 'PRODUCTION') {
		let error = { ...err };
		error.message = err.message;

		// Handle duplicate key error
		if (err.code === 11000) {
			const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
			error = new ErrorHandler(message, StatusCodes.BAD_REQUEST);
		}

		// Handling Mongoose validation error
		if (err.name === 'ValidationError') {
			const message = Object.values(err.errors).map((value) =>
				value.message.replace(/\.$/, '')
			);
			error = new ErrorHandler(message, StatusCodes.BAD_REQUEST);
		}

		res.status(error.statusCode).json({
			success: false,
			message: error.message,
		});
	}
};
