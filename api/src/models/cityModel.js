const mongoose = require('mongoose');

// Schema for cities
const citySchema = new mongoose.Schema({
    guid: String,
    isActive: Boolean,
    address: String,
    latitude: Number,
    longitude: Number,
    // geospatial data (2d)
    location: [Number],
    tags: [String]
});

// index describing an Earth-like 2d sphere
citySchema.index({ location: '2d' });

const City = mongoose.model('City', citySchema);
module.exports = City;