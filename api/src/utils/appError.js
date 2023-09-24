// Custom error class for handling all the operational errors in the api
class AppError extends Error {
    constructor(message, errors, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.errors = errors;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;