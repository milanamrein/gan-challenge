const mongoose = require('mongoose');
const City = require('./cityModel');

// Schema for area results
const areaSchema = new mongoose.Schema({
    areaId: String,
    cityGUID: String,
    distance: Number,
    unit: String,
    cities: [City.schema]
});

const Area = mongoose.model('Area', areaSchema);
module.exports = Area;