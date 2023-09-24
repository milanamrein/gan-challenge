const { validationResult } = require("express-validator");
const AppError = require("../utils/appError");

// Request validator middleware
module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new AppError('Invalid request parameters!', errors.array(), 400));
    }

    next();
}