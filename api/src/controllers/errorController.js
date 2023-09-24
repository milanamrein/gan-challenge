// Global error handler - could be more accurate for production code 
// (distinguish errors, user-friendly response messages etc.)
const AppError = require('../utils/appError');

module.exports = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    }

    return res.status(500).json({
        status: 'error',
        error: err,
        message: err.message,
        stack: err.stack
    });
}