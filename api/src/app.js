const express = require('express');
const helmet = require('helmet');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const APIRouter = require('./routes/apiRoutes');

const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const app = express();

app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(APIRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this api!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;