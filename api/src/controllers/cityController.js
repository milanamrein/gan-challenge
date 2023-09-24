const City = require('../models/cityModel')
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { JsonStreamStringify } = require('json-stream-stringify');

exports.getCitiesByTag = catchAsync(async (req, res, next) => {
    const { isActive, tag } = req.query;
    console.log(`Fetching cities by tag=${tag}; active=${isActive}`);
    const cities = await City.find()
        .where('isActive').equals(isActive)
        .in('tags', [tag]);

    res.status(200).send({
        results: cities.length,
        cities
    });
});

exports.getDistanceBetween = catchAsync(async (req, res, next) => {
    const from = await City.findOne({ guid: req.query.from });
    if (!from) {
        return next(new AppError('City not found', ['Not found city with given GUID!'], 404));
    }
    const to = await City.findOne({ guid: req.query.to });
    if (!to) {
        return next(new AppError('City not found', ['Not found city with given GUID!'], 404));
    }

    console.log(`Calculating distance between ${from.guid} and ${to.guid}`);
    const distances = await City.aggregate([
        {
            $geoNear: {
                near: [from.longitude, from.latitude],
                distanceField: 'distance',
                distanceMultiplier: parseInt(process.env.EARTH_RADIUS_KM), // radius to kilometer
                spherical: true,
                query: { guid: to.guid } // only want 'to' city in result
            }
        },
        {
            $project: {
                distance: 1 // we only need the distance property
            }
        }
    ]);
    console.log(`Should only get 1 distance; Result=${distances.length}`);

    return res.status(200).send({
        from: {
            guid: from.guid
        },
        to: {
            guid: to.guid
        },
        unit: 'km',
        distance: parseFloat(distances[0].distance.toFixed(2))
    });
});

exports.getAllCities = catchAsync(async (req, res, next) => {
    res.status(206);
    res.type('json');

    new JsonStreamStringify(City.find().cursor()).pipe(res);
});