process.on('uncaughtException', err => {
    console.log('Uncaught exception. Shutting down...');
    console.log(err.name, err.message, err.stack);
    process.exit(1);
});

// Load environment variables
const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});

// Connect to MongoDB
const mongoose = require('mongoose');
const DB = process.env.DATABASE;
mongoose
    .connect(DB)
    .then(con => console.log('Connection to DB was successful!'))
    .catch(err => console.log(`There was an error during DB connection: ${err}`));

// Startup application
const app = require('./src/app');
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

// Initialize Kafka Consumer
const initConsumer = require('./src/services/areaConsumer');
initConsumer();

process.on('unhandledRejection', err => {
    console.log('Unhandled rejection. Shutting down...');
    console.log(err.name, err.message, err.stack);
    server.close(() => {
        process.exit(1);
    });
});