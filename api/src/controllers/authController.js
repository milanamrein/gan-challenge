const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    // if token is valid, store it in case it is needed..
    if (req.headers.authorization && req.headers.authorization.startsWith('bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // token does not exist
    if (!token) {
        return next(new AppError('Unauthenticated request', ['You are unauthenticated! Please log in to get access.'], 401));
    }

    next();
});